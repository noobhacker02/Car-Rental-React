import React from 'react';
import {
  Grid3X3,
  Zap,
  Car,
  CarFront,
  Package,
  Truck,
  Sun,
  CircleUserRound,
  Tag
} from 'lucide-react';

const Categories = ({ selectedCategory, onCategoryChange, isMobile = false }) => {
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

  if (isMobile) {
    return (
      <div className="mobile-categories">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              className={`mobile-category-btn ${isSelected ? 'mobile-category-btn--active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
              <div className="mobile-category-icon">
                <IconComponent size={20} />
              </div>
              <span className="mobile-category-label">{category.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="navbar-categories">
      {categories.map((category) => {
        const IconComponent = category.icon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <button
            key={category.id}
            className={`category-btn ${isSelected ? 'category-btn--active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
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
  );
};

export default Categories;