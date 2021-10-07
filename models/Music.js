const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  audios: [{
    type: String,
    required: true,
  }],
}, { timestamps: { createdAt: true } });

module.exports = mongoose.model("Music", musicSchema);
