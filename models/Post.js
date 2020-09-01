const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      ref: 'User',
      required: true,
    },
    usertype: {
      type: String,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, '제목을 작성해주세요'],
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    content: {
      type: String,
      required: [true, '내용을 작성해주세요'],
      maxlength: [1000, 'Name can not be more than 1000 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
        text: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          ref: 'User',
          required: true,
        },
        usertype: {
          type: String,
          ref: 'User',
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model('Post', PostSchema);
