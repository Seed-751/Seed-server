const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  myFundings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Music",
  }],
  myAlbums: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Music",
  }],
}, { timestamps: { createdAt: true } });

module.exports = mongoose.model("User", userSchema);
