import React from 'react';
import { Button } from '@/components/ui/button';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange, isVisible = true }) => {
  const styles = {
    filterBar: {
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      padding: '1rem',
      position: 'sticky',
      top: '64px',
      zIndex: 9,
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif'
    },
    filterContainer: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    filterGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.75rem',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    filterButton: {
      padding: '0.75rem 1.25rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#495057',
      backgroundColor: '#f8f9fa',
      border: '1px solid #e9ecef',
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
      letterSpacing: '-0.008em',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      whiteSpace: 'nowrap',
      flexShrink: 0
    },
    filterButtonSelected: {
      color: '#ffffff',
      backgroundColor: '#000000',
      borderColor: '#000000'
    }
  };

  return (
    <>
      <style>
        {`
          /* Hide category filter on mobile */
          @media (max-width: 767px) {
            .category-filter-bar {
              display: none !important;
            }
          }
          
          /* Show on tablet and desktop */
          @media (min-width: 768px) {
            .category-filter-bar {
              display: block !important;
            }
          }
          
          /* Tablet adjustments */
          @media (min-width: 768px) and (max-width: 1023px) {
            .filter-button {
              padding: 0.6rem 1rem !important;
              font-size: 0.8rem !important;
              gap: 0.4rem !important;
            }
            
            .filter-grid {
              gap: 0.5rem !important;
            }
          }
          
          /* Mobile landscape and small tablets */
          @media (min-width: 768px) and (max-width: 991px) {
            .filter-container {
              padding: 0 1rem !important;
            }
          }
        `}
      </style>
      
      <div className="filter-bar category-filter-bar" style={styles.filterBar}>
        <div className="filter-container" style={styles.filterContainer}>
          <div className="filter-grid" style={styles.filterGrid}>
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  className="filter-button"
                  style={{
                    ...styles.filterButton,
                    ...(isSelected ? styles.filterButtonSelected : {})
                  }}
                  onClick={() => onCategoryChange(category.id)}
                  onMouseEnter={(e) => {
                    if (!isSelected && window.innerWidth > 768) {
                      e.target.style.backgroundColor = '#e9ecef';
                      e.target.style.borderColor = '#dee2e6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected && window.innerWidth > 768) {
                      e.target.style.backgroundColor = '#f8f9fa';
                      e.target.style.borderColor = '#e9ecef';
                    }
                  }}
                >
                  <span>{category.icon}</span>
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;