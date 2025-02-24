const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    errorDescription: {
      type: String,
      required: true,
      default: "No error description provided.",
    },
    errorFix: {
      type: String,
      required: true,
      default: "No error fix provided.",
    },
    code: {
      type: String,
      required: true,
      default: "No code fix provided.",
    },
    status: {
      type: String,
      enum: ["unresolved", "resolved"],
      default: "unresolved",
    },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Todo", todoSchema);
