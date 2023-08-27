const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const CategorySchema = new Schema({
  value: {
    type: String,
    require: true,
  },
  label: {
    type: String,
    require: true,
  },
});

module.exports =
  models.Category || model("Category", CategorySchema, "category");
