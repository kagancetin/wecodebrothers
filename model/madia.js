var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mediaSchema = new Schema({
    url: String,
    name: String,
    type: String
});

var Media = mongoose.model("Media", mediaSchema);

module.exports = Media;