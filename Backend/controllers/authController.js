const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// ----------------------------------------
// LOGIN (JWT Version)
// ----------------------------------------
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // 🔥 Create JWT Token
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: "admin"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ----------------------------------------
// LOGOUT (JWT version: just tell frontend to delete token)
// ----------------------------------------
exports.logoutUser = (req, res) => {
  return res.status(200).json({ message: "Logout successful" });
};

// ----------------------------------------
// CHANGE PASSWORD (Uses JWT user)
// ----------------------------------------
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // 🔥 User must come from JWT middleware (req.user)
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });

  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
