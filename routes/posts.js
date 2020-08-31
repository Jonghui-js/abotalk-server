const express = require('express');

const {
  getPosts,
  createPost,
  updatePost,
  getMyPosts,
  deletePost,
} = require('../controllers/posts');
const router = express.Router({ mergeParams: true });
const { protect } = require('../middleware/auth');
router.use(protect);

router.route('/').get(protect, getPosts).post(protect, createPost);

router.route('/:id').post(protect, updatePost).delete(protect, deletePost);
router.route('/me').get(protect, getMyPosts);

module.exports = router;
