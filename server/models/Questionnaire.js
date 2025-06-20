const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: String,
  type: String,
  options: [String]
}, { _id: false }); // ❗ disables nested _id

const QuestionnaireSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  questions: [QuestionSchema],
  rules: [String],
  link: String,
  ownedBy: String,
  createdBy: String
});

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
