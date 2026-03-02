import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VESTIGE_COLLECTION } from '../Data/ProductData';
import './Collection.css';

const Collection = ({ externalQuery, addToManifest }) => {
  const { gender } = useParams();
  const [products, setProducts] = useState(VESTIGE_COLLECTION);
  const [loading, setLoading] = useState(false);

  const fetchFootwear = useCallback(async (query = "") => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`https://sneaker-database-api.p.rapidapi.com/shoes?name=${query}&limit=15`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'YOUR_ACTUAL_API_KEY_HERE',
          'x-rapidapi-host': 'sneaker-database-api.p.rapidapi.com'
        }
      });
      const result = await response.json();

      const formattedResults = result.map(item => ({
        id: item.uuid,
        name: item.shoeName.toUpperCase(),
        price: item.retailPrice || "VARIES",
        category: item.gender.toLowerCase().includes('women') ? 'women' : 'Men',
        subCategory: query.toLowerCase(),
        imgBase: item.thumbnail,
        imgHover: item.thumbnail,
        description: item.description || "EXTERNAL_DATA_PROTECTED",
      }));

      setProducts([...VESTIGE_COLLECTION, ...formattedResults]);
    } catch (error) {
      console.error("SYSTEM_LOG: API_SYNC_FAILED", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (externalQuery) fetchFootwear(externalQuery);
  }, [externalQuery, fetchFootwear]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayShoes = gender 
    ? products.filter(shoe => shoe.category.toLowerCase() === gender.toLowerCase())
    : products;

  return (
    <div className="collection-page">
      <header className="collection-header">
        <div className="header-meta">
          <div className="meta-left">
            <div className="meta-label-group">
              <span className="spec-label">SPEC: LUXURY-01_CERTIFIED</span>
              <span className="sub-label">PROTOCOL: VSTG_API_V3</span>
            </div>
          </div>
          
          <div className="meta-right">
            <div className="system-status">
              <span className={`${loading ? 'loading-blink' : 'blink-dot'}`}></span>
              <span className="log-text">
                {loading ? "FETCHING_EXTERNAL_UNITS..." : `UNITS_SYNCED: ${displayShoes.length}`}
              </span>
            </div>
          </div>
        </div>

        <h1 className="hero-title-large">
          {gender ? `VESTIGE / ${gender.toUpperCase()}` : "VESTIGE / COLLECTION"}
        </h1>
      </header>

      <main className="archive-grid">
        {displayShoes.map((shoe) => (
          <div key={shoe.id} className="product-card">
            <Link to={`/product/${shoe.id}`} className="image-container">
              <img src={shoe.imgBase} className="img-base" alt={shoe.name} />
              <img src={shoe.imgHover} className="img-hover" alt={shoe.name} />
              
              {/* UPDATED: Layman-friendly technical command */}
              <div className="touch-hint">
                <span>[ ACCESS_PRODUCT_SPECS ]</span>
              </div>
            </Link>

            <div className="product-info">
              <div className="info-row-top">
                <h3 className="product-name">{shoe.name}</h3>
                <p className="product-price">€{shoe.price}</p>
              </div>
              <div className="info-row-bottom">
                <span className="unit-label">{shoe.subCategory?.toUpperCase() || "CORE_UNIT"}</span>
                <span className="unit-id">REF_{shoe.id.toString().slice(-4)}</span>
              </div>
              
              {/* ADDED: Direct Manifest Action */}
              <button 
                className="quick-acquire-btn"
                onClick={() => addToManifest(shoe)}
              >
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Collection;