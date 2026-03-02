import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Collection from './Components/Collection';
import Archive from './Pages/Archive';
import ProductDetail from './components/ProductDetail';
import Manifest from './Pages/Manifest';

function App() {
  // ── MANIFEST STATE (cart) ──────────────────────────────────────────────────
  const [manifest, setManifest] = useState(() => {
    const saved = localStorage.getItem('LUXURY_01_MANIFEST');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('LUXURY_01_MANIFEST', JSON.stringify(manifest));
  }, [manifest]);

  // FIX 1: instanceId is stamped HERE so every add event is unique
  const addToManifest = (productPayload) => {
    const newItem = {
      ...productPayload,
      instanceId: `${productPayload.id}_${Date.now()}`,
    };
    setManifest((current) => [...current, newItem]);
  };

  const removeFromManifest = (instanceId) => {
    setManifest((current) => current.filter(item => item.instanceId !== instanceId));
  };

  // ── VAULT STATE (wishlist) ─────────────────────────────────────────────────
  // FIX 2: Vault state now exists — was completely missing before
  const [vault, setVault] = useState(() => {
    const saved = localStorage.getItem('LUXURY_01_VAULT');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('LUXURY_01_VAULT', JSON.stringify(vault));
  }, [vault]);

  // Vault is a wishlist — no duplicates by product id
  const addToVault = (product) => {
    const alreadySaved = vault.some(item => item.id === product.id);
    if (alreadySaved) return;
    setVault((current) => [...current, product]);
  };

  const removeFromVault = (id) => {
    setVault((current) => current.filter(item => item.id !== id));
  };

  // ── SEARCH STATE ───────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // ── ROUTES ─────────────────────────────────────────────────────────────────
  return (
    <Router>
      <Navbar onSearch={handleSearch} manifestCount={manifest.length} />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* FIX 3: searchQuery renamed to externalQuery to match what Collection.jsx expects */}
        <Route
          path="/collection/:gender?"
          element={
            <Collection
              addToManifest={addToManifest}
              externalQuery={searchQuery}
            />
          }
        />

        <Route path="/archive/:gender?" element={<Archive />} />

        {/* FIX 4: addToVault is now passed — was missing entirely before */}
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              addToManifest={addToManifest}
              addToVault={addToVault}
            />
          }
        />

        <Route
          path="/manifest"
          element={
            <Manifest
              manifestItems={manifest}
              removeFromManifest={removeFromManifest}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
