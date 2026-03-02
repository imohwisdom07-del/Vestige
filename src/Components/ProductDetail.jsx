import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VESTIGE_COLLECTION } from '../Data/ProductData';
import './ProductsDetail.css';

const ProductDetail = ({ addToManifest, addToVault }) => {
  const { id } = useParams();
  const [shoe, setShoe] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [manifestStatus, setManifestStatus] = useState('idle'); // idle | success
  const [vaultStatus, setVaultStatus] = useState('idle');       // idle | success

  useEffect(() => {
    const foundShoe = VESTIGE_COLLECTION.find(p => p.id === parseInt(id));
    if (foundShoe) setShoe(foundShoe);
    window.scrollTo(0, 0);
  }, [id]);

  const sizes = ["37", "38", "39", "40", "41", "42", "43", "44", "45"];

  // ── ADD TO MANIFEST ────────────────────────────────────────────────────────
  const handleAcquisition = () => {
    if (!selectedSize) {
      alert("CRITICAL_ERROR: DIMENSION_NOT_SELECTED. PLEASE_SELECT_SIZE.");
      return;
    }

    // NOTE: instanceId is also stamped in App.js addToManifest,
    // but keeping it here too for safety if this component is ever used standalone
    const unitPayload = {
      ...shoe,
      size: selectedSize,
      instanceId: `${shoe.id}-${selectedSize}-${Date.now()}`,
    };

    // FIX: Guard so this never crashes if prop is missing
    if (addToManifest) {
      addToManifest(unitPayload);
      console.log("UNIT_SENT_TO_MANIFEST:", unitPayload);
      setManifestStatus('success');
      setTimeout(() => setManifestStatus('idle'), 2000);
    }
  };

  // ── ADD TO VAULT ───────────────────────────────────────────────────────────
  const handleVault = () => {
    // FIX: Guard added — previously would crash because addToVault was undefined
    if (!addToVault) return;
    addToVault(shoe);
    console.log("UNIT_SAVED_TO_VAULT:", shoe);
    setVaultStatus('success');
    setTimeout(() => setVaultStatus('idle'), 2000);
  };

  if (!shoe) return <div className="loading-screen">SYSTEM_RECOVERY_IN_PROGRESS...</div>;

  return (
    <div className="luxury-wrapper">
      <section className="scroll-gallery">
        {[shoe.imgBase, shoe.imgHover, shoe.imgBase].map((img, index) => (
          <div key={index} className="gallery-frame">
            <div className="frame-corner top-left"></div>
            <img src={img} alt="Unit View" />
            <span className="meta-tag">ANGLE_DETECTION_0{index + 1} // VSTG_SYS</span>
          </div>
        ))}
      </section>

      <aside className="scroll-data">
        <div className="sticky-container">
          <div className="terminal-header">
            <span className="blink-text">● LIVE_NODE</span>
            <span className="serial-num">ID: {shoe.id}_XLR8</span>
          </div>

          <nav className="back-nav">
            <Link to="/collection">◳ RETURN_TO_COLLECTION</Link>
          </nav>

          <header className="unit-header">
            <h1 className="unit-title">{shoe.name}</h1>
            <div className="price-badge">€{shoe.price}</div>
          </header>

          <div className="info-grid">
            <div className="info-block">
              <h4 className="label">TECHNICAL_SUMMARY</h4>
              <p className="desc-text">{shoe.description}</p>
            </div>

            <div className="info-block">
              <h4 className="label">DIMENSION_SELECT (EU)</h4>
              <div className="size-matrix-grid">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`matrix-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="cta-group">
            {/* FIX: Button now reflects acquisition status */}
            <button
              className={`buy-button ${manifestStatus === 'success' ? 'success' : ''}`}
              onClick={handleAcquisition}
            >
              {manifestStatus === 'success' ? "UNIT_ACQUIRED ✓" : "INITIALIZE_ACQUISITION"}
            </button>

            {/* FIX: onClick now uses handleVault with guard, not raw addToVault(shoe) */}
            <button
              className={`fav-button ${vaultStatus === 'success' ? 'success' : ''}`}
              onClick={handleVault}
            >
              {vaultStatus === 'success' ? "VAULT_SECURED ✓" : "SAVE_TO_VAULT_†"}
            </button>
          </div>

          <footer className="unit-footer">
            <div className="footer-line">LOG: LUXURY-01_CERTIFIED</div>
            <div className="footer-line">©2026 VESTIGE_LABS</div>
          </footer>
        </div>
      </aside>
    </div>
  );
};

export default ProductDetail;
