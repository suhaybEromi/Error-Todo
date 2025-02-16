const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const multer = require("multer");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const userRoutes = require("./routes/user.routes");
const todoRoutes = require("./routes/todo.routes");

app.use(express.json());
app.use(cors());

app.use("/auth", userRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(auth);

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (!fs.existsSync("images")) {
        fs.mkdirSync("images");
      }
      cb(null, "images");
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jfif" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/svg+xml" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter: fileFilter }).single(
  "image",
);

app.use((req, res, next) => {
  upload(req, res, err => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }
    next();
  });
});

app.use("/api", todoRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const startServer = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('"DATABASE_URL is missing in environment variables ');
    }
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected");
    app.listen(4000);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

startServer();
