// scripts/createAdmin.cjs (run from backend root)
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // adjust path

(async () => {
  const uri = (process.env.MONGO_URI || process.env.MONGODB_URI).trim();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@ironzen.com';
  const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin12345';

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin exists:', existing.email);
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name: 'Admin', email, password: hashed, role: 'admin' });
  console.log('Admin created with email:', email);
  process.exit(0);
})();
