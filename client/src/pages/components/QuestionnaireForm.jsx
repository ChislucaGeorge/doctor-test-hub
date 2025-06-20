import React, { useState, useEffect } from 'react';
import './QuestionnaireForm.css';
import axios from 'axios';

const QuestionnaireForm = ({ onSave, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [rules, setRules] = useState([]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setCategory(initialData.category || '');
      setQuestions(initialData.questions || []);
      setRules(initialData.rules || []);
    }
  }, [initialData]);

  const handleAddQuestion = () => {
    setQuestions(prev => [...prev, { text: '', type: 'text', options: [''] }]);
    setRules(prev => [...prev, '']);
  };

  const removeQuestion = (index) => {
    const updatedQ = [...questions];
    updatedQ.splice(index, 1);
    setQuestions(updatedQ);

    const updatedR = [...rules];
    updatedR.splice(index, 1);
    setRules(updatedR);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (index) => {
    const updated = [...questions];
    updated[index].options.push('');
    setQuestions(updated);
  };

  const removeOption = (qIndex, optIndex) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[qIndex].options.splice(optIndex, 1);
      return [...updated];
    });
  };

  const handleRuleChange = (index, value) => {
    const updated = [...rules];
    updated[index] = value;
    setRules(updated);
  };

  const handleLocalSave = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const payload = {
      title,
      description,
      category,
      questions,
      rules,
      ownedBy: currentUser?.username || 'unknown',
      createdBy: currentUser?.username || 'unknown',
      link: ''
    };
  
    console.log("🧾 Saving questionnaire with payload:", payload); // ✅ log here
  
    if (typeof onSave === 'function') {
      onSave(payload);
    } else {
      console.warn("⚠️ onSave is not a function!", onSave);
    }
  };    
  

  return (
    <div className="questionnaire-form">
      <h2>Questionnaire</h2>
      <label>Title</label>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} />

      <label>Description</label>
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="full-input"
      />

      <button className="btn-sky" onClick={handleAddQuestion}>Add Question</button>

      {questions.map((q, i) => (
        <div key={i} className="question-block">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label>Question {i + 1}</label>
            <button className="mini-btn" onClick={() => removeQuestion(i)}>✕</button>
          </div>

          <textarea
            className="question-text"
            placeholder="Enter question..."
            value={q.text}
            onChange={(e) => handleQuestionChange(i, 'text', e.target.value)}
          />

          <label>Type</label>
          <select
            value={q.type}
            onChange={(e) => handleQuestionChange(i, 'type', e.target.value)}
          >
            <option value="text">Text</option>
            <option value="single">Single Choice</option>
            <option value="multiple">Multiple Choice</option>
          </select>

          {q.type === 'text' && (
            <input className="readonly-answer" placeholder="User will answer here..." readOnly />
          )}

          {(q.type === 'single' || q.type === 'multiple') && (
            <>
              {q.options.map((opt, j) => (
                <div key={j} className="option-row">
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(i, j, e.target.value)}
                    className="option-input"
                  />
                  <input type={q.type === 'single' ? 'radio' : 'checkbox'} disabled />
                  <button
                    className="mini-btn"
                    onClick={() => removeOption(i, j)}
                    title="Delete option"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button className="btn-sky" onClick={() => addOption(i)}>+ Option</button>
            </>
          )}
        </div>
      ))}

      <hr />
      <h3>Rules</h3>
      {rules.map((rule, i) => (
        <div key={i} className="rule-block">
          <label>Rule for Question {i + 1}</label>
          <input
            type="text"
            value={rule}
            placeholder="Define rule..."
            onChange={(e) => handleRuleChange(i, e.target.value)}
            className="full-input"
          />
        </div>
      ))}

      <div className="share-section">
        <strong>Shareable Link (placeholder):</strong> [coming soon]
      </div>

      <button className="save-btn" onClick={handleLocalSave}>Save</button>
    </div>
  );
};

export default QuestionnaireForm;
