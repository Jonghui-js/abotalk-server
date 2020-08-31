const express = require('express');
const { getUsersType } = require('../controllers/main');
const router = express.Router({ mergeParams: true });
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/').get(getUsersType);

module.exports = router;
