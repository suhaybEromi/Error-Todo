const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo.routes");

app.use(express.json());
app.use(cors());

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
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected");
    app.listen(4000);
  } catch (err) {
    console.error("Database connection failed:", err);
  }
};

startServer();
