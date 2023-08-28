const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const CategorySchema = new Schema({
  value: {
    type: String,
    require: true,
    unique: true,
  },
  label: {
    type: String,
    require: true,
    unique: true,
  },
  color: {
    type: String,
    default: "blue",
  },
});

module.exports =
  models.Category || model("Category", CategorySchema, "category");
