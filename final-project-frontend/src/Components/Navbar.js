import React, { useState } from 'react';
import AuthPage from './AuthPage';

const Navbar = () => {
  const [showAuth, setShowAuthPage] = useState(false);

  const handleLoginClick = () => {
    setShowAuthPage(true);
  };

  const closeAuthPage = () => setShowAuthPage(false);

  return (
    <div className='navbar'>
      {/* Navbar with logo and company name */}
      <nav className='navbar-nav'>
        <div className='navbar-brand'>
          ToDo Travels
        </div>
        <div className='navbar-actions'>
          <button className='navbar-buttons' onClick={handleLoginClick}>
            Login
          </button>
          <form>
            <input
              className="search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      {/* Login Popup Modal */}
      {showAuth && <AuthPage onClose={closeAuthPage} />}
    </div>
  );
};

export default Navbar;