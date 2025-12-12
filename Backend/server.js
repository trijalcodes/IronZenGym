require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

// Initialize app
const app = express();

// CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// ---------- MongoDB Connection + Session Store Setup ----------

// Normalize & validate URI
const rawUri = process.env.MONGO_URI || process.env.MONGODB_URI;
const mongoUri = rawUri ? rawUri.trim() : null;

if (!mongoUri) {
  console.error('❌ FATAL: MONGO_URI not found in .env');
  process.exit(1);
}

// Connect Mongoose first
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ MongoDB connected');

  // Try to reuse mongoose client (best method)
  let storeOptions = {};
  const client = mongoose.connection.getClient 
    ? mongoose.connection.getClient() 
    : null;

  if (client) {
    storeOptions = {
      client,
      collectionName: 'sessions',
    };
  } else {
    // fallback if mongoose doesn't expose client
    storeOptions = {
      mongoUrl: mongoUri,
      collectionName: 'sessions',
    };
  }

  // Session Middleware NOW that DB is ready
  app.use(session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create(storeOptions),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  }));

  // ---------- Routes ----------
  const contactRoutes = require('./routes/contactRoutes');
  const reviewRoutes = require('./routes/reviewRoutes');
  const authRoutes = require('./routes/authRoutes');
  const memberRoutes = require('./routes/memberRoutes');

  app.use('/api/auth', authRoutes);
  app.use('/api/dashboard', require('./routes/dashboardRoutes'));
  app.use('/api/contacts', contactRoutes);
  app.use('/api', require('./routes/planRoutes'));
  app.use('/api/members', memberRoutes);
  app.use('/api/reviews', reviewRoutes);

  // ---------- Start server ----------
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );

})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});
