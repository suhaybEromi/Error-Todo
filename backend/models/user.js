const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

module.exports = mongoose.model("User", userSchema);
