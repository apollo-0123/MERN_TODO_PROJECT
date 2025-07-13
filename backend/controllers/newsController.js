const News = require('../models/News');

exports.createNews = async (req, res) => {
  const { title, content } = req.body;
  const news = await News.create({
    title,
    content,
    author: req.user._id
  });
  res.status(201).json(news);
};

exports.getAllNews = async (req, res) => {
  const news = await News.find().populate('author', 'name avatar').sort({ date: -1 });
  res.json(news);
};

exports.addComment = async (req, res) => {
  const { newsId } = req.params;
  const { text } = req.body;
  const news = await News.findById(newsId);
  if (!news) return res.status(404).json({ message: 'News not found' });
  news.comments.push({ user: req.user._id, text });
  await news.save();
  res.json(news);
}; 