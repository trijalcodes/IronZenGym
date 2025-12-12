require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

const app = express();

// ---------------------------------------
// ALLOWED ORIGINS (DEFINED FIRST)
// ---------------------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://iron-zen-gym-e24o.vercel.app"
];

// ---------------------------------------
// GLOBAL CORS MIDDLEWARE (AT TOP)
// ---------------------------------------
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman/Thunder
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log("❌ Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.options("*", cors());

// ---------------------------------------
app.use(express.json());
app.use(cookieParser());

// ---------------------------------------
// MONGO CONNECTION
// ---------------------------------------
const rawUri = process.env.MONGO_URI || process.env.MONGODB_URI;
const mongoUri = rawUri ? rawUri.trim() : null;

if (!mongoUri) {
  console.error('❌ FATAL: MONGO_URI missing');
  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ MongoDB connected');

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
  // SESSION MIDDLEWARE
  // ---------------------------------------
  app.use(session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create(storeOptions),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  }));

  // ---------------------------------------
  // ROUTES
  // ---------------------------------------
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

  // ---------------------------------------
  // START SERVER
  // ---------------------------------------
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});
