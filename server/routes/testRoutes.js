const express = require('express');
const router = express.Router();

// Sample GET route
router.get('/', (req, res) => {
  res.json({ message: "Test route working" });
});

module.exports = router;
