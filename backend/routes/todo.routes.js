const express = require("express");
const router = express.Router();
const todoController = require("../controller/todo.controller");
const auth = require("../middleware/auth");

router.get("/todos", auth, todoController.getTodos);

router.get("/todos/:id", auth, todoController.getTodoById);

router.post("/todos", auth, todoController.addTodo);

router.put("/todos/:id", auth, todoController.updateTodo);

router.delete("/todos/:id", auth, todoController.deleteTodo);

module.exports = router;
