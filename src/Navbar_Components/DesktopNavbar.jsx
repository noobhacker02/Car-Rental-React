import React from 'react';
import { Languages, Phone } from 'lucide-react';
import BrandsDropdown from './BrandsDropdown';
import PriceRangeDropdown from './PriceRangeDropdown';
import SortByDropdown from './SortByDropdown';
import Categories from './Categories';

const DesktopNavbar = ({
  // Dropdown refs and states
  dropdownRefs,
  activeDropdown,
  toggleDropdown,
  
  // Filter states
  selectedBrands,
  onBrandToggle,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onReset,
  
  // Category states
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="navbar-desktop">
      <div className="navbar-header">
        <div className="navbar-brand">
          <img src="/carlogo.png" alt="Logo" className="brand-logo" />
        </div>
        
        <div className="navbar-search-container">
          <div className="navbar-search">
            <BrandsDropdown
              ref={dropdownRefs.brands}
              isActive={activeDropdown === 'brands'}
              onToggle={() => toggleDropdown('brands')}
              selectedBrands={selectedBrands}
              onBrandToggle={onBrandToggle}
              onReset={onReset}
              onClose={() => toggleDropdown(null)}
            />

            <PriceRangeDropdown
              ref={dropdownRefs.price}
              isActive={activeDropdown === 'price'}
              onToggle={() => toggleDropdown('price')}
              priceRange={priceRange}
              onPriceChange={onPriceChange}
              onReset={onReset}
              onClose={() => toggleDropdown(null)}
              isMobile={false}
            />

            <SortByDropdown
              ref={dropdownRefs.sort}
              isActive={activeDropdown === 'sort'}
              onToggle={() => toggleDropdown('sort')}
              sortBy={sortBy}
              onSortChange={onSortChange}
              onReset={onReset}
              onClose={() => toggleDropdown(null)}
            />
          </div>
        </div>

        <div className="navbar-actions">
          <button className="action-btn">Login</button>
          <button className="action-btn icon-btn">
            <Languages size={20} />
          </button>
          <button className="action-btn icon-btn">
            <Phone size={20} />
          </button>
        </div>
      </div>

      <Categories 
        selectedCategory={selectedCategory} 
        onCategoryChange={onCategoryChange}
        isMobile={false}
      />
    </div>
  );
};

export default DesktopNavbar;