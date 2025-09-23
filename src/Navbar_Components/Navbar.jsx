import React, { useState, useRef, useEffect, useCallback } from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import MobilePanels from './MobilePanels';

const Navbar = ({ 
  filters,
  onCategoryChange,
  onBrandToggle,
  onPriceChange,
  onSortChange,
  onResetFilters
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobilePanelType, setMobilePanelType] = useState(null);

  const dropdownRefs = {
    brands: useRef(null),
    price: useRef(null),
    sort: useRef(null)
  };

  // Create a stable reference to the handleClickOutside function
  const handleClickOutside = useCallback((event) => {
    Object.values(dropdownRefs).forEach(ref => {
      if (ref.current && !ref.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    });
  }, []); // Empty dependency array since dropdownRefs is stable

  // Close dropdowns when clicking outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setMobilePanelType(null);
  };

  const openMobilePanel = (type) => {
    setMobilePanelType(type);
  };

  const closeMobilePanel = () => {
    setMobilePanelType(null);
  };

  return (
    <>
      {/* Enhanced Navbar Styles with Fixed Z-Index Management */}
      <style>{`
        /* Enhanced Navbar Styles */
        .navbar-container {
          width: 100%;
          background-color: #ffffff;
          border-bottom: 1px solid #f3f4f6;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          animation: slideDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          isolation: isolate; /* Creates new stacking context */
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Desktop Styles */
        .navbar-desktop {
          display: none;
          padding: 0 2rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 101;
        }

        .navbar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 0;
          position: relative;
          z-index: 102;
        }

        .brand-logo {
          height: 40px;
          width: auto;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .brand-logo:hover {
          transform: scale(1.05);
        }

        .navbar-search-container {
          flex: 1;
          display: flex;
          justify-content: center;
          margin: 0 2rem;
          position: relative;
          z-index: 103;
        }

        .navbar-search {
          background-color: #f9fafb;
          border-radius: 50px;
          padding: 0.75rem 2rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          border: 1px solid #e5e7eb;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 104;
        }

        .navbar-search:hover {
          border-color: #d1d5db;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
        }

        .search-item {
          position: relative;
          z-index: 105;
        }

        .search-label {
          font-size: 0.95rem;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          white-space: nowrap; /* Prevent text wrapping */
        }

        .search-label:hover {
          color: #000000;
          background-color: rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
        }

        .search-label.active {
          color: #2563eb;
          background-color: rgba(37, 99, 235, 0.1);
        }

        /* Enhanced Dropdown Styles with Fixed Positioning and Z-Index */
        .dropdown-panel {
          position: absolute;
          top: calc(100% + 1rem);
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 
                      0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          min-width: 320px;
          max-width: 400px;
          width: max-content; /* Prevent overflow issues */
          z-index: 1000; /* Very high z-index to ensure it's above everything */
          animation: dropdownSlide 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          isolation: isolate; /* Creates new stacking context */
        }

        /* Brands dropdown specific width */
        .search-item:nth-child(1) .dropdown-panel {
          min-width: 340px;
          max-width: 420px;
        }

        /* Price range dropdown specific width */
        .search-item:nth-child(2) .dropdown-panel {
          min-width: 320px;
          max-width: 380px;
        }

        /* Sort dropdown specific width */
        .search-item:nth-child(3) .dropdown-panel {
          min-width: 300px;
          max-width: 360px;
        }

        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }

        .dropdown-header {
          margin-bottom: 1rem;
        }

        .dropdown-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #000000;
          margin-bottom: 0.5rem;
        }

        .dropdown-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .brands-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .brand-button {
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .brand-button:hover {
          border-color: #d1d5db;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .brand-button.selected {
          border-color: #2563eb;
          background-color: #eff6ff;
          color: #2563eb;
          transform: scale(1.02);
        }

        .price-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .price-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .price-input-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
        }

        .price-input {
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }

        .price-input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .sort-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .sort-option {
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          width: 100%;
          box-sizing: border-box;
        }

        .sort-option:hover {
          border-color: #d1d5db;
          transform: translateY(-1px);
        }

        .sort-option.selected {
          border-color: #2563eb;
          background-color: #eff6ff;
          color: #2563eb;
        }

        .dropdown-actions {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .reset-button {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .reset-button:hover {
          background-color: #f9fafb;
          transform: translateY(-1px);
        }

        .show-results-button {
          flex: 2;
          padding: 0.75rem;
          background: #000000;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .show-results-button:hover {
          background-color: #1f1f1f;
          transform: translateY(-1px);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
          z-index: 102;
        }

        .action-btn {
          background: none;
          border: none;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.95rem;
        }

        .action-btn:hover {
          background-color: #f3f4f6;
          color: #000000;
          transform: translateY(-1px);
        }

        .icon-btn {
          padding: 0.5rem;
        }

        /* Categories with Lower Z-Index */
        .navbar-categories {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 0 0.4rem 0;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          position: relative;
          z-index: 50; /* Lower than dropdowns */
        }

        .navbar-categories::-webkit-scrollbar {
          display: none;
        }

        .category-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 1rem 0.75rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          min-width: fit-content;
          color: #6b7280;
          transform: translateY(0);
          z-index: 51; /* Slightly higher but still lower than dropdowns */
        }

        .category-btn:hover {
          background-color: #f9fafb;
          color: #000000;
          transform: translateY(-2px);
        }

        .category-btn--active {
          color: #000000;
          background-color: #f9fafb;
        }

        .category-icon {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .category-btn:hover .category-icon {
          transform: scale(1.1);
        }

        .category-label {
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .category-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background-color: #000000;
          border-radius: 2px 2px 0 0;
        }

        /* Mobile Styles */
        .navbar-mobile {
          display: block;
          padding: 1rem 1rem 0.5rem 1rem;
          position: relative;
          z-index: 101;
        }

        .mobile-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .mobile-center {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .mobile-search-pill {
          background-color: #f9fafb;
          border-radius: 50px;
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 70%;
          max-width: 320px;
          min-width: 240px;
          cursor: pointer;
        }

        .mobile-search-pill:active {
          transform: scale(0.98);
        }

        .mobile-search-icon {
          color: #6b7280;
          flex-shrink: 0;
        }

        .mobile-labels {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          text-align: center;
          align-items: center;
          flex: 1;
        }

        .mobile-label {
          font-size: 1rem;
          font-weight: 600;
          color: #000000;
          letter-spacing: -0.022em;
          text-align: center;
        }

        .mobile-label.secondary {
          font-size: 0.875rem;
          font-weight: 400;
          color: #6b7280;
          letter-spacing: -0.008em;
          text-align: center;
        }

        .mobile-menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: #000000;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .mobile-menu-btn:hover {
          background-color: #f3f4f6;
        }

        /* Mobile Categories with Lower Z-Index */
        .mobile-categories {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 0;
          -ms-overflow-style: none;
          position: relative;
          z-index: 50; /* Lower than panels */
        }

        .mobile-categories::-webkit-scrollbar {
          display: none;
        }

        .mobile-category-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.375rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.75rem 0.5rem;
          border-radius: 12px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: fit-content;
          color: #9ca3af;
          position: relative;
          z-index: 51;
        }

        .mobile-category-btn:active {
          transform: scale(0.95);
        }

        .mobile-category-btn--active {
          color: #000000;
          background-color: #f3f4f6;
        }

        .mobile-category-btn--active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 2px;
          background-color: #000000;
          border-radius: 1px;
        }

        .mobile-category-icon {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-category-label {
          font-size: 0.625rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-align: center;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        /* Mobile Panels with Highest Z-Index */
        .mobile-panel-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 2000; /* Highest z-index */
        }

        .mobile-panel {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 2001;
          display: flex;
          flex-direction: column;
        }

        .mobile-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid #f3f4f6;
          background: #f9fafb;
        }

        .mobile-panel-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #000000;
        }

        .mobile-panel-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }

        .mobile-panel-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          color: #6b7280;
          transition: all 0.2s ease;
        }

        .mobile-panel-close:hover {
          background-color: #f3f4f6;
          color: #000000;
        }

        .mobile-panel-content {
          flex: 1;
          padding: 1.5rem 1rem;
          overflow-y: auto;
        }

        .mobile-panel-actions {
          padding: 1rem;
          border-top: 1px solid #f3f4f6;
          background: #f9fafb;
          display: flex;
          gap: 1rem;
        }

        .mobile-reset-button {
          flex: 1;
          padding: 0.875rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-search-button {
          flex: 2;
          padding: 0.875rem;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        /* Mobile Side Panel */
        .mobile-side-panel-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1500;
          display: flex;
          justify-content: flex-end;
        }

        .mobile-side-panel {
          background-color: white;
          width: 80%;
          max-width: 320px;
          height: 100vh;
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          z-index: 1501;
        }

        /* Responsive */
        @media (max-width: 400px) {
          .mobile-search-pill {
            min-width: 200px;
            max-width: 280px;
            padding: 0.6rem 1rem;
          }
          
          .mobile-label {
            font-size: 0.9rem;
          }
          
          .mobile-label.secondary {
            font-size: 0.8rem;
          }

          .dropdown-panel {
            left: 0;
            right: 0;
            transform: none;
            margin: 0 1rem;
            max-width: none;
            min-width: auto;
          }
        }

        @media (min-width: 768px) {
          .navbar-mobile {
            display: none;
          }
          
          .navbar-desktop {
            display: block;
          }
        }

        /* Additional improvements for maintainability */
        .mobile-language-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: #6b7280;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .mobile-language-btn:hover {
          background-color: #f3f4f6;
          color: #000000;
        }
      `}</style>

      <div className="navbar-container">
        <DesktopNavbar
          dropdownRefs={dropdownRefs}
          activeDropdown={activeDropdown}
          toggleDropdown={toggleDropdown}
          selectedBrands={filters?.brands || []}
          onBrandToggle={onBrandToggle}
          priceRange={filters?.priceRange || { min: 0, max: 0 }}
          onPriceChange={onPriceChange}
          sortBy={filters?.sortBy || 'Fastest availability'}
          onSortChange={onSortChange}
          onReset={onResetFilters}
          selectedCategory={filters?.category || 'ALL'}
          onCategoryChange={onCategoryChange}
        />

        <MobileNavbar
          selectedCategory={filters?.category || 'ALL'}
          onCategoryChange={onCategoryChange}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          openMobilePanel={openMobilePanel}
        />

        <MobilePanels
          mobilePanelType={mobilePanelType}
          closeMobilePanel={closeMobilePanel}
          setMobilePanelType={setMobilePanelType}
          selectedBrands={filters?.brands || []}
          onBrandToggle={onBrandToggle}
          priceRange={filters?.priceRange || { min: 0, max: 0 }}
          onPriceChange={onPriceChange}
          sortBy={filters?.sortBy || 'Fastest availability'}
          onSortChange={onSortChange}
          onReset={onResetFilters}
        />
      </div>
    </>
  );
};

export default Navbar;