const express = require('express');
const router = express.Router();
const { createPlan, getPlans , deletePlan } = require('../controllers/planController');

router.post('/plans', createPlan);
router.get('/plans', getPlans);
router.delete('/plans/:id',deletePlan);

module.exports = router;