import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onSearch, manifestCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Close search with Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSearchActive(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Auto-close menu/search on navigation
  useEffect(() => {
    setSearchActive(false);
    setIsOpen(false);
  }, [location.pathname]);

  const handleSearchExecute = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      if (query.trim() === "") return;
      if (onSearch) onSearch(query);
      setSearchActive(false);
      if (location.pathname !== '/collection') navigate('/collection');
      e.target.blur(); 
    }
  };

  return (
    <>
      {/* Background blur when searching */}
      {searchActive && <div className="search-overlay-bg" onClick={() => setSearchActive(false)} />}

      <nav className={`vestige-navbar ${isOpen ? 'menu-open' : ''}`}>
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          <div className="line"></div><div className="line"></div><div className="line"></div>
        </div>

        <div className={`nav-section left ${isOpen ? 'show' : ''}`}>
          <Link to="/collection" className="nav-link">COLLECTION</Link>
          <Link to="/archive" className="nav-link">THE_ARCHIVE</Link>
        </div>

        <div className="nav-logo">
          <Link to="/">
            <img src="/Vestige-logo.png" alt="LUXURY-01" className="logo-img" />
          </Link>
        </div>

        <div className="nav-section right">
          <div className={`nav-search-wrapper ${searchActive ? 'active' : ''}`}>
            {searchActive ? (
              <div className="search-input-container">
                <input 
                  type="text" 
                  className="nav-search-input"
                  placeholder="SEARCH_THE_LAB..."
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearchExecute}
                />
                <button className="search-close-btn" onClick={() => setSearchActive(false)}>✕</button>
              </div>
            ) : (
              <button className="search-icon-btn" onClick={() => setSearchActive(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>
                </svg>
              </button>
            )}
          </div>
          
          <Link to="/manifest" className="nav-link">
            Cart({manifestCount})
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;