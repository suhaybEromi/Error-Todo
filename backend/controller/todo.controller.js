const Todo = require("../models/todos");

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
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

// Get a single todo by ID
exports.getTodoById = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "No todo has been recorded" });
    }
    return res.status(200).json({ message: "Fetching todo by ID", todo: todo });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addTodo = async (req, res, next) => {};
