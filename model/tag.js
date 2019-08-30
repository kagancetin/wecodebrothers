var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  blog: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
});

var Tag = mongoose.model("Tag", userSchema);

module.exports = Tag;
