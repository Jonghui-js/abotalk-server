const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Post = require('../models/Post');
const User = require('../models/User');

exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.status(200).json(posts);
});

// @desc      Get single bootcamp
// @route     GET /api/v1/posts/:id
// @access    Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json(post);
});

// @desc      Create new bootcamp
// @route     POST /api/v1/bootcamps
// @access    Private
exports.createPost = asyncHandler(async (req, res, next) => {
  const userInfo = req.user;
  const usertype = userInfo.blood;
  const username = userInfo.username;
  req.body.user = req.user.id;
  const { title, content, user } = req.body;

  const post = await Post.create({
    title,
    content,
    user,
    usertype,
    username,
  });

  res.status(201).json({
    success: true,
    data: post,
  });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: post });
});

exports.getMyPosts = asyncHandler(async (req, res, next) => {
  let posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });

  console.log(posts);

  res.status(200).json(posts);
});

exports.getMyComments = asyncHandler(async (req, res, next) => {
  const array = [];
  const mycomments = await Post.find(
    {
      comments: { $elemMatch: { user: req.user.id } },
    },
    {
      comments: {
        $elemMatch: { user: req.user.id },
      },
      'comments.text': true,
      'comments.username': true,
      'comments.usertype': true,
      'comments.date': true,
    }
  ).sort({
    date: -1,
  });

  //console.log(mycomments);

  for (let i = 0; i < mycomments.length; i++) {
    array.push(...mycomments[i]['comments']);
    array[i].id = mycomments[i]['_id'];
  }
  console.log(array);
  res.status(200).json(array);
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this bootcamp`,
        401
      )
    );
  }

  await post.remove();

  res.status(200).json({ success: true });
});

//comments/:id

exports.createComment = asyncHandler(async (req, res, next) => {
  const userInfo = req.user;
  const usertype = userInfo.blood;
  const username = userInfo.username;
  req.body.user = req.user.id;
  const { text, user } = req.body;

  const newComment = {
    text,
    user,
    usertype,
    username,
  };

  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  post.comments.unshift(newComment);
  await post.save();
  res.status(200).json(post.comments);
});

exports.getComments = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const comments = post.comments;

  console.log(comments);
  res.status(200).json(comments);
});
