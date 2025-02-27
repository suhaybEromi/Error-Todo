const Todo = require("../models/todo");
const User = require("../models/user");
const fs = require("fs");
const clearImage = require("../util/remove-image");

const { validationResult } = require("express-validator");

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().populate("creator").sort({ createdAt: -1 });

    return res.status(200).json({ message: "Fetching todos", todos: todos });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  const todoId = req.params.id;
  try {
    const todo = await Todo.findById(todoId).populate("creator");
    if (!todo) {
      return res.status(404).json({ message: "Could not find todo." });
    }
    return res.status(200).json({ message: "Fetching todo by ID", todo: todo });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addTodo = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  if (!req.file) {
    return res
      .status(400)
      .json({ message: "Invalid file type. Only upload image are allowed!" });
  }

  const imageUrl = req.file.path;
  const { title, errorDescription, errorFix, code, status } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const todo = new Todo({
      title,
      imageUrl,
      errorDescription,
      errorFix,
      code,
      status,
      creator: req.userId,
    });

    await todo.save();

    user.todos.push(todo);
    await user.save();

    return res.status(201).json({
      message: "Add Todo successfully",
      todo: todo,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateTodo = async (req, res, next) => {
  const id = req.params.id;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { title, errorDescription, errorFix, code, status } = req.body;
  let imageUrl = req.body;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      const error = new Error("Could not find todo");
      error.statusCode = 422;
      throw error;
    }

    if (req.file) {
      imageUrl = req.file.path;
    }

    if (imageUrl !== todo.imageUrl) {
      clearImage(todo.imageUrl);
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Invalid file type. Only upload image are allowed!" });
    }

    if (!imageUrl) {
      const error = new Error("No file picked");
      error.statusCode = 422;
      throw error;
    }

    if (todo.creator.toString() !== req.userId) {
      const error = new Error("Unauthorized! Please log in.");
      error.status = 403;
      throw error;
    }

    todo.title = title;
    todo.imageUrl = imageUrl;
    todo.errorDescription = errorDescription;
    todo.errorFix = errorFix;
    todo.code = code;
    todo.status = status;
    todo.creator = req.userId;
    const result = await todo.save();

    return res
      .status(200)
      .json({ message: "Update todo successfully", todo: result });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      const error = new Error("Could not find todo");
      error.statusCode = 422;
      throw error;
    }

    clearImage(todo.imageUrl);

    if (todo.creator.toString() !== req.userId) {
      const error = new Error("Unauthorized! Please log in.");
      error.status = 403;
      throw error;
    }

    await Todo.findByIdAndDelete(id);
    return res.status(200).json({ message: "Delete Todo successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
