// server/routes/questionnaire.js
const express = require('express');
const router = express.Router();
const Questionnaire = require('../models/Questionnaire');
const { v4: uuidv4 } = require('uuid');

// Create questionnaire
router.post('/', async (req, res) => {
  try {
    console.log("🛬 Received POST payload:", req.body); // ✅ log payload
    const newQ = new Questionnaire(req.body);
    const saved = await newQ.save();
    console.log("✅ Saved to DB:", saved); // ✅ confirm DB insert
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Failed to save:", err);
    res.status(500).json({ message: 'Failed to save questionnaire' });
  }
});

// Fetch all for a user
router.get('/:username', async (req, res) => {
  try {
    const list = await Questionnaire.find({ OwnedBy: req.params.username });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch questionnaires' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Questionnaire.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const sanitizedData = { ...req.body };

    // Optional: sanitize nested _ids
    if (sanitizedData.questions) {
      sanitizedData.questions = sanitizedData.questions.map(q => ({
        text: q.text,
        type: q.type,
        options: [...q.options]
      }));
    }

    const updated = await Questionnaire.findByIdAndUpdate(
      req.params.id,
      sanitizedData,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ PUT failed:", err);
    res.status(500).json({ message: 'Failed to update questionnaire' });
  }
});


module.exports = router;
