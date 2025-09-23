import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  User, 
  Languages, 
  Phone,
  Grid3X3,
  Zap,
  Car,
  CarFront,
  Package,
  Truck,
  Sun,
  CircleUserRound,
  Tag,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Navbar = ({ onCategoryChange = () => {} }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobilePanelType, setMobilePanelType] = useState(null);
  
  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [sortBy, setSortBy] = useState('Fastest availability');

  const dropdownRefs = {
    brands: useRef(null),
    price: useRef(null),
    sort: useRef(null)
  };

  const categories = [
    { id: 'ALL', label: 'ALL', icon: Grid3X3 },
    { id: 'ELECTRIC', label: 'ELECTRIC', icon: Zap },
    { id: 'SUV', label: 'SUV', icon: Car },
    { id: 'SPORTS_COUPE', label: 'SPORTS COUPE', icon: CarFront },
    { id: 'AVAILABLE', label: 'AVAILABLE', icon: Package },
    { id: 'SEDAN', label: 'SEDAN', icon: Car },
    { id: 'CONVERTIBLE', label: 'CONVERTIBLE', icon: Sun },
    { id: 'WAGON', label: 'WAGON', icon: Truck },
    { id: 'HYBRID', label: 'HYBRID', icon: Zap },
    { id: 'ONE_OF_1', label: 'ONE OF 1', icon: Tag },
    { id: 'CATEGORIE_1', label: 'CATEGORIE 1', icon: CircleUserRound },
    { id: 'CATEGORIE_2', label: 'CATEGORIE 2', icon: CircleUserRound },
    { id: 'CATEGORIE_3', label: 'CATEGORIE 3', icon: CircleUserRound },
    { id: 'CATEGORIE_4', label: 'CATEGORIE 4', icon: CircleUserRound }
  ];

  const brands = ['Bentley', 'Coming', 'Ferrari', 'Lamborghini', 'Land Rover', 'Mercedes', 'Porsche'];
  const sortOptions = ['Fastest availability', 'Increasing rent', 'Decreasing rent'];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.values(dropdownRefs).forEach(ref => {
        if (ref.current && !ref.current.contains(event.target)) {
          setActiveDropdown(null);
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

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

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 0 });
    setSortBy('Fastest availability');
  };

  return (
    <>
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
        }

        .navbar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 0;
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
        }

        .navbar-search:hover {
          border-color: #d1d5db;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
        }

        .search-item {
          position: relative;
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

        /* Dropdown Styles */
        .dropdown-panel {
          position: absolute;
          top: calc(100% + 1rem);
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid #e5e7eb;
          min-width: 320px;
          max-width: 400px;
          z-index: 1000;
          animation: dropdownSlide 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
        }

        .price-input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .price-range-slider {
          margin-bottom: 1.5rem;
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

        /* Categories */
        .navbar-categories {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 0 1rem 0;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
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
          animation: categorySlide 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-delay: var(--category-delay);
          animation-fill-mode: both;
        }

        @keyframes categorySlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          animation: underlineSlide 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes underlineSlide {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        /* Mobile Styles */
        .navbar-mobile {
          display: block;
          padding: 1rem 1rem 0.5rem 1rem;
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
          animation: pillSlide 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes pillSlide {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
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

        /* Mobile Categories */
        .mobile-categories {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 0;
          -ms-overflow-style: none;
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
          animation: categorySlide 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-delay: var(--mobile-category-delay);
          animation-fill-mode: both;
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
          animation: underlineSlide 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

        /* Mobile Panels */
        .mobile-panel-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
          animation: overlayFade 0.3s ease;
        }

        @keyframes overlayFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .mobile-panel {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          animation: panelSlideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes panelSlideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          animation: overlayFade 0.3s ease;
        }

        .mobile-side-panel {
          background-color: white;
          width: 80%;
          max-width: 320px;
          height: 100vh;
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          animation: sidePanelSlide 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes sidePanelSlide {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
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
        }

        @media (min-width: 768px) {
          .navbar-mobile {
            display: none;
          }
          
          .navbar-desktop {
            display: block;
          }
        }

        /* Apply staggered animation delays */
        ${categories.map((_, index) => `
          .category-btn:nth-child(${index + 1}) {
            --category-delay: ${index * 50}ms;
          }
          .mobile-category-btn:nth-child(${index + 1}) {
            --mobile-category-delay: ${index * 30}ms;
          }
        `).join('')}
      `}</style>

      <div className="navbar-container">
        {/* Desktop Navbar */}
        <div className="navbar-desktop">
          <div className="navbar-header">
            <div className="navbar-brand">
              <img src="/carlogo.png" alt="Logo" className="brand-logo" />
            </div>
            
            <div className="navbar-search-container">
              <div className="navbar-search">
                <div className="search-item" ref={dropdownRefs.brands}>
                  <div 
                    className={`search-label ${activeDropdown === 'brands' ? 'active' : ''}`}
                    onClick={() => toggleDropdown('brands')}
                  >
                    Brands
                    {activeDropdown === 'brands' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  
                  {activeDropdown === 'brands' && (
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
                            onClick={() => handleBrandToggle(brand)}
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                      
                      <div className="dropdown-actions">
                        <button className="reset-button" onClick={resetFilters}>
                          Reset
                        </button>
                        <button 
                          className="show-results-button"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Show results
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="search-item" ref={dropdownRefs.price}>
                  <div 
                    className={`search-label ${activeDropdown === 'price' ? 'active' : ''}`}
                    onClick={() => toggleDropdown('price')}
                  >
                    Price range
                    {activeDropdown === 'price' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  
                  {activeDropdown === 'price' && (
                    <div className="dropdown-panel">
                      <div className="dropdown-header">
                        <div className="dropdown-title">Price range</div>
                        <div className="dropdown-subtitle">Per month HTTVA</div>
                      </div>
                      
                      <div className="price-inputs">
                        <div className="price-input-group">
                          <label className="price-input-label">Minimum :</label>
                          <input
                            type="number"
                            className="price-input"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                            placeholder="0"
                          />
                        </div>
                        <div className="price-input-group">
                          <label className="price-input-label">Maximum :</label>
                          <input
                            type="number"
                            className="price-input"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 0 }))}
                            placeholder="0"
                          />
                        </div>
                      </div>
                      
                      <div className="dropdown-actions">
                        <button className="reset-button" onClick={resetFilters}>
                          Reset
                        </button>
                        <button 
                          className="show-results-button"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Show results
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="search-item" ref={dropdownRefs.sort}>
                  <div 
                    className={`search-label ${activeDropdown === 'sort' ? 'active' : ''}`}
                    onClick={() => toggleDropdown('sort')}
                  >
                    Sort by
                    {activeDropdown === 'sort' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  
                  {activeDropdown === 'sort' && (
                    <div className="dropdown-panel">
                      <div className="dropdown-header">
                        <div className="dropdown-title">Sort by</div>
                        <div className="dropdown-subtitle">Choose your sorting preference</div>
                      </div>
                      
                      <div className="sort-options">
                        {sortOptions.map((option) => (
                          <button
                            key={option}
                            className={`sort-option ${sortBy === option ? 'selected' : ''}`}
                            onClick={() => setSortBy(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      
                      <div className="dropdown-actions">
                        <button className="reset-button" onClick={resetFilters}>
                          Reset
                        </button>
                        <button 
                          className="show-results-button"
                          onClick={() => setActiveDropdown(null)}
                        >
                          Show results
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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

          <div className="navbar-categories">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  className={`category-btn ${isSelected ? 'category-btn--active' : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="category-icon">
                    <IconComponent size={24} />
                  </div>
                  <span className="category-label">{category.label}</span>
                  
                  {isSelected && (
                    <div className="category-underline" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="navbar-mobile">
          <div className="mobile-header">
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
            
            <button
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="mobile-categories">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  className={`mobile-category-btn ${isSelected ? 'mobile-category-btn--active' : ''}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="mobile-category-icon">
                    <IconComponent size={20} />
                  </div>
                  <span className="mobile-category-label">{category.label}</span>
                </button>
              );
            })}
          </div>

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
                  <button className="mobile-reset-button" onClick={resetFilters}>
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
                        onClick={() => handleBrandToggle(brand)}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mobile-panel-actions">
                  <button className="mobile-reset-button" onClick={resetFilters}>
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
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                    <div className="price-input-group">
                      <label className="price-input-label">Maximum :</label>
                      <input
                        type="number"
                        className="price-input"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mobile-panel-actions">
                  <button className="mobile-reset-button" onClick={resetFilters}>
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
                        onClick={() => setSortBy(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mobile-panel-actions">
                  <button className="mobile-reset-button" onClick={resetFilters}>
                    Reset
                  </button>
                  <button className="mobile-search-button" onClick={() => setMobilePanelType('search')}>
                    Show results
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Side Panel for menu */}
          {isMobileMenuOpen && (
            <div
              className="mobile-side-panel-overlay"
              onClick={toggleMobileMenu}
            >
              <div
                className="mobile-side-panel"
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6' }}>
                  <img src="/carlogo.png" alt="Logo" style={{ height: '32px' }} />
                </div>
                
                <div style={{ flex: 1, padding: '1rem' }}>
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 1rem 0' }}>Navigation</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '8px', color: '#374151', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500' }}>
                        <User size={18} />
                        <span>Login</span>
                      </button>
                      <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '8px', color: '#374151', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500' }}>
                        <Languages size={18} />
                        <span>Language</span>
                      </button>
                      <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '8px', color: '#374151', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500' }}>
                        <Phone size={18} />
                        <span>Contact</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar