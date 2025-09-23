import React from 'react';
import { Search, Menu, X, Languages } from 'lucide-react';
import Categories from './Categories';
import MobileSidePanel from './MobileSidePanel';

const MobileNavbar = ({
  selectedCategory,
  onCategoryChange,
  isMobileMenuOpen,
  toggleMobileMenu,
  openMobilePanel
}) => {
  return (
    <div className="navbar-mobile">
      <div className="mobile-header">
        <div className="mobile-left">
          <button className="mobile-language-btn">
            <Languages size={18} />
          </button>
        </div>
        
        <div className="mobile-center">
          <div 
            className="mobile-search-pill"
            onClick={() => openMobilePanel('search')}
          >
            <Search size={16} className="mobile-search-icon" />
            <div className="mobile-labels">
              <span className="mobile-label">Brands</span>
              <span className="mobile-label secondary">Price range</span>
            </div>
          </div>
        </div>
        
        <div className="mobile-right">
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <Categories 
        selectedCategory={selectedCategory} 
        onCategoryChange={onCategoryChange}
        isMobile={true}
      />

      {isMobileMenuOpen && (
        <MobileSidePanel onClose={toggleMobileMenu} />
      )}
    </div>
  );
};

export default MobileNavbar;