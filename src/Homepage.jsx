import React, { useMemo } from 'react';
import CarCard from './CarCard';

const Homepage = ({ filters }) => {
  const cars = [
    {
      id: 1,
      brand: 'Mercedes',
      model: 'G63 AMG',
      variant: 'Vert Olive - Jantes dorées',
      price: '3867€',
      priceValue: 3867,
      power: '585 ch',
      labels: ['AMG'],
      category: 'SUV',
      colors: [
        { color: 'linear-gradient(135deg, #4a5d23 0%, #6b7c3a 50%, #4a5d23 100%)', name: 'Olive Green Metallic' },
        { color: 'linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #b8860b 100%)', name: 'Gold Metallic' }
      ],
      images: [
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1743580626041-857720934.webp',
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1743580626045-111709707.webp',
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1743580626046-359534336.webp',
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1743580626048-543660272.webp'
      ]
    },
    {
      id: 2,
      brand: 'Porsche',
      model: 'Macan 4',
      variant: ' ',
      price: '737€',
      priceValue: 737,
      power: '408 ch',
      labels: ['Electric'],
      category: 'ELECTRIC',
      colors: [
        { color: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)', name: 'Jet Black Metallic' },
        { color: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 50%, #6b7280 100%)', name: 'Silver Metallic' }
      ],
      images: [
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1752762754384-209315312.webp',
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1742312273146-535677244.webp',
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1742312273147-162140347.webp'
      ]
    },
    {
      id: 3,
      brand: 'Mercedes',
      model: 'A 250s',
      variant: 'AMG Edition',
      price: '495€',
      priceValue: 495,
      power: '381 ch',
      labels: ['AMG'],
      category: 'HYBRID',
      colors: [{ color: 'linear-gradient(135deg, #ffffff 0%, #f2f2f2 40%, #d9d9d9 70%, #a5a1a1ff 100%)', name: 'White Metallic'}],
      images: [
        'car2.jpg',
        'car1.jpg',
        'car3.jpg',
        'car4.jpg'
      ]
    },
    {
      id: 4,
      brand: 'Mercedes',
      model: 'GLC',
      variant: '300e SUV',
      price: '395€',
      priceValue: 395,
      power: '313 ch',
      labels: ['Business Friendly', 'Hybrid'],
      category: 'HYBRID',
      colors: [
        { color: 'linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)', name: 'Obsidian Black Metallic' },
        { color: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #2563eb 100%)', name: 'Electric Blue Metallic' },
        { color: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #1e40af 100%)', name: 'Deep Blue Metallic' }
      ],
      images: [
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1751879605682-154427369.webp',
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1741372248820-944543614.webp'
      ]
    },
    {
      id: 5,
      brand: 'Porsche',
      model: '992.2 Carrera Cabriolet',
      variant: ' ',
      price: '2533€',
      priceValue: 2533,
      power: '394 ch',
      labels: [],
      category: 'CONVERTIBLE',
      colors: [
        { color: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)', name: 'Sapphire Blue Metallic' },
        { color: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)', name: 'Arctic White Pearl' }
      ],
      images: [
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1751879168543-139757792.webp',
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1751879168549-660733391.webp',
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1747850162543-828669063.jpg'
      ]
    },
    {
      id: 6,
      brand: 'Porsche',
      model: 'Macan 4',
      variant: '',
      price: '737€',
      priceValue: 737,
      power: '408 ch',
      labels: ['Electric'],
      category: 'ELECTRIC',
      colors: [{ color: 'linear-gradient(135deg, #065f46 0%, #10b981 50%, #047857 100%)', name: 'Racing Green Metallic' }],
      images: [
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1742812431819-400192590.webp',
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1742812431819-621984455.webp'
      ]
    },
    {
      id: 7,
      brand: 'Mercedes',
      model: 'SL 43 AMG',
      variant: 'Night Edition',
      price: '1564€',
      priceValue: 1564,
      power: '435 ch',
      labels: ['AMG'],
      category: 'CONVERTIBLE',
      colors: [
        { color: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)', name: 'Midnight Black Pearl' },
        { color: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #b91c1c 100%)', name: 'Racing Red Metallic' }
      ],
      images: [
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1745333706187-898335945.webp',
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1743668156383-368595341.webp'
      ]
    },
    {
      id: 8,
      brand: 'Bentley',
      model: 'Continental',
      variant: 'GT V8',
      price: '2597€',
      priceValue: 2597,
      power: '550 ch',
      labels: [],
      category: 'SPORTS_COUPE',
      colors: [
        { color: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #1d4ed8 100%)', name: 'Royal Blue Metallic' },
        { color: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #d97706 100%)', name: 'Champagne Gold' }
      ],
      images: [
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1751879967778-821274459.webp',
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1744627550752-512179824.webp'
      ]
    },
    {
      id: 9,
      brand: 'Porsche',
      model: '718',
      variant: 'GT4 RS',
      price: '3181€',
      priceValue: 3181,
      power: '500 ch',
      labels: ['Available immediately'],
      category: 'SPORTS_COUPE',
      colors: [
        { color: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #b91c1c 100%)', name: 'Guards Red' },
        { color: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)', name: 'Black Metallic' }
      ],
      images: [
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1745339715502-304778518.webp',
        'https://d2b4e4oq2uoejo.cloudfront.net/assets/generalimages/1751880006293-230483509.webp'
      ]
    }
  ];

  // Filtered and sorted cars using useMemo for performance
  const filteredAndSortedCars = useMemo(() => {
    if (!filters) {
      return cars; // Return all cars if no filters provided
    }

    let filtered = cars;

    // Filter by category
    if (filters.category && filters.category !== 'ALL') {
      filtered = filtered.filter(car => car.category === filters.category);
    }

    // Filter by brands
    if (filters.brands && filters.brands.length > 0) {
      filtered = filtered.filter(car => filters.brands.includes(car.brand));
    }

    // Filter by price range
    if (filters.priceRange && (filters.priceRange.min > 0 || filters.priceRange.max > 0)) {
      filtered = filtered.filter(car => {
        const price = car.priceValue;
        const minPrice = filters.priceRange.min || 0;
        const maxPrice = filters.priceRange.max || Infinity;
        
        return price >= minPrice && (maxPrice === 0 ? true : price <= maxPrice);
      });
    }

    // Sort the filtered results
    if (filters.sortBy) {
      const sortedCars = [...filtered];
      
      switch (filters.sortBy) {
        case 'Increasing rent':
          sortedCars.sort((a, b) => a.priceValue - b.priceValue);
          break;
        case 'Decreasing rent':
          sortedCars.sort((a, b) => b.priceValue - a.priceValue);
          break;
        case 'Fastest availability':
        default:
          // Sort by availability - cars with "Available immediately" label first
          sortedCars.sort((a, b) => {
            const aAvailable = a.labels.includes('Available immediately');
            const bAvailable = b.labels.includes('Available immediately');
            if (aAvailable && !bAvailable) return -1;
            if (!aAvailable && bAvailable) return 1;
            return 0; // Keep original order for same availability
          });
          break;
      }
      
      return sortedCars;
    }

    return filtered;
  }, [filters]);

  // Display message when no cars match filters
  const getFilteredMessage = () => {
    if (!filters) return null;

    const activeFilters = [];
    
    if (filters.category !== 'ALL') {
      activeFilters.push(`Category: ${filters.category}`);
    }
    if (filters.brands.length > 0) {
      activeFilters.push(`Brands: ${filters.brands.join(', ')}`);
    }
    if (filters.priceRange.min > 0 || filters.priceRange.max > 0) {
      const min = filters.priceRange.min || 0;
      const max = filters.priceRange.max || '∞';
      activeFilters.push(`Price: ${min}€ - ${max}€`);
    }
    if (filters.sortBy !== 'Fastest availability') {
      activeFilters.push(`Sorted by: ${filters.sortBy}`);
    }

    if (activeFilters.length === 0) {
      return null;
    }

    return (
      <div className="filter-summary">
        <p className="filter-summary-text">
          {filteredAndSortedCars.length === 0 
            ? `No cars found matching: ${activeFilters.join(' • ')}`
            : `Showing ${filteredAndSortedCars.length} car${filteredAndSortedCars.length !== 1 ? 's' : ''} • ${activeFilters.join(' • ')}`
          }
        </p>
      </div>
    );
  };

  return (
    <>
      {/* Add filter summary styles */}
      <style jsx>{`
        .filter-summary {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 0.75rem 1rem 0.75rem;
        }
        
        .filter-summary-text {
          font-size: 0.875rem;
          color: #6b7280;
          text-align: center;
          margin: 0;
          padding: 0.75rem 1rem;
          background-color: #f9fafb;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .no-results {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 1rem;
          text-align: center;
        }

        .no-results-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .no-results-text {
          font-size: 1rem;
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .no-results-suggestions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }

        .no-results-suggestion {
          font-size: 0.875rem;
          color: #9ca3af;
        }

        @media (min-width: 768px) {
          .filter-summary {
            padding: 0 1rem 1.5rem 1rem;
          }
        }

        @media (min-width: 1024px) {
          .filter-summary {
            padding: 0 1rem 2rem 1rem;
          }
        }
      `}</style>

      <div className="homepage-container">
        {getFilteredMessage()}
        
        <div className="main-content">
          {filteredAndSortedCars.length === 0 ? (
            <div className="no-results">
              <h2 className="no-results-title">No cars found</h2>
              <p className="no-results-text">
                Try adjusting your filters to see more results
              </p>
              <div className="no-results-suggestions">
                <div className="no-results-suggestion">• Try selecting "ALL" categories</div>
                <div className="no-results-suggestion">• Remove brand filters</div>
                <div className="no-results-suggestion">• Adjust price range</div>
                <div className="no-results-suggestion">• Reset all filters</div>
              </div>
            </div>
          ) : (
            <div className="car-grid">
              {filteredAndSortedCars.map((car, index) => (
                <div key={car.id} data-card>
                  <CarCard car={car} index={index} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Homepage;