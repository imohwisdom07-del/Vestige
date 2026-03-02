import React from 'react';
import { Link } from 'react-router-dom';
import { VESTIGE_COLLECTION } from '../Data/ProductData';
import './Archive.css';

const Archive = ({ addToManifest }) => {
  return (
    <div className="archive-page">
      <header className="archive-hero">
        <div className="status-tag">SYSTEM_STATUS: ONLINE_VAULT</div>
        <h1 className="hero-title-large">THE_ARCHIVE</h1>
        {/* Updated for clarity: Simple and direct */}
        <p className="hero-subtitle">THE COMPLETE HISTORY OF EVERY VESTIGE RELEASE</p>
      </header>

      <div className="archive-container">
        {VESTIGE_COLLECTION.map((shoe) => {
          // Logic: Mark specific shoes as sold (IDs 1, 4, 5, 10, 11)
          const isSold = [1, 4, 5, 10, 11].includes(shoe.id);

          return (
            <div key={shoe.id} className={`archive-entry-row ${isSold ? 'unit-sold' : 'unit-active'}`}>
              <div className="entry-index">00{shoe.id}</div>
              
              <div className="entry-visual">
                <img src={shoe.imgBase} alt={shoe.name} className="archival-asset" />
                {isSold && <div className="sold-overlay">VAULTED_UNIT</div>}
              </div>

              <div className="entry-info">
                <h2 className="entry-name">{shoe.name}</h2>
                <div className="entry-tags">
                  <span className={`tag ${isSold ? 'tag-sold' : ''}`}>
                    {isSold ? 'STATUS: SOLD_OUT' : 'STATUS: AVAILABLE'}
                  </span>
                  <span className="tag">GEN_01</span>
                  <span className="tag">REF_{shoe.id}</span>
                </div>
              </div>

              <div className="entry-action">
                {isSold ? (
                  <span className="view-btn disabled">ARCHIVED_RECORD</span>
                ) : (
                  <Link to={`/product/${shoe.id}`} className="view-btn">
                    VIEW_DETAILS
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Archive;