import React, { forwardRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SortByDropdown = forwardRef(({ 
  isActive, 
  onToggle, 
  sortBy, 
  onSortChange, 
  onReset, 
  onClose 
}, ref) => {
  const sortOptions = ['Fastest availability', 'Increasing rent', 'Decreasing rent'];

  return (
    <div className="search-item" ref={ref}>
      <div 
        className={`search-label ${isActive ? 'active' : ''}`}
        onClick={onToggle}
      >
        Sort by
        {isActive ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      
      {isActive && (
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
                onClick={() => onSortChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
          
          <div className="dropdown-actions">
            <button className="reset-button" onClick={onReset}>
              Reset
            </button>
            <button 
              className="show-results-button"
              onClick={onClose}
            >
              Show results
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

SortByDropdown.displayName = 'SortByDropdown';

export default SortByDropdown;