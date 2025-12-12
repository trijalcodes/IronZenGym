const express = require('express');
const router = express.Router();
const {
  createReview,
  getAllReviews,
  deleteReview
} = require('../controllers/reviewController');

router.post('/', createReview);          // POST /api/reviews
router.get('/', getAllReviews);          // GET /api/reviews
router.delete('/:id', deleteReview);     // DELETE /api/reviews/:id

module.exports = router;