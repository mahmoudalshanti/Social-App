const mongoose = require("mongoose");

const messengerSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    username: String,
    image: String,
  },
});

module.exports = mongoose.model("Messenger", messengerSchema);
