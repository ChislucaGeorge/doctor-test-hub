import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const togglePassword = () => setShowPassword(!showPassword);
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleEmailUpdate = async () => {
    if (!newEmail || !userData) return;
    try {
      await axios.post('http://localhost:5000/api/auth/update-email', {
        username: userData.username,
        recoveryEmail: newEmail
      });
      const updated = { ...userData, recoveryEmail: newEmail };
      localStorage.setItem('user', JSON.stringify(updated));
      setUserData(updated);
      setNewEmail('');
    } catch (err) {
      alert('Failed to update email');
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          await axios.post('http://localhost:5000/api/auth/update-picture', {
            username: userData.username,
            profilePicture: reader.result
          });
          const updated = { ...userData, profilePicture: reader.result };
          localStorage.setItem('user', JSON.stringify(updated));
          setUserData(updated);
        } catch {
          alert('Picture upload failed');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="/Images/profile-bg.png" alt="Background" className="profile-bg" />
        <div className="profile-avatar-container">
          <div
            className="profile-avatar"
            style={{
              backgroundImage: userData.profilePicture ? `url(${userData.profilePicture})` : 'black'
            }}
          />
        </div>
      </div>

      <div className="profile-main">
        <div className="profile-info">
          <div className="profile-info-header">
            <h2>My Profile</h2>
            <div className="profile-info-header">
              <button className="set-pic-btn" onClick={handlePictureChange}>Set Picture</button>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>

          <div className="profile-field">
            <label>Username</label>
            <input type="text" value={userData.username} readOnly />
          </div>

          <div className="profile-field">
            <label>Password</label>
            <div className="password-container">
              <input type={showPassword ? 'text' : 'password'} value={userData.password} readOnly />
              <button className="eye-btn" onClick={togglePassword}>
                {showPassword ? '👁' : '👁️'}
              </button>
            </div>
          </div>

          <div className="profile-field email-update">
            <label>Recovery Email</label>
            <input
              type="email"
              value={newEmail || userData.recoveryEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <button className="update-btn" onClick={handleEmailUpdate}>Update Email</button>
          </div>
          
        </div>

        <div className="profile-stats">
          <h2>Doctor Dashboard</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer convallis diam vitae bibendum ullamcorper.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
