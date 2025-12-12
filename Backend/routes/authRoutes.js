const express = require('express');
const router = express.Router();
const { loginUser, logoutUser, changePassword } = require('../controllers/authController');

// Existing routes
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// ✅ New route to change password
router.post('/change-password', changePassword);

module.exports = router;