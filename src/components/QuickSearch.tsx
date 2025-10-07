'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function QuickSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'coastal', label: 'Coastal' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (searchTerm) params.append('q', searchTerm);
    if (selectedCategory) params.append('category', selectedCategory);
    
    router.push(`/projects?${params.toString()}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What do you need?
            </h2>
            <p className="text-lg text-gray-600">
              Find your perfect property with our advanced search
            </p>
          </div>

          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-large p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search Input */}
              <div className="md:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Properties
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter location, project name, or keywords..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Category Select */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                className="btn btn-primary text-lg px-8 py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
              >
                Search Properties
              </button>
            </div>
          </form>

          {/* Quick Action Buttons */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Buy a Home</h3>
              <p className="text-gray-600 mb-4">
                Find your dream home from our extensive collection of residential properties.
              </p>
              <button
                onClick={() => router.push('/projects?category=residential')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Browse Homes →
              </button>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Commercial Space</h3>
              <p className="text-gray-600 mb-4">
                Discover premium office spaces and commercial properties for your business.
              </p>
              <button
                onClick={() => router.push('/projects?category=commercial')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View Commercial →
              </button>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="text-4xl mb-4">🏖️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Coastal Properties</h3>
              <p className="text-gray-600 mb-4">
                Experience luxury living with our exclusive coastal resort properties.
              </p>
              <button
                onClick={() => router.push('/projects?category=coastal')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Explore Coastal →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
