import React, { useState, useEffect } from 'react'; // 1. Import useEffect
import Navbar from './Navbar_Components/Navbar';
import Homepage from './Homepage';
import './Homepage.css';

function App() {
  // 2. Add this block of code
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Centralized filter state
  const [filters, setFilters] = useState({
    category: 'ALL',
    brands: [],
    priceRange: { min: 0, max: 0 },
    sortBy: 'Fastest availability'
  });

  const handleCategoryChange = (categoryId) => {
    setFilters(prev => ({
      ...prev,
      category: categoryId
    }));
  };

  const handleBrandToggle = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand) 
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handlePriceChange = (newPriceRange) => {
    setFilters(prev => ({
      ...prev,
      priceRange: newPriceRange
    }));
  };

  const handleSortChange = (newSort) => {
    setFilters(prev => ({
      ...prev,
      sortBy: newSort
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'ALL',
      brands: [],
      priceRange: { min: 0, max: 0 },
      sortBy: 'Fastest availability'
    });
  };

  return (
    <>
      <Navbar 
        filters={filters}
        onCategoryChange={handleCategoryChange}
        onBrandToggle={handleBrandToggle}
        onPriceChange={handlePriceChange}
        onSortChange={handleSortChange}
        onResetFilters={resetFilters}
      />
      <Homepage filters={filters} />
    </>
  );
}

export default App;