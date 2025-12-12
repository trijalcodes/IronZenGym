const Member = require('../models/Member');

// Get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ startDate: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching members' });
  }
};

// Add a member
exports.addMember = async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ message: 'Error adding member' });
  }
};

// Delete member
exports.deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting member' });
  }
};
