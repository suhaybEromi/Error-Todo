const Todo = require("../models/todos");

const mongoose = require("mongoose");

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

const createTodo = async ({ todoInput }, req) => {
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

const deleteTodo = async ({ id }) => {
  try {
    await Todo.findByIdAndDelete(id);
    return true;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getTodos, createTodo, deleteTodo };
