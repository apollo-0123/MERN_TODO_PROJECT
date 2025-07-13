const express = require('express');
const { createNews, getAllNews, addComment } = require('../controllers/newsController');
const protect = require('../middleware/auth');
const router = express.Router();

router.get('/', getAllNews);
router.post('/', protect, createNews);
router.post('/:newsId/comment', protect, addComment);

module.exports = router; 