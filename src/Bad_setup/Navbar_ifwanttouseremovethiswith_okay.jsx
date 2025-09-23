import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  Menu, 
  Phone, 
  Languages,
  Zap,
  Car,
  Truck,
  Sun,
  Home,
  Users,
  Palette,
  Briefcase
} from 'lucide-react';

const Navbar = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = [
    { id: 'ALL', label: 'ALL', icon: Palette },
    { id: 'ELECTRIC', label: 'ELECTRIC', icon: Zap },
    { id: 'SUV', label: 'SUV', icon: Truck },
    { id: 'SPORTS_COUPE', label: 'SPORTS COUPE', icon: Car },
    { id: 'AVAILABLE', label: 'AVAILABLE', icon: Home },
    { id: 'SEDAN', label: 'SEDAN', icon: Car },
    { id: 'CONVERTIBLE', label: 'CONVERTIBLE', icon: Sun },
    { id: 'WAGON', label: 'WAGON', icon: Truck },
    { id: 'HYBRID', label: 'HYBRID', icon: Zap },
    { id: 'ONE_OF_1', label: 'ONE OF 1', icon: Users },
    { id: 'CATEGORY_1', label: 'CATEGORIE 1', icon: Briefcase },
    { id: 'CATEGORY_2', label: 'CATEGORIE 2', icon: Briefcase },
    { id: 'CATEGORY_3', label: 'CATEGORIE 3', icon: Briefcase },
    { id: 'CATEGORY_4', label: 'CATEGORIE 4', icon: Briefcase }
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200">
      {/* Main Header Bar */}
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo - Hidden on tablet and mobile */}
          <div className="hidden lg:block">
            <h1 className="text-2xl font-bold text-gray-900">Ecowave</h1>
          </div>

          {/* Central Search/Filter Bar */}
          <div className="flex-1 lg:flex-none lg:mx-8">
            {/* Desktop Version */}
            <div className="hidden lg:flex items-center bg-gray-50 rounded-full px-6 py-3 shadow-sm border border-gray-200 min-w-[500px]">
              <div className="flex items-center space-x-8 w-full">
                <div className="text-gray-700 font-medium">Brands</div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="text-gray-700 font-medium">Price range</div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-2 text-gray-700 font-medium cursor-pointer hover:text-gray-900 transition-colors">
                  <span>Sort by</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Tablet and Mobile Version */}
            <div className="lg:hidden flex items-center bg-gray-50 rounded-full px-4 py-3 shadow-sm border border-gray-200">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <div className="flex items-center space-x-4 flex-1">
                <span className="text-gray-700 font-medium">Brands</span>
                <span className="text-gray-700 font-medium">Price range</span>
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Login
              </button>
              <button className="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Languages className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Phone className="h-5 w-5" />
              </button>
            </div>

            {/* Tablet and Mobile Actions */}
            <div className="lg:hidden">
              <button className="p-2 text-gray-700 hover:text-gray-900 transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="border-t border-gray-100">
        <div className="px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Desktop and Tablet - Show all categories with scroll */}
            <div className="hidden md:block">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-8 py-4 min-w-max">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`flex flex-col items-center space-y-2 px-2 py-2 transition-all duration-200 hover:scale-105 hover:text-gray-900 ${
                          activeCategory === category.id
                            ? 'text-gray-900'
                            : 'text-gray-500'
                        }`}
                      >
                        <IconComponent className="h-6 w-6" />
                        <span className="text-sm font-medium whitespace-nowrap">
                          {category.label}
                        </span>
                        {activeCategory === category.id && (
                          <div className="w-full h-0.5 bg-black rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile - Show ~4 categories initially with hidden scrollbar */}
            <div className="md:hidden">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-6 py-4 min-w-max">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`flex flex-col items-center space-y-2 px-2 py-2 transition-all duration-200 hover:scale-105 hover:text-gray-900 min-w-[70px] ${
                          activeCategory === category.id
                            ? 'text-gray-900'
                            : 'text-gray-500'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="text-xs font-medium text-center leading-tight">
                          {category.label}
                        </span>
                        {activeCategory === category.id && (
                          <div className="w-full h-0.5 bg-black rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbars */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Navbar;