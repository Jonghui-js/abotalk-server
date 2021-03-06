const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
  confirmEmail,
  updateUser,
} = require('../controllers/auth');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.post('/register', register); //완료
router.post('/login', login); //완료
router.get('/logout', logout); //완료
router.get('/me', protect, getMe); //완료
router.get('/confirmemail', confirmEmail); //완료
router.put('/updateuser', protect, updateUser);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
