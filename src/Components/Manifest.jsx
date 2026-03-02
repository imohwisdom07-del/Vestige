import React from 'react';
import './Manifest.css';

const Manifest = ({ manifestItems = [], removeFromManifest }) => {
  const aggregateValue = manifestItems.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    return total + price;
  }, 0);

  return (
    <div className="manifest-page">
      <header className="manifest-header">
        <div className="status-tag">DOCUMENT_TYPE: ACQUISITION_MANIFEST</div>
        <h1 className="hero-title-large">CURRENT_MANIFEST</h1>
        <div className="manifest-meta">
          <span>OPERATOR: GUEST_USER_01</span>
          <span>TIMESTAMP: {new Date().toLocaleTimeString()}</span>
        </div>
      </header>

      <main className="manifest-table">
        {/* Table header hidden on mobile via CSS */}
        <div className="table-header">
          <span>REF_ID</span>
          <span>UNIT_DESCRIPTION</span>
          <span className="h-dim">DIMENSION</span>
          <span>VALUE</span>
          <span className="h-action">ACTION</span>
        </div>

        {manifestItems.length > 0 ? (
          manifestItems.map((item) => (
            <div key={item.instanceId} className="manifest-row">
              <span className="m-ref">#_{item.id.toString().slice(-4)}</span>
              <div className="m-info">
                <span className="m-name">{item.name}</span>
                <span className="m-sub">VESTIGE_CORE_UNIT</span>
              </div>
              <span className="m-size">EU_{item.size || "NA"}</span>
              <span className="m-price">€{item.price}</span>
              <button 
                className="m-remove" 
                onClick={() => removeFromManifest(item.instanceId)}
              >
                [ TERMINATE ]
              </button>
            </div>
          ))
        ) : (
          <div className="empty-manifest">
            <div className="warning-box">
              <p>// SIGNAL_LOST: NO_UNITS_DETECTED</p>
              <p className="sub-warning">REVERT_TO_COLLECTION_TO_INITIALIZE</p>
            </div>
          </div>
        )}
      </main>

      <footer className="manifest-footer">
        <div className="footer-top-line"></div>
        <div className="total-section">
          <div className="total-label-group">
            <span className="total-label">AGGREGATE_VALUE</span>
            <span className="tax-label">INCL. LUXURY-01_CERT_FEE</span>
          </div>
          <span className="total-price">€{aggregateValue.toFixed(2)}</span>
        </div>
        <button className="execute-btn" disabled={manifestItems.length === 0}>
          EXECUTE_TRANSFER_PROTOCOL
        </button>
      </footer>
    </div>
  );
};

export default Manifest;