import React, { useState } from 'react';

const BrandsDropdown = ({ isOpen, onClose }) => {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const brands = [
    'Bentley', 'Coming', 'Ferrari', 'Lamborghini',
    'Land Rover', 'Mercedes', 'Porsche'
  ];

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const resetSelection = () => {
    setSelectedBrands([]);
  };

  const dropdownStyles = {
    dropdown: {
      position: 'absolute',
      top: 'calc(100% + 5px)',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      minWidth: '320px',
      zIndex: 1000,
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid #e5e7eb'
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#000000',
      marginBottom: '4px'
    },
    subtitle: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '20px'
    },
    brandGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      marginBottom: '20px'
    },
    brandButton: {
      padding: '12px 16px',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      textAlign: 'left',
      fontFamily: 'inherit'
    },
    brandButtonSelected: {
      backgroundColor: '#000000',
      color: '#ffffff',
      borderColor: '#000000'
    },
    buttonRow: {
      display: 'flex',
      gap: '12px',
      marginTop: '16px'
    },
    resetButton: {
      flex: 1,
      padding: '12px 16px',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      fontFamily: 'inherit'
    },
    showButton: {
      flex: 1,
      padding: '12px 16px',
      backgroundColor: '#000000',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      fontFamily: 'inherit'
    }
  };

  if (!isOpen) return null;

  return (
    <div style={dropdownStyles.dropdown}>
      <div style={dropdownStyles.title}>Brands</div>
      <div style={dropdownStyles.subtitle}>Which brand?</div>
      <div style={dropdownStyles.brandGrid}>
        {brands.map((brand, index) => {
          const isSelected = selectedBrands.includes(brand);
          return (
            <button
              key={index}
              style={{
                ...dropdownStyles.brandButton,
                ...(isSelected ? dropdownStyles.brandButtonSelected : {})
              }}
              onClick={() => toggleBrand(brand)}
              onMouseEnter={(e) => {
                if (!isSelected && window.innerWidth > 768) {
                  e.target.style.backgroundColor = '#f3f4f6';
                  e.target.style.borderColor = '#d1d5db';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected && window.innerWidth > 768) {
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.borderColor = '#e5e7eb';
                }
              }}
            >
              {brand}
            </button>
          );
        })}
      </div>
      <div style={dropdownStyles.buttonRow}>
        <button 
          style={dropdownStyles.resetButton}
          onClick={resetSelection}
          onMouseEnter={(e) => window.innerWidth > 768 && (e.target.style.backgroundColor = '#f9fafb')}
          onMouseLeave={(e) => window.innerWidth > 768 && (e.target.style.backgroundColor = '#ffffff')}
        >
          Reset
        </button>
        <button 
          style={dropdownStyles.showButton}
          onClick={() => {
            console.log('Selected brands:', selectedBrands);
            onClose();
          }}
          onMouseEnter={(e) => window.innerWidth > 768 && (e.target.style.backgroundColor = '#1a1a1a')}
          onMouseLeave={(e) => window.innerWidth > 768 && (e.target.style.backgroundColor = '#000000')}
        >
          Show results
        </button>
      </div>
    </div>
  );
};

export default BrandsDropdown;