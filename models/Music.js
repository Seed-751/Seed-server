const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  track: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  }
});

const fundingSchema = new mongoose.Schema({
  target: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  donors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
}, { timestamps: { createdAt: true } });

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
    type: songSchema,
    required: true,
  }],
  funding: {
    type: fundingSchema,
    required: true,
  },
}, { timestamps: { createdAt: true } });

module.exports = mongoose.model("Music", musicSchema);
