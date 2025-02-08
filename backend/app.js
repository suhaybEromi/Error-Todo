const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
require("dotenv").config();
app.use(cors());

app.get("/", () => {
  console.log("Hello world");
});

app.listen(4000);
