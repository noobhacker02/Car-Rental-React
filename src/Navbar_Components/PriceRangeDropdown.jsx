import React, { forwardRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PriceRangeDropdown = forwardRef(({ 
  isActive, 
  onToggle, 
  priceRange, 
  onPriceChange, 
  onReset, 
  onClose,
  isMobile = false
}, ref) => {
  const handleMinChange = (e) => {
    onPriceChange({ ...priceRange, min: parseInt(e.target.value) || 0 });
  };

  const handleMaxChange = (e) => {
    onPriceChange({ ...priceRange, max: parseInt(e.target.value) || 0 });
  };

  return (
    <div className="search-item" ref={ref}>
      <div 
        className={`search-label ${isActive ? 'active' : ''}`}
        onClick={onToggle}
      >
        Price range
        {isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      
      {isActive && (
        <div className="dropdown-panel">
          <div className="dropdown-header">
            <div className="dropdown-title">Price range</div>
            <div className="dropdown-subtitle">Per month HTTVA</div>
          </div>
          
          <div className={`price-inputs ${isMobile ? '' : 'desktop'}`}>
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
          
          <div className="dropdown-actions">
            <button className="reset-button" onClick={onReset}>
              Reset
            </button>
            <button 
              className="show-results-button"
              onClick={onClose}
            >
              Show results
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

PriceRangeDropdown.displayName = 'PriceRangeDropdown';

export default PriceRangeDropdown;