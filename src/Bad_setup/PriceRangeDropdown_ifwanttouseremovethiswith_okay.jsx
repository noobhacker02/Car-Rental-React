import React, { useState } from 'react';

const PriceRangeDropdown = ({ isOpen, onClose }) => {
  const [minValue, setMinValue] = useState('0');
  const [maxValue, setMaxValue] = useState('0');

  const resetValues = () => {
    setMinValue('0');
    setMaxValue('0');
  };

  const dropdownStyles = {
    dropdown: {
      position: 'absolute',
      top: 'calc(100% + 5px)',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      padding: '32px',
      minWidth: '420px',
      zIndex: 1000,
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid #e5e7eb'
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#000000',
      marginBottom: '6px'
    },
    subtitle: {
      fontSize: '15px',
      color: '#6b7280',
      marginBottom: '28px'
    },
    sliderContainer: {
      marginBottom: '28px'
    },
    slider: {
      width: '100%',
      height: '4px',
      backgroundColor: '#e5e7eb',
      borderRadius: '2px',
      position: 'relative',
      marginBottom: '24px'
    },
    sliderTrack: {
      height: '4px',
      backgroundColor: '#000000',
      borderRadius: '2px',
      position: 'absolute',
      left: '0%',
      width: '50%'
    },
    sliderHandle: {
      width: '20px',
      height: '20px',
      backgroundColor: '#000000',
      borderRadius: '50%',
      position: 'absolute',
      top: '-8px',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    inputRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '24px'
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    inputLabel: {
      fontSize: '15px',
      color: '#6b7280',
      fontWeight: '500'
    },
    input: {
      padding: '16px 20px',
      border: '1px solid #e5e7eb',
      borderRadius: '16px',
      fontSize: '16px',
      outline: 'none',
      fontFamily: 'inherit'
    },
    currencyLabel: {
      fontSize: '15px',
      color: '#6b7280',
      textAlign: 'right'
    },
    buttonRow: {
      display: 'flex',
      gap: '16px'
    },
    resetButton: {
      flex: 1,
      padding: '16px 20px',
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '16px',
      fontSize: '15px',
      fontWeight: '500',
      color: '#374151',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      fontFamily: 'inherit'
    },
    showButton: {
      flex: 1,
      padding: '16px 20px',
      backgroundColor: '#000000',
      border: 'none',
      borderRadius: '16px',
      fontSize: '15px',
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
      <div style={dropdownStyles.title}>Price range</div>
      <div style={dropdownStyles.subtitle}>Per month HTVA</div>
      
      <div style={dropdownStyles.sliderContainer}>
        <div style={dropdownStyles.slider}>
          <div style={dropdownStyles.sliderTrack}></div>
          <div style={{...dropdownStyles.sliderHandle, left: '0%'}}></div>
          <div style={{...dropdownStyles.sliderHandle, left: '50%'}}></div>
        </div>
      </div>

      <div style={dropdownStyles.inputRow}>
        <div style={dropdownStyles.inputContainer}>
          <div style={dropdownStyles.inputLabel}>Minimum :</div>
          <input 
            type="text" 
            placeholder="0"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            style={dropdownStyles.input}
          />
          <span style={dropdownStyles.currencyLabel}>€</span>
        </div>
        <div style={dropdownStyles.inputContainer}>
          <div style={dropdownStyles.inputLabel}>Maximum :</div>
          <input 
            type="text" 
            placeholder="0"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            style={dropdownStyles.input}
          />
          <span style={dropdownStyles.currencyLabel}>€</span>
        </div>
      </div>

      <div style={dropdownStyles.buttonRow}>
        <button 
          style={dropdownStyles.resetButton}
          onClick={resetValues}
          onMouseEnter={(e) => window.innerWidth > 768 && (e.target.style.backgroundColor = '#f9fafb')}
          onMouseLeave={(e) => window.innerWidth > 768 && (e.target.style.backgroundColor = '#ffffff')}
        >
          Reset
        </button>
        <button 
          style={dropdownStyles.showButton}
          onClick={() => {
            console.log('Price range:', { min: minValue, max: maxValue });
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

export default PriceRangeDropdown;