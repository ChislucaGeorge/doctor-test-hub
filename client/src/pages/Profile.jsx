import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="/Images/profile-bg.png" alt="Background" className="profile-bg" />
        <div className="profile-avatar-container">
          <div className="profile-avatar" />
        </div>
      </div>

      <div className="profile-main">
        <div className="profile-info">
          <h2>My Profile</h2>
          <div className="profile-field">
            <label>Username</label>
            <input type="text" value="DoctorUser123" readOnly />
          </div>
          <div className="profile-field">
            <label>Password</label>
            <div className="password-container">
              <input type={showPassword ? "text" : "password"} value="Password123" readOnly />
              <button className="eye-btn" onClick={togglePassword}>
                {showPassword ? "👁" : "👁️"}
              </button>
            </div>
          </div>
          <div className="profile-field">
            <label>Recovery Email</label>
            <input type="email" value="doctor@example.com" readOnly />
          </div>
        </div>

        <div className="profile-stats">
          <h2>Doctor Dashboard</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec elementum quam, et aliquet nisi.
            Integer convallis diam vitae bibendum ullamcorper. Aenean non lorem at arcu viverra ultricies non a justo.
            In nec facilisis lorem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
