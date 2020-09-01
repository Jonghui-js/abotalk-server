const express = require('express');

const {
  getPosts,
  createPost,
  updatePost,
  getMyPosts,
  deletePost,
  createComment,
  getComments,
  getPost,
  getMyComments,
} = require('../controllers/posts');
const router = express.Router({ mergeParams: true });
const { protect } = require('../middleware/auth');
router.use(protect);

router.route('/').get(protect, getPosts).post(protect, createPost);

router
  .route('/:id')
  .post(protect, updatePost)
  .delete(protect, deletePost)
  .get(protect, getPost);

router.route('/myposts/me').get(protect, getMyPosts);
router
  .route('/comments/:id')
  .post(protect, createComment)
  .get(protect, getComments);

router.route('/mycomments/me').get(protect, getMyComments);

module.exports = router;
