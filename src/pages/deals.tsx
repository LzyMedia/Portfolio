import React, { useState } from 'react';
import Head from 'next/head';
import { DealItem } from '../types/finance';

const popularSearches = [
  '🌬️ Cold Air Intake',
  '💨 Exhaust',
  '🔽 Coilovers',
  '⚡ Turbo Kit',
  '⭕ Wheels',
  '🎨 Body Kit',
  '💡 LED Headlights',
  '🔊 Sound System',
];

const DealsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<DealItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setIsLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const response = await fetch(`/api/deals/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.results);
      } else {
        setError(data.error || 'Failed to fetch deals');
      }
    } catch (err) {
      setError('Failed to fetch deals. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSearch = (searchTerm: string) => {
    const cleanTerm = searchTerm.replace(/^[^\w\s]+\s*/, ''); // Remove emoji
    setSearchQuery(cleanTerm);
    handleSearch(cleanTerm);
  };

  return (
    <>
      <Head>
        <title>Best Deals on Car Parts | Price Comparison</title>
        <meta name="description" content="Find the best deals on car parts, mods, and accessories across multiple retailers" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-white mb-2">🔍 Best Deals Finder</h1>
              <p className="text-gray-400 text-lg">
                Compare prices across multiple retailers and find the best deals on car parts
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                    placeholder="Search for car parts, mods, accessories..."
                    className="w-full px-6 py-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-lg"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setResults([]);
                        setHasSearched(false);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button
                  onClick={() => handleSearch(searchQuery)}
                  disabled={isLoading || !searchQuery.trim()}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {isLoading ? '🔄 Searching...' : '🔍 Search'}
                </button>
              </div>

              {/* Popular Searches */}
              <div className="mt-4">
                <div className="text-sm text-gray-400 mb-2">Popular searches:</div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => handleQuickSearch(search)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors text-sm"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-6 py-4 rounded-lg mb-6">
              ⚠️ {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 animate-bounce">🔍</div>
              <h2 className="text-2xl font-semibold text-white mb-2">Searching for best deals...</h2>
              <p className="text-gray-400">Comparing prices across multiple retailers</p>
            </div>
          )}

          {/* Results */}
          {!isLoading && hasSearched && (
            <>
              {results.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">😕</div>
                  <h2 className="text-2xl font-semibold text-white mb-2">No deals found</h2>
                  <p className="text-gray-400 mb-6">
                    Try searching for something else or check out our popular searches
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Found {results.length} deals for &ldquo;{searchQuery}&rdquo;
                    </h2>
                    <p className="text-gray-400">Sorted by best price and availability</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((deal) => (
                      <div
                        key={deal.id}
                        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all hover:shadow-xl"
                      >
                        {/* Stock Status Banner */}
                        {!deal.inStock && (
                          <div className="bg-red-600 text-white text-center py-1 text-sm font-semibold">
                            ⚠️ Out of Stock
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-5">
                          {/* Website Badge */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                              {deal.website}
                            </span>
                            {deal.inStock && (
                              <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                                ✓ In Stock
                              </span>
                            )}
                          </div>

                          {/* Product Name */}
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 min-h-[3.5rem]">
                            {deal.name}
                          </h3>

                          {/* Description */}
                          {deal.description && (
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{deal.description}</p>
                          )}

                          {/* Price */}
                          <div className="mb-4">
                            <div className="text-3xl font-bold text-green-400">
                              ${deal.price.toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              Updated {new Date(deal.lastUpdated).toLocaleTimeString()}
                            </div>
                          </div>

                          {/* Action Button */}
                          <a
                            href={deal.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block text-center px-4 py-3 rounded-lg font-semibold transition-colors ${
                              deal.inStock
                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {deal.inStock ? '🛒 View on ' + deal.website : 'Out of Stock'}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Empty State */}
          {!isLoading && !hasSearched && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🏎️</div>
              <h2 className="text-2xl font-semibold text-white mb-2">Start Your Search</h2>
              <p className="text-gray-400 mb-6">
                Search for car parts, mods, or accessories to compare prices across multiple retailers
              </p>
              <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3">How it works:</h3>
                <ul className="text-left text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">1.</span>
                    <span>Search for the car part or mod you want</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">2.</span>
                    <span>Compare prices from different retailers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">3.</span>
                    <span>Click to visit the retailer and make your purchase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">4.</span>
                    <span>Save money on your car build!</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-700">
            <h3 className="text-lg font-semibold text-white mb-2">💡 Pro Tip</h3>
            <p className="text-gray-300">
              Combine this deals finder with your savings goals in the Finance Tracker to budget and save for your dream mods!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealsPage;
