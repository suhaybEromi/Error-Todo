const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const User = require("../models/user");

const { check, body } = require("express-validator");

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async value => {
        const existingUser = await User.findOne({ email: value });
        if (existingUser) {
          throw new Error("E-Mail address already exists!");
        }
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        "Password should be at least 8 characters , and lowercase and uppercase and numbers and symbols required",
      ),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords must match");
        }
        return true;
      }),
    body("name", "write just text or numbers")
      .trim()
      .notEmpty()
      .isAlphanumeric(),
  ],
  userController.signup,
);

router.post(
  "/login",
  [
    body("email", "Please enter a valid email.").isEmail().normalizeEmail(),
    body("password").notEmpty(),
  ],
  userController.login,
);

router.post("/logout", userController.logout);

router.get("/status/:id", userController.getName);

router.put("/status/:id", userController.updateName);

module.exports = router;
