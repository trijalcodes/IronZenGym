const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const requireLogin = require('../middleware/requireLogin'); // ✅

router.get('/', requireLogin, getDashboardStats); // ✅ Middleware applied

module.exports = router;