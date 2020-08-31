const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

exports.getUsersType = asyncHandler(async (req, res, next) => {
  let data = {};
  let usersType = await User.aggregate([
    {
      $group: {
        _id: '$blood',
        count: { $sum: 1 },
      },
    },
  ]).sort({ count: -1 });

  for (var i = 0; i < usersType.length; i++) {
    data[`${usersType[i]['_id']}`] = usersType[i]['count'].toFixed(2);
  }
  console.log(data);
  res.status(200).json(data);
});
