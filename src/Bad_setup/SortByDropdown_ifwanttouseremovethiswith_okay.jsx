import React, { useState } from 'react';

const SortByDropdown = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const sortOptions = [
    'Fastest availability',
    'Increasing rent',
    'Decreasing rent'
  ];

  const selectOption = (option) => {
    setSelectedOption(option);
  };

  const resetSelection = () => {
    setSelectedOption('');
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
      marginBottom: '24px'
    },
    optionsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginBottom: '24px'
    },
    optionButton: {
      padding: '16px 20px',
      backgroundColor: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '16px',
      fontSize: '15px',
      fontWeight: '500',
      color: '#374151',
      cursor: 'pointer',
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      textAlign: 'left',
      fontFamily: 'inherit'
    },
    optionButtonSelected: {
      backgroundColor: '#000000',
      color: '#ffffff',
      borderColor: '#000000'
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
      <div style={dropdownStyles.title}>Sort by</div>
      <div style={dropdownStyles.subtitle}>Choose your sorting preference</div>
      <div style={dropdownStyles.optionsList}>
        {sortOptions.map((option, index) => {
          const isSelected = selectedOption === option;
          return (
            <button
              key={index}
              style={{
                ...dropdownStyles.optionButton,
                ...(isSelected ? dropdownStyles.optionButtonSelected : {})
              }}
              onClick={() => selectOption(option)}
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
              {option}
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
            console.log('Selected sort:', selectedOption);
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

export default SortByDropdown;