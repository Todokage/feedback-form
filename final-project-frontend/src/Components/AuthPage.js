import React, { useState } from 'react';

const guidelines = [
  "Be respectful and courteous to all users.",
  "Share accurate and helpful information.",
  "No spam, advertising, or inappropriate content.",
  "Protect your personal information and respect others' privacy.",
  "Report any misuse or violations to moderators.",
  "Follow community rules to ensure a positive environment."
];

const AuthPage = ({ onClose, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isSignUp) {
      // Simulate sign up API call
      if (!form.name || !form.email || !form.password) {
        setError('Please fill in all fields.');
        return;
      }
      setShowGuidelines(true);
    } else {
      // Simulate login API call
      if (!form.email || !form.password) {
        setError('Please enter email and password.');
        return;
      }
      // Simulate successful login
      if (onAuthSuccess) onAuthSuccess();
      if (onClose) onClose();
    }
  };

  const handleAcceptGuidelines = () => {
    setShowGuidelines(false);
    // Simulate successful sign up and login
    if (onAuthSuccess) onAuthSuccess();
    if (onClose) onClose();
  };

  return (
    <div className="about-modal">
      <div className="about-modal-content" style={{ minWidth: 320 }}>
        <button
          style={{
            position: 'absolute',
            top: 10,
            right: 16,
            background: 'none',
            border: 'none',
            fontSize: 22,
            cursor: 'pointer'
          }}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        {!showGuidelines ? (
          <>
            <h2 style={{ textAlign: 'center' }}>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                required
              />
              {error && <div style={{ color: 'red', fontSize: 14 }}>{error}</div>}
              <button type="submit" style={{ marginTop: 8 }}>
                {isSignUp ? 'Sign Up' : 'Log In'}
              </button>
            </form>
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <span style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
              </span>
            </div>
          </>
        ) : (
          <div>
            <h3>Welcome! Please review our User Guidelines:</h3>
            <ul style={{ textAlign: 'left', margin: '16px 0' }}>
              {guidelines.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
            <button onClick={handleAcceptGuidelines} style={{ marginTop: 16 }}>
              I Accept & Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;