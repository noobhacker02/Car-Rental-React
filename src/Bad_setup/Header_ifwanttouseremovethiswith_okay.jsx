import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import BrandsDropdown from './BrandsDropdown';
import PriceRangeDropdown from './PriceRangeDropdown';
import SortByDropdown from './SortByDropdown';
import carLogo from './assets/carlogo.png';
import carLogoSmall from './assets/carlogosmall.png';

const Header = ({ onScrollChange }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setIsVisible(false);
          if (onScrollChange) onScrollChange(false);
        } else {
          setIsVisible(true);
          if (onScrollChange) onScrollChange(true);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    let scrollTimer = null;
    const handleScroll = () => {
      clearTimeout(scrollTimer);
      
      scrollTimer = setTimeout(() => {
        setIsVisible(true);
        if (onScrollChange) onScrollChange(true);
      }, 150);
      
      controlHeader();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimer) clearTimeout(scrollTimer);
      };
    }
  }, [lastScrollY, onScrollChange]);

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const styles = {
    header: {
      position: 'sticky',
      top: 0,
      width: '100%',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      zIndex: 50,
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px'
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      flex: '0 0 auto',
      minWidth: '140px'
    },
    logoImage: {
      height: '40px',
      width: 'auto',
      maxWidth: '160px',
      objectFit: 'contain'
    },
    logoImageMobile: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    navigation: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      position: 'relative'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '0.75rem 1.25rem',
      borderRadius: '25px',
      transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#495057'
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flex: '0 0 auto'
    },
    iconButton: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      fontSize: '16px',
      color: '#6b7280'
    },
    hamburgerButton: {
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      borderRadius: '50%',
      transition: 'background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    hamburgerIcon: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3px'
    },
    hamburgerLine: {
      width: '20px',
      height: '2px',
      backgroundColor: '#000000',
      borderRadius: '1px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    mobileOverlay: {
      position: 'fixed',
      top: '65px',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 40,
      transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    desktopSearchBar: {
      flex: '1',
      maxWidth: '400px',
      margin: '0 2rem'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1.25rem',
      fontSize: '0.875rem',
      border: '1px solid #e5e7eb',
      borderRadius: '25px',
      outline: 'none',
      fontFamily: 'inherit',
      transition: 'border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#f8f9fa'
    }
  };

  return (
    <>
      <style>
        {`
          /* Mobile S (430px and smaller) - Show circular logo */
          @media (max-width: 430px) {
            .header-container {
              padding: 0 0.75rem !important;
              gap: 0.5rem !important;
            }
            
            .logo-section {
              flex: 0 0 auto !important;
              min-width: 36px !important;
            }
            
            /* Hide desktop logo on mobile */
            .desktop-logo {
              display: none !important;
            }
            
            /* Show mobile logo */
            .logo-image-mobile {
              display: block !important;
            }
            
            .logo-fallback-mobile {
              display: none !important;
            }
            
            .logo-image-mobile {
              width: 32px !important;
              height: 32px !important;
            }
            
            .logo-fallback-mobile {
              width: 32px !important;
              height: 32px !important;
              font-size: 12px !important;
            }
            
            .right-section {
              gap: 0.5rem !important;
              flex: 0 0 auto !important;
            }
            
            .mobile-search {
              flex: 1 !important;
              margin: 0 0.5rem !important;
              min-width: 60px !important;
            }
            
            .mobile-hamburger {
              width: 36px !important;
              height: 36px !important;
            }
            
            .hamburger-line {
              width: 18px !important;
            }
            
            .desktop-nav {
              display: none !important;
            }
            .desktop-search {
              display: none !important;
            }
          }
          
          /* Mobile M & L (431px-767px) - Show circular logo */
          @media (min-width: 431px) and (max-width: 767px) {
            .header-container {
              gap: 0.75rem !important;
            }
            
            .logo-section {
              flex: 0 0 auto !important;
              min-width: 36px !important;
            }
            
            /* Hide desktop logo on mobile */
            .desktop-logo {
              display: none !important;
            }
            
            /* Show mobile logo */
            .logo-image-mobile {
              display: block !important;
            }
            
            .logo-fallback-mobile {
              display: none !important;
            }
            
            .logo-image-mobile {
              width: 36px !important;
              height: 36px !important;
            }
            
            .logo-fallback-mobile {
              width: 36px !important;
              height: 36px !important;
              font-size: 12px !important;
            }
            
            .mobile-search {
              flex: 1 !important;
              margin: 0 0.75rem !important;
              min-width: 100px !important;
            }
            
            .right-section {
              flex: 0 0 auto !important;
            }
            
            .desktop-nav {
              display: none !important;
            }
            .desktop-search {
              display: none !important;
            }
          }
          
          /* Tablet & Desktop (768px and above) - Show rectangular logo */
          @media (min-width: 768px) {
            /* Hide mobile logo on desktop */
            .logo-image-mobile {
              display: none !important;
            }
            
            .logo-fallback-mobile {
              display: none !important;
            }
            
            /* Show desktop logo */
            .logo-image {
              display: block !important;
            }
            
            .logo-fallback {
              display: none !important;
            }
            
            .desktop-nav {
              display: flex !important;
            }
            .mobile-search {
              display: none !important;
            }
            .mobile-hamburger {
              display: none !important;
            }
            .desktop-search {
              display: block !important;
            }
          }
          
          /* Tablet (768px-1023px) */
          @media (min-width: 768px) and (max-width: 1023px) {
            .logo-section {
              min-width: 140px !important;
            }
            
            .logo-image {
              height: 36px !important;
              max-width: 144px !important;
            }
            
            .logo-fallback {
              height: 36px !important;
              width: 144px !important;
              max-width: 144px !important;
            }
          }
          
          /* Desktop (1024px and above) */
          @media (min-width: 1024px) {
            .logo-section {
              min-width: 160px !important;
            }
            
            .logo-image {
              height: 40px !important;
              max-width: 160px !important;
            }
            
            .logo-fallback {
              height: 40px !important;
              width: 160px !important;
              max-width: 160px !important;
            }
          }
          
          /* Desktop styles */
          @media (min-width: 768px) {
            .desktop-nav {
              display: flex !important;
            }
            .mobile-search {
              display: none !important;
            }
            .mobile-hamburger {
              display: none !important;
            }
            .desktop-search {
              display: block !important;
            }
          }
        `}
      </style>
      
      <header style={styles.header}>
        <div 
          className="header-container"
          style={styles.container}
        >
          {/* Logo Section - Always on left */}
          <div className="logo-section" style={styles.logoSection}>
            {/* Desktop Logo */}
            <img 
              src={carLogo}
              alt="Car Rental Logo" 
              className="logo-image desktop-logo" 
              style={styles.logoImage}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Desktop Logo Fallback */}
            <div 
              className="logo-fallback desktop-logo"
              style={{
                height: '40px',
                width: '160px',
                maxWidth: '160px',
                backgroundColor: '#f3f4f6',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: '#9ca3af',
                borderRadius: '8px',
                fontWeight: '600'
              }}
            >
              LOGO
            </div>
            
            {/* Mobile Logo */}
            <img 
              src={carLogoSmall}
              alt="Car Rental Logo" 
              className="logo-image-mobile mobile-logo" 
              style={styles.logoImageMobile}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Mobile Logo Fallback */}
            <div 
              className="logo-fallback-mobile mobile-logo"
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#f3f4f6',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: '#9ca3af',
                borderRadius: '50%',
                fontWeight: '600'
              }}
            >
              L
            </div>
          </div>

          {/* Desktop Search Bar - Center */}
          <div className="desktop-search" style={styles.desktopSearchBar}>
            <input
              type="text"
              placeholder="Search for cars, brands..."
              style={styles.searchInput}
              onFocus={(e) => e.target.style.borderColor = '#000000'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          {/* Desktop Navigation - Right side of search */}
          <nav className="desktop-nav" style={styles.navigation}>
            <div 
              style={styles.navItem}
              onClick={() => handleDropdownToggle('brands')}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e9ecef'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f8f9fa'}
            >
              Brands
              <BrandsDropdown 
                isOpen={activeDropdown === 'brands'}
                onClose={closeDropdown}
              />
            </div>
            <div 
              style={styles.navItem}
              onClick={() => handleDropdownToggle('price')}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e9ecef'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f8f9fa'}
            >
              Price range
              <PriceRangeDropdown 
                isOpen={activeDropdown === 'price'}
                onClose={closeDropdown}
              />
            </div>
            <div 
              style={styles.navItem}
              onClick={() => handleDropdownToggle('sort')}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e9ecef'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f8f9fa'}
            >
              Sort by
              <SortByDropdown 
                isOpen={activeDropdown === 'sort'}
                onClose={closeDropdown}
              />
            </div>
          </nav>

          {/* Mobile Search Bar Component */}
          <SearchBar 
            isOpen={isMobileSearchOpen}
            onToggle={() => setIsMobileSearchOpen(true)}
            onClose={() => setIsMobileSearchOpen(false)}
          />

          {/* Right Section - Always on right */}
          <div className="right-section" style={styles.rightSection}>
            {/* Desktop Icons */}
            <div className="desktop-nav" style={{ display: 'flex', gap: '0.5rem' }}>
              <div 
                style={styles.iconButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f9fafb'}
              >
                %
              </div>
              <div 
                style={styles.iconButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f9fafb'}
              >
                ðŸ“ž
              </div>
            </div>

            {/* Mobile Hamburger */}
            <div 
              className="mobile-hamburger"
              style={styles.hamburgerButton}
              onClick={() => setIsMobileMenuOpen(true)}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <div style={styles.hamburgerIcon}>
                <div className="hamburger-line" style={styles.hamburgerLine}></div>
                <div className="hamburger-line" style={styles.hamburgerLine}></div>
                <div className="hamburger-line" style={styles.hamburgerLine}></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {(isMobileMenuOpen || isMobileSearchOpen) && (
        <div 
          style={styles.mobileOverlay}
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsMobileSearchOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Header;