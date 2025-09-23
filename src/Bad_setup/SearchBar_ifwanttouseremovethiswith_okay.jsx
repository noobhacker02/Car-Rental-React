import React, { useState, useEffect } from 'react';

const SearchBar = ({ isOpen, onToggle, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    onClose();
  };

  const styles = {
    // Mobile search button (pill-shaped when not open)
    searchButton: {
      flex: 1,
      minWidth: '120px',
      maxWidth: '300px',
      height: '40px',
      borderRadius: '25px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      fontSize: '14px',
      color: '#6b7280',
      padding: '0 1rem',
      fontWeight: '500',
      margin: '0 1rem'
    },
    // Mobile search overlay
    searchOverlay: {
      position: 'fixed',
      top: '65px',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#ffffff',
      zIndex: 45,
      transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden'
    },
    searchContainer: {
      padding: '1.5rem 1rem',
      maxWidth: '600px',
      margin: '0 auto'
    },
    searchForm: {
      position: 'relative',
      marginBottom: '1rem'
    },
    searchInput: {
      width: '100%',
      padding: '16px 20px 16px 50px',
      fontSize: '16px',
      border: '2px solid #e5e7eb',
      borderRadius: '25px',
      outline: 'none',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif',
      transition: 'border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#ffffff'
    },
    searchIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '18px',
      color: '#6b7280'
    },
    closeButton: {
      position: 'absolute',
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#f3f4f6',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#6b7280',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    suggestions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    suggestionItem: {
      padding: '12px 16px',
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#374151',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid #e5e7eb'
    }
  };

  return (
    <>
      {/* Mobile search button - pill shaped */}
      <div 
        className="mobile-search"
        style={styles.searchButton}
        onClick={onToggle}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e9ecef';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#f8f9fa';
        }}
      >
        🔍 Search
      </div>

      {/* Mobile search overlay */}
      <div style={styles.searchOverlay}>
        <div style={styles.searchContainer}>
          <div style={styles.searchForm}>
            <div style={styles.searchIcon}>🔍</div>
            <input
              type="text"
              placeholder="Search for cars, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                ...styles.searchInput,
                borderColor: searchQuery ? '#000000' : '#e5e7eb'
              }}
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              type="button"
              style={styles.closeButton}
              onClick={onClose}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e5e7eb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            >
              ✕
            </button>
          </div>

          {/* Search suggestions */}
          {searchQuery && (
            <div style={styles.suggestions}>
              <div 
                style={styles.suggestionItem}
                onClick={() => {
                  setSearchQuery('Mercedes G63 AMG');
                  console.log('Selected: Mercedes G63 AMG');
                  onClose();
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.borderColor = '#e5e7eb';
                }}
              >
                Mercedes G63 AMG
              </div>
              <div 
                style={styles.suggestionItem}
                onClick={() => {
                  setSearchQuery('Porsche Macan');
                  console.log('Selected: Porsche Macan');
                  onClose();
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.borderColor = '#e5e7eb';
                }}
              >
                Porsche Macan
              </div>
              <div 
                style={styles.suggestionItem}
                onClick={() => {
                  setSearchQuery('Electric vehicles');
                  console.log('Selected: Electric vehicles');
                  onClose();
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.borderColor = '#e5e7eb';
                }}
              >
                Electric vehicles
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;