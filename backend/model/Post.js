const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
  },
  media: {
    type: String,
  },
  author: {
    image: String,
    username: String,
  },
  comments: {
    type: [{}],
  },
});

module.exports = mongoose.model("Post", postSchema);
