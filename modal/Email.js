const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const EmailSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  emailid: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = models.Email || model("Email", EmailSchema, "email");
