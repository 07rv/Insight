const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const PostSchema = new Schema({
  cover: {
    type: String,
  },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = models.Post || model("Post", PostSchema);
