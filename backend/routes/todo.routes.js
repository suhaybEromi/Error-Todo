const express = require("express");
const router = express.Router();
const todoController = require("../controller/todo.controller");
const auth = require("../middleware/auth");

const { body } = require("express-validator");

router.get("/todos", auth, todoController.getTodos);

router.get("/todos/:id", auth, todoController.getTodoById);

router.post(
  "/todos",
  auth,
  [
    body("title", "Title should be at least 3 characters")
      .notEmpty()
      .trim()
      .isLength({ min: 3 }),
    body(
      "errorDescription",
      "Error Description should be at least 6 characters",
    )
      .trim()
      .isLength({ min: 6 }),
    body("fixCode", "Fix Code should be at least 6 characters")
      .trim()
      .isLength({ min: 6 }),
    body("fixExplanation", "Fix Explanation should be at least 6 characters")
      .trim()
      .isLength({ min: 6 }),
    body("status", "Status should be at least 6 characters")
      .trim()
      .isLength({ min: 6 }),
  ],
  todoController.addTodo,
);

router.put(
  "/todos/:id",
  auth,
  [
    body("title", "Title should be at least 3 characters")
      .notEmpty()
      .trim()
      .isLength({ min: 3 }),
    body(
      "errorDescription",
      "Error Description should be at least 6 characters",
    )
      .trim()
      .isLength({ min: 6 }),
    body("fixCode", "Fix Code should be at least 6 characters")
      .trim()
      .isLength({ min: 6 }),
    body("fixExplanation", "Fix Explanation should be at least 6 characters")
      .trim()
      .isLength({ min: 6 }),
    body("status", "Status should be at least 6 characters")
      .trim()
      .isLength({ min: 6 }),
  ],
  todoController.updateTodo,
);

router.delete("/todos/:id", auth, todoController.deleteTodo);

module.exports = router;
