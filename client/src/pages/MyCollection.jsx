import React, { useState, useEffect } from 'react';
import './MyCollection.css';
import QuestionnaireCard from './components/QuestionnaireCard';
import Modal from './Modal';
import QuestionnaireForm from './components/QuestionnaireForm';
import axios from 'axios';

const MyCollection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [editingData, setEditingData] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/questionnaires/${user.username}`);
        setQuestionnaires(res.data);
      } catch {
        alert('Failed to load');
      }
    };
    fetchData();
  }, [user.username]);

  const handleCreate = () => {
    setEditingData(null);
    setModalContent('create');
    setModalOpen(true);
  };

  const handlePreviewEdit = (item) => {
    setEditingData(item);
    setModalContent('create');
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/questionnaires/${id}`);
      const res = await axios.get(`http://localhost:5000/api/questionnaires/${user.username}`);
      setQuestionnaires(res.data);
    } catch {
      alert('Delete failed');
    }
  };
   

  const handleSave = async (data) => {
    try {
      console.log("📬 Received in MyCollection:", data); // ✅ log
      if (editingData) {
        const res = await axios.put(`http://localhost:5000/api/questionnaires/${editingData._id}`, data);
        console.log("✅ Updated:", res.data); // ✅ log
        setQuestionnaires(prev =>
          prev.map(q => q._id === editingData._id ? res.data : q)
        );
      } else {
        const res = await axios.post('http://localhost:5000/api/questionnaires', data);
        console.log("✅ Created:", res.data); // ✅ log
        setQuestionnaires(prev => [...prev, res.data]);
      }
      setModalOpen(false);
      setEditingData(null);
    } catch (err) {
      console.error("❌ Save failed:", err);
      alert('Failed to save');
    }
  };
  

  return (
    <div className="collection-container">
      <div className="collection-sidebar">
        <h2>My Collection</h2>
        <button onClick={handleCreate}>Create Questionnaire</button>
        <button>Responses</button>
        <button>Statistics</button>
      </div>

      <div className="collection-page-wrapper">
        <div className="questionnaire-rainbow-box">
          <div className="questionnaire-list">
            {questionnaires.map((item) => (
              <QuestionnaireCard
                key={item.id}
                title={item.title}
                description={item.description}
                category={item.category}
                onDelete={() => handleDelete(item._id)}
                onPreview={() => handlePreviewEdit(item)}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>{editingData ? 'Edit Questionnaire' : 'Create New Questionnaire'}</h2>
        <QuestionnaireForm onSave={handleSave} initialData={editingData} />
      </Modal>
    </div>
  );
};

export default MyCollection;
