import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Collection from './Components/Collection';
import Archive from './Pages/Archive';
import ProductDetail from './Pages/ProductsDetails';
import Manifest from './Pages/Manifest';

function App() {
  const [manifest, setManifest] = useState(() => {
    const saved = localStorage.getItem('LUXURY_01_MANIFEST');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('LUXURY_01_MANIFEST', JSON.stringify(manifest));
  }, [manifest]);

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

  const [vault, setVault] = useState(() => {
    const saved = localStorage.getItem('LUXURY_01_VAULT');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('LUXURY_01_VAULT', JSON.stringify(vault));
  }, [vault]);

  const addToVault = (product) => {
    const alreadySaved = vault.some(item => item.id === product.id);
    if (alreadySaved) return;
    setVault((current) => [...current, product]);
  };

  const removeFromVault = (id) => {
    setVault((current) => current.filter(item => item.id !== id));
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <Router>
      <Navbar onSearch={handleSearch} manifestCount={manifest.length} />

      <Routes>
        <Route path="/" element={<Home />} />

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
