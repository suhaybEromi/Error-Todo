const Todo = require("../models/todos");
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

const getTodos = async () => {
  try {
    const todos = await Todo.find();
    return todos.map(todo => ({
      ...todo._doc,
      _id: todo._id.toString(),
      createdAt: todo.createdAt.toISOString(),
      updatedAt: todo.updatedAt.toISOString(),
    }));
  } catch (err) {
    throw new Error("Fetching todos failed!");
  }
};

const createUser = async ({ userInput }) => {
  const errors = [];
  if (!validator.isEmail(userInput.email)) {
    errors.push({ message: "Please enter a valid email" });
  }
  if (
    validator.isEmpty(userInput.password) ||
    !validator.isLength(userInput.password, { min: 5 })
  ) {
    errors.push({ message: "Password must be at least 5 characters long" });
  }
  if (validator.isEmpty(userInput.name)) {
    errors.push({ message: "Please enter a valid name" });
  }

  if (errors.length > 0) {
    const error = new Error("Invalid input.");
    error.data = errors;
    error.code = 422;
    throw error;
  }

  const existingUser = await User.findOne({ email: userInput.email });
  if (existingUser) {
    const error = new Error("E-mail already exists");
    error.code = 422;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(userInput.password, 12);

  const user = new User({
    email: userInput.email,
    password: hashedPassword,
    name: userInput.name,
  });

  await user.save();

  return {
    _id: user._id.toString(),
  };
};

const createTodo = async ({ todoInput }, req) => {
  const errors = [];
  if (
    validator.isEmpty(todoInput.title) ||
    !validator.isLength(todoInput.title, { min: 5 })
  ) {
    errors.push({ message: "Title is invalid." });
  }
  if (
    validator.isEmpty(todoInput.textError) ||
    !validator.isLength(todoInput.textError, { min: 10 })
  ) {
    errors.push({ message: "textError is invalid." });
  }
  if (
    validator.isEmpty(todoInput.textFix) ||
    !validator.isLength(todoInput.textFix, { min: 10 })
  ) {
    errors.push({ message: "textFix is invalid." });
  }
  if (
    validator.isEmpty(todoInput.textCode) ||
    !validator.isLength(todoInput.textCode, { min: 10 })
  ) {
    errors.push({ message: "textCode is invalid." });
  }

  if (errors.length > 0) {
    const error = new Error("Invalid input.");
    error.data = errors;
    error.code = 422;
    throw error;
  }

  const todo = new Todo({
    title: todoInput.title,
    imageUrl: todoInput.imageUrl,
    textError: todoInput.textError,
    textFix: todoInput.textFix,
    textCode: todoInput.textCode,
  });

  const result = await todo.save();
  return {
    ...result._doc,
    _id: result._id.toString(),
    createdAt: result.createdAt.toISOString(),
    updatedAt: result.updatedAt.toISOString(),
  };
};

const updateTodo = async ({ id, todoInput }, req) => {
  let errors = [];
  const todo = await Todo.findById(id);

  if (!todo) {
    const error = new Error("No Todo Found.");
    error.code = 404;
    throw error;
  }

  if (
    validator.isEmpty(todoInput.title) ||
    !validator.isLength(todoInput.title, { min: 5 })
  ) {
    errors.push({ message: "Title is invalid." });
  }
  if (
    validator.isEmpty(todoInput.textError) ||
    !validator.isLength(todoInput.textError, { min: 10 })
  ) {
    errors.push({ message: "textError is invalid." });
  }
  if (
    validator.isEmpty(todoInput.textFix) ||
    !validator.isLength(todoInput.textFix, { min: 10 })
  ) {
    errors.push({ message: "textFix is invalid." });
  }
  if (
    validator.isEmpty(todoInput.textCode) ||
    !validator.isLength(todoInput.textCode, { min: 10 })
  ) {
    errors.push({ message: "textCode is invalid." });
  }

  if (errors.length > 0) {
    const error = new Error("Invalid input.");
    error.data = errors;
    error.code = 422;
    throw error;
  }

  todo.title = todoInput.title;
  todo.imageUrl = todoInput.imageUrl;
  todo.textError = todoInput.textError;
  todo.textFix = todoInput.textFix;
  todo.textCode = todoInput.textCode;
  const updatedTodo = await todo.save();
  return {
    ...updatedTodo._doc,
    _id: updatedTodo._id.toString(),
    createdAt: updatedTodo.createdAt.toISOString(),
    updatedAt: updatedTodo.updatedAt.toISOString(),
  };
};

const deleteTodo = async ({ id }) => {
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      const error = new Error("No Todo Found.");
      error.code = 404;
      throw error;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { getTodos, createUser, createTodo, deleteTodo, updateTodo };
