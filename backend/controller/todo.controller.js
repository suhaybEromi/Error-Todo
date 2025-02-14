const Todo = require("../models/todo");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");

const clearImage = require("../util/remove-image");

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().populate("creator");
    if (todos.length == 0) {
      return res.status(404).json({ message: "No todo has been recorded" });
    }
    return res.status(200).json({ message: "Fetching todos", todos: todos });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findById(todoId);
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
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "Invalid file type. Only images are allowed!" });
  }

  const imageUrl = req.file.path;
  const { title, errorDescription, fixCode, fixExplanation } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const todo = new Todo({
      title,
      imageUrl,
      errorDescription,
      fixCode,
      fixExplanation,
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
  const { title, errorDescription, fixCode, fixExplanation } = req.body;
  let imageUrl = req.body;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      const error = new Error("Could not find todo");
      error.statusCode = 422;
      throw error;
    }

    if (req.file) {
      imageUrl = req.file.path;
    }

    if (imageUrl !== todo.imageUrl) {
      const oldImage = path.join(__dirname, "..", todo.imageUrl);
      fs.unlink(oldImage, err => {
        if (err) throw err;
      });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Invalid file type. Only images are allowed!" });
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
    todo.fixCode = fixCode;
    todo.fixExplanation = fixExplanation;
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
