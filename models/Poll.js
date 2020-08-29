const mongoose = require('mongoose');
//const slugify = require('slugify');
//const geocoder = require('../utils/geocoder');

//POLLS
const PollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, '질문이 무엇입니까'],
      maxlength: [70, 'Name can not be more than 50 characters'],
    },
    answerList: [
      {
        text: {
          type: String,
          required: true,
        },
        users: [
          {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
          },
        ],
      },
    ],
    photo: {
      type: String,
      default: 'no-photo.jpg',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
        },
      },
    ],
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

// Create bootcamp slug from the name
/* BootcampSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
}); */

// Geocode & create location field
/* BootcampSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode
  };

  // Do not save address in DB
  this.address = undefined;
  next();
}); */

// Cascade delete courses when a bootcamp is deleted
/* PollSchema.pre('remove', async function (next) {
  console.log(`Courses being removed from bootcamp ${this._id}`);
  await this.model('Course').deleteMany({ bootcamp: this._id });
  next();
});
 */
// Reverse populate with virtuals
/* BootcampSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'bootcamp',
  justOne: false,
}); */

module.exports = mongoose.model('Poll', PollSchema);
