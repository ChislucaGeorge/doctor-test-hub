import React from 'react';
import './MyCollection.css';
import QuestionnaireCard from './components/QuestionnaireCard';

const MyCollection = () => {
  const dummyData = [
    { title: 'Depression Scale', description: '10-question depression survey.', category: 'Mental Health' },
    { title: 'Pediatric Check', description: 'Checklist for pediatricians.', category: 'General' },
    { title: 'Sleep Quality Index', description: 'Track sleep patterns.', category: 'Wellness' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
    { title: 'Anxiety Test', description: 'Quick anxiety assessment.', category: 'Mental Health' },
  ];

  return (
    <div className="collection-container">
      <div className="collection-sidebar">
        <h2>My Collection</h2>
        <button>Create Questionnaire</button>
        <button>Responses</button>
        <button>Statistics</button>
      </div>
  
      <div className="collection-page-wrapper">
        <div className="questionnaire-rainbow-box">
          <div className="questionnaire-list">
            {dummyData.map((item, index) => (
              <QuestionnaireCard
                key={index}
                title={item.title}
                description={item.description}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );  
  
};

export default MyCollection;
