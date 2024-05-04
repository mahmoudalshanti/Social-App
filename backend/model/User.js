const mongoose = require("mongoose");
// from 3 -  15  not being _ .  not __ @   contain number

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    roles: {
      User: {
        type: Number,
        default: 4502,
      },
      Admin: Number,
    },
    profileImage: {
      filename: String,
      mimetype: String,
      data: Buffer,
      url: String,
    },
    address: {
      city: {
        type: String,
      },
      state: {
        type: String,
      },
    },
    friends: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "User",
    },
    Nof: {
      type: [],
      ref: "User",
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
