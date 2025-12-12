const Contact = require('../models/Contact');
const Member = require('../models/Member');
const Plan = require('../models/Plan');

exports.getDashboardStats = async (req, res) => {
  try {
    // JWT Authentication: user info comes from req.user
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    const totalContacts = await Contact.countDocuments();
    const totalMembers = await Member.countDocuments();
    const totalPlans = await Plan.countDocuments();

    const members = await Member.find();
    const totalRevenue = members.reduce((acc, curr) => {
      const price = parseFloat(curr.price || 0);
      return acc + price;
    }, 0);

    const latestMembers = await Member.find().sort({ createdAt: -1 }).limit(5);
    const latestContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      message: "Welcome to Admin Dashboard",
      user: req.user, // from JWT
      stats: {
        totalContacts,
        totalMembers,
        totalPlans,
        totalRevenue,
        latestMembers,
        latestContacts
      }
    });

  } catch (error) {
    console.error("Dashboard Error:", error.message);
    res.status(500).json({ error: "Dashboard fetch failed" });
  }
};
