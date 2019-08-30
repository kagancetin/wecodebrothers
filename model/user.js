var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  author: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: Boolean,
  email: String,
  profil_photo: String,
  about: String,
  createdAt: String
});

var User = mongoose.model("User", userSchema);

module.exports = User;

User.find({
  name: "admin"
}, function (err, rs) {
  if (rs == "") {
    const user = User({
      name: "admin",
      author: "admin",
      username: "admin",
      password: "1",
      admin: true,
      email: "admin",
      createdAt: "2019"
    }).save();
  }
});