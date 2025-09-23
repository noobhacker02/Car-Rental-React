import React, { forwardRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const BrandsDropdown = forwardRef(({ 
  isActive, 
  onToggle, 
  selectedBrands, 
  onBrandToggle, 
  onReset, 
  onClose 
}, ref) => {
  const brands = ['Bentley', 'Coming', 'Ferrari', 'Lamborghini', 'Land Rover', 'Mercedes', 'Porsche'];

  return (
    <div className="search-item" ref={ref}>
      <div 
        className={`search-label ${isActive ? 'active' : ''}`}
        onClick={onToggle}
      >
        Brands
        {isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      
      {isActive && (
        <div className="dropdown-panel">
          <div className="dropdown-header">
            <div className="dropdown-title">Brands</div>
            <div className="dropdown-subtitle">Which brand?</div>
          </div>
          
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

BrandsDropdown.displayName = 'BrandsDropdown';

export default BrandsDropdown;