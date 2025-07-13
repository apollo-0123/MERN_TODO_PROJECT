const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  date: { type: Date, default: Date.now }
});

const NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [CommentSchema],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', NewsSchema); 