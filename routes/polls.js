const express = require('express');
const { getPolls, createPoll } = require('../controllers/polls');
const router = express.Router({ mergeParams: true });
const { protect } = require('../middleware/auth');
router.use(protect);

router.route('/').get(protect, getPolls).post(protect, createPoll);

module.exports = router;
