import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/home'); // Just simulates login
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="form-section">
          <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

          <label>Username</label>
          <input type="text" placeholder="Enter username" />

          <label>Password</label>
          <input type="password" placeholder="Enter password" />

          {isSignUp && (
            <>
              <label>Repeat Password</label>
              <input type="password" placeholder="Repeat password" />
            </>
          )}

          <button className="btn-primary" onClick={handleSubmit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>

          <p className="signup-text">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span onClick={() => setIsSignUp(!isSignUp)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </span>
          </p>
        </div>

        <div className="image-section">
          <img src="/Images/login-bg.png" alt="Visual" />
          <div className="gradient-overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
