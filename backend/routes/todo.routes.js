const express = require("express");
const router = express.Router();
const todoController = require("../controller/todo.controller");

router.get("/todos", todoController.getTodos);

router.get("/todos/:id", todoController.getTodoById);

router.post("/todos", todoController.addTodo);

// router.put('/todos/:id' , todoController.updateTodo)

// router.delete("/todos/:id", todoController.deleteTodo);

module.exports = router;
