const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({ email: 'admin@ironzen.com', password: hashedPassword, role: 'admin' });
    console.log('Admin created');
    mongoose.disconnect();
  })
  .catch(err => console.log(err));