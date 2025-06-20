const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db'); 
const authRoutes = require('./routes/auth');
const questionnaireRoutes = require('./routes/questionnaires');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB(); // ✅ uses db.js

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questionnaires', questionnaireRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
