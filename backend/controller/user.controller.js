const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 422;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ email, password: hashedPassword, name });
    const result = await user.save();

    return res.status(201).json({ message: "User created!", user: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("E-Mail is incorrect");
      error.statusCode = 404;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Password is incorrect");
      error.statusCode = 404;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "2h" },
    );

    return res
      .status(200)
      .json({ message: "Login successfully", token: token, userId: user._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
