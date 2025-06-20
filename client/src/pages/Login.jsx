import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');

    if (!username || !password) {
      return setError('Username and password are required');
    }

    if (isSignUp && password !== repeatPassword) {
      return setError('Passwords do not match');
    }

    const endpoint = isSignUp ? 'register' : 'login';
    try {
      const response = await fetch(`http://localhost:5000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          ...(isSignUp && { email: `${username}@example.com` }), // Dummy recovery email for now
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Store user info globally or in localStorage (example below)
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/home'); // Redirect to homepage
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="form-section">
          <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />

          {isSignUp && (
            <>
              <label>Repeat Password</label>
              <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder="Repeat password" />
            </>
          )}

          {error && <p className="error">{error}</p>}

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
