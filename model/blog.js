var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: String, required: true },
  tag: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  ],
  thumbnail: { type: String, required: true }
});

var Blog = mongoose.model("Blog", userSchema);

module.exports = Blog;
