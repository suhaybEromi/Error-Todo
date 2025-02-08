const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const mongoose = require("mongoose");
const multer = require("multer");
const { clearImage } = require("./util/file");

const { graphqlHTTP } = require("express-graphql");

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");

app.use(express.json());
app.use(cors());

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("images")) {
      fs.mkdirSync("images");
    }
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    cb(null, file.filename + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/jfif" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.put("/post-image", (req, res, next) => {
  if (!req.file) {
    return res.status(200).json({ message: "No file provided!" });
  }
  if (req.body.oldPath) {
    clearImage(req.body.oldPath);
  }
  return res
    .status(201)
    .json({ message: "File stored.", filePath: req.file.path });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  }),
);

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
