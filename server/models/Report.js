const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    default: ""
  },
  season: {
    type: String,
    default: ""
  },
  coverImage: {
    type: String,
    default: ""
  },
  fileUrl: {
    type: String,
    default: ""
  },
  price: {
    type: Number,
    required: true
  },
  pages: {
    type: Number,
    default: 0
  },
  publishedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Report", reportSchema);
