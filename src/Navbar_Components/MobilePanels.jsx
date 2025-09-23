import React from 'react';
import { X, Search } from 'lucide-react';

const MobilePanels = ({
  mobilePanelType,
  closeMobilePanel,
  setMobilePanelType,
  selectedBrands,
  onBrandToggle,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onReset
}) => {
  const brands = ['Bentley', 'Coming', 'Ferrari', 'Lamborghini', 'Land Rover', 'Mercedes', 'Porsche'];
  const sortOptions = ['Fastest availability', 'Increasing rent', 'Decreasing rent'];

  const handleMinChange = (e) => {
    onPriceChange({ ...priceRange, min: parseInt(e.target.value) || 0 });
  };

  const handleMaxChange = (e) => {
    onPriceChange({ ...priceRange, max: parseInt(e.target.value) || 0 });
  };

  if (!mobilePanelType) return null;

  return (
    <>
      {/* Mobile Search Panel */}
      {mobilePanelType === 'search' && (
        <div 
          className="mobile-panel-overlay"
          onClick={closeMobilePanel}
        >
          <div 
            className="mobile-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-panel-header">
              <div>
                <div className="mobile-panel-title">Search a vehicle</div>
              </div>
              <button
                className="mobile-panel-close"
                onClick={closeMobilePanel}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mobile-panel-content">
              <div style={{ marginBottom: '1.5rem' }}>
                <div 
                  style={{
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    marginBottom: '1rem'
                  }}
                  onClick={() => setMobilePanelType('brands')}
                >
                  <div style={{ fontWeight: '500', color: '#000000' }}>Brands</div>
                </div>
                
                <div 
                  style={{
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    marginBottom: '1rem'
                  }}
                  onClick={() => setMobilePanelType('price')}
                >
                  <div style={{ fontWeight: '500', color: '#000000' }}>Price range</div>
                </div>
                
                <div 
                  style={{
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer'
                  }}
                  onClick={() => setMobilePanelType('sort')}
                >
                  <div style={{ fontWeight: '500', color: '#000000' }}>Sort by</div>
                </div>
              </div>
            </div>
            
            <div className="mobile-panel-actions">
              <button className="mobile-reset-button" onClick={onReset}>
                Reset
              </button>
              <button className="mobile-search-button" onClick={closeMobilePanel}>
                <Search size={16} />
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Brands Panel */}
      {mobilePanelType === 'brands' && (
        <div 
          className="mobile-panel-overlay"
          onClick={closeMobilePanel}
        >
          <div 
            className="mobile-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-panel-header">
              <div>
                <div className="mobile-panel-title">Brands</div>
                <div className="mobile-panel-subtitle">Which brand?</div>
              </div>
              <button
                className="mobile-panel-close"
                onClick={() => setMobilePanelType('search')}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mobile-panel-content">
              <div className="brands-grid">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    className={`brand-button ${selectedBrands.includes(brand) ? 'selected' : ''}`}
                    onClick={() => onBrandToggle(brand)}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mobile-panel-actions">
              <button className="mobile-reset-button" onClick={onReset}>
                Reset
              </button>
              <button className="mobile-search-button" onClick={() => setMobilePanelType('search')}>
                Show results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Price Panel */}
      {mobilePanelType === 'price' && (
        <div 
          className="mobile-panel-overlay"
          onClick={closeMobilePanel}
        >
          <div 
            className="mobile-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-panel-header">
              <div>
                <div className="mobile-panel-title">Price range</div>
                <div className="mobile-panel-subtitle">Per month HTTVA</div>
              </div>
              <button
                className="mobile-panel-close"
                onClick={() => setMobilePanelType('search')}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mobile-panel-content">
              <div className="price-inputs">
                <div className="price-input-group">
                  <label className="price-input-label">Minimum :</label>
                  <input
                    type="number"
                    className="price-input"
                    value={priceRange.min}
                    onChange={handleMinChange}
                    placeholder="0"
                  />
                </div>
                <div className="price-input-group">
                  <label className="price-input-label">Maximum :</label>
                  <input
                    type="number"
                    className="price-input"
                    value={priceRange.max}
                    onChange={handleMaxChange}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            
            <div className="mobile-panel-actions">
              <button className="mobile-reset-button" onClick={onReset}>
                Reset
              </button>
              <button className="mobile-search-button" onClick={() => setMobilePanelType('search')}>
                Show results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sort Panel */}
      {mobilePanelType === 'sort' && (
        <div 
          className="mobile-panel-overlay"
          onClick={closeMobilePanel}
        >
          <div 
            className="mobile-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-panel-header">
              <div>
                <div className="mobile-panel-title">Sort by</div>
                <div className="mobile-panel-subtitle">Choose your sorting preference</div>
              </div>
              <button
                className="mobile-panel-close"
                onClick={() => setMobilePanelType('search')}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mobile-panel-content">
              <div className="sort-options">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    className={`sort-option ${sortBy === option ? 'selected' : ''}`}
                    onClick={() => onSortChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mobile-panel-actions">
              <button className="mobile-reset-button" onClick={onReset}>
                Reset
              </button>
              <button className="mobile-search-button" onClick={() => setMobilePanelType('search')}>
                Show results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobilePanels;