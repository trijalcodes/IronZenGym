const express = require('express');
const router = express.Router();

const {
  createContact,
  getAllContacts,
  deleteContact,
} = require('../controllers/contactController');

// POST /api/contacts -> create new message
router.post('/', createContact);

// GET /api/contacts -> fetch all messages
router.get('/', getAllContacts);

// DELETE /api/contacts/:id -> delete specific message
router.delete('/:id', deleteContact);

module.exports = router;