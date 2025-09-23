import React, { useState, useRef, useEffect } from 'react';

const CarCard = ({ car, index = 0 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hoveredColor, setHoveredColor] = useState(null);
  const [colorTooltipPosition, setColorTooltipPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          // Staggered delay based on card position in grid
          const delay = (index % 3) * 150;
          setTimeout(() => {
            setIsVisible(true);
            setHasLoaded(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index, hasLoaded]);

  const getBadgeClass = (label) => {
    const badgeMap = {
      'Electric': 'badge-electric',
      'Hybrid': 'badge-hybrid', 
      'AMG': 'badge-amg',
      'Business Friendly': 'badge-business',
      'Available immediately': 'badge-available',
      'ONE-OF-1': 'badge-special',
      'JCR TITANIUM EXHAUST': 'badge-titanium'
    };
    return `car-badge ${badgeMap[label] || 'badge-default'}`;
  };

  const handleImageChange = (direction) => {
    const maxIndex = car.images.length - 1;
    
    const img = cardRef.current?.querySelector('.car-image');
    if (img) {
      img.classList.add('image-transitioning');
    }
    
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentImageIndex(prev => prev >= maxIndex ? 0 : prev + 1);
      } else {
        setCurrentImageIndex(prev => prev <= 0 ? maxIndex : prev - 1);
      }
      
      setTimeout(() => {
        if (img) {
          img.classList.remove('image-transitioning');
        }
      }, 150);
    }, 200);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && car.images.length > 1) {
      handleImageChange('next');
    }
    if (isRightSwipe && car.images.length > 1) {
      handleImageChange('prev');
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleColorHover = (colorItem, event, colorIndex) => {
    const rect = event.target.getBoundingClientRect();
    setColorTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setHoveredColor({ ...colorItem, index: colorIndex });
  };

  const getCurrentImage = () => {
    return car.images[currentImageIndex] || car.images[0];
  };

  const getColorValue = (colorItem) => {
    return typeof colorItem === 'string' ? colorItem : colorItem.color;
  };

  return (
    <>
      <div 
        ref={cardRef} 
        className={`car-card ${isVisible ? 'car-card--visible' : ''} ${isHovered ? 'car-card--hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ '--stagger-delay': `${(index % 3) * 150}ms` }}
      >
        {/* Image Container */}
        <div 
          className="car-image-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {isVisible && (
            <img
              src={getCurrentImage()}
              alt={`${car.brand} ${car.model}`}
              className="car-image"
              loading="lazy"
            />
          )}
          
          {/* Navigation Arrows - Desktop Only */}
          {car.images.length > 1 && (
            <>
              <button
                className="nav-arrow nav-arrow--left"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageChange('prev');
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="nav-arrow nav-arrow--right"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageChange('next');
                }}
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}
          
          {/* Labels/Badges */}
          <div className="car-labels">
            {car.labels.slice(0, 2).map((label, labelIndex) => (
              <span
                key={labelIndex}
                className={getBadgeClass(label)}
                style={{ '--label-delay': `${labelIndex * 100}ms` }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Image Dots */}
          {car.images.length > 1 && (
            <div className="image-dots">
              {car.images.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  className={`image-dot ${currentImageIndex === dotIndex ? 'image-dot--active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(dotIndex);
                  }}
                  aria-label={`Go to image ${dotIndex + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Car Details */}
        <div className="car-content">
          <div className="car-header">
            <h3 className="car-title">
              {car.brand} - {car.model}
            </h3>
            <div className="color-circles">
              {car.colors.slice(0, 3).map((colorItem, colorIndex) => (
                <div
                  key={colorIndex}
                  className="color-circle"
                  style={{ 
                    background: getColorValue(colorItem),
                    '--color-delay': `${colorIndex * 50}ms`
                  }}
                  onMouseEnter={(e) => handleColorHover(colorItem, e, colorIndex)}
                  onMouseLeave={() => setHoveredColor(null)}
                />
              ))}
            </div>
          </div>
          
          <div className="car-variant">
            {car.variant || '\u00A0'}
          </div>

          <div className="car-power">
            <span className="power-icon">🔧</span>
            {car.power}
          </div>

          <div className="car-pricing">
            <span className="price-label">From </span>
            <span className="price-value">{car.price}</span>
            <span className="price-suffix"> (excl. VAT)/month - </span>
            <button className="all-inclusive-btn">
              All-inclusive
            </button>
          </div>
        </div>
      </div>

      {/* Color Tooltip */}
      {hoveredColor && (
        <div 
          className="color-tooltip"
          style={{
            left: colorTooltipPosition.x,
            top: colorTooltipPosition.y
          }}
        >
          {hoveredColor.name || `Color ${hoveredColor.index + 1}`}
        </div>
      )}
    </>
  );
};

export default CarCard;