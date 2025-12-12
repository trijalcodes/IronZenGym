require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

// Initialize app
const app = express();

// ---------------------------------------
// 🔥 Allowed Origins FIX
// ---------------------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://iron-zen-gym-e24o.vercel.app"
];

// ---------------------------------------
// 🔥 Global CORS FIX (must be at top)
// ---------------------------------------
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Thunder/Postman
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log("❌ Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.options("*", cors());

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
    storeOptions = {
      mongoUrl: mongoUri,
      collectionName: 'sessions',
    };
  }

  // ---------------------------------------
  // 🔥 Session Middleware FIX
  // (Your original had wrong location + duplicate CORS)
  // ---------------------------------------
  app.use(session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create(storeOptions),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      secure: true,        // REQUIRED for Vercel + Render
      sameSite: "none",    // REQUIRED for cross-domain cookies
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
