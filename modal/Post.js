const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const PostSchema = new Schema(
    {
        
    }
);

module.exports = models.Post || model("Post", PostSchema);