import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <h1>Welcome to Health-Hub</h1>
      <p>
        Health-Hub is your personal gateway to smarter healthcare. Connect with certified doctors,
        access personalized health tools, and engage with the community through live chat and shared knowledge.
      </p>
      <h2>Platform Features:</h2>
      <ul>
        <li><strong>My Collection:</strong> Save and organize personal health forms or test templates</li>
        <li><strong>Community:</strong> Engage in doctor-hosted Q&A sessions and public threads</li>
        <li><strong>Profile:</strong> Manage your health profile and form history</li>
      </ul>
      <p>
        Use the navbar above to navigate the platform. Whether you're a patient or a healthcare provider,
        Health-Hub helps keep your care accessible and efficient.
      </p>
    </div>
  );
}
