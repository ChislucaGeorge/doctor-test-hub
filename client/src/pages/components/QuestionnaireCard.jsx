import React from 'react';
import './QuestionnaireCard.css';

const QuestionnaireCard = ({ title, description, category, onPreview, onDelete }) => {
  return (
    <div className="card">
      <h3 className="card-title" title={title}>{title}</h3>
      <p className="card-description" title={description}>{description}</p>
      <span className="category" title={category}>{category}</span>
      <div className="card-actions">
        <button onClick={onPreview}>Edit/PV</button>
        <button onClick={onDelete}>Delete</button>
        <button>Upload</button>
      </div>
    </div>
  );
};

export default QuestionnaireCard;
