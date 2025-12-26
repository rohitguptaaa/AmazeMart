import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiChevronDown, FiGrid, FiList, FiStar, FiX } from 'react-icons/fi';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductCard from '@/components/product/ProductCard';
import { searchProducts, products, categories } from '@/data/products';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Avg. Customer Review' },
  { value: 'newest', label: 'Newest Arrivals' },
];

const priceRanges = [
  { min: 0, max: 25, label: 'Under $25' },
  { min: 25, max: 50, label: '$25 to $50' },
  { min: 50, max: 100, label: '$50 to $100' },
  { min: 100, max: 200, label: '$100 to $200' },
  { min: 200, max: Infinity, label: '$200 & Above' },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<typeof priceRanges[0] | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const searchResults = useMemo(() => {
    let results = query ? searchProducts(query) : products;

    // Filter by category
    if (selectedCategory) {
      results = results.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    if (selectedPriceRange) {
      results = results.filter(
        (p) => p.price >= selectedPriceRange.min && p.price < selectedPriceRange.max
      );
    }

    // Filter by rating
    if (selectedRating) {
      results = results.filter((p) => p.rating >= selectedRating);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        results = [...results].reverse();
        break;
    }

    return results;
  }, [query, selectedCategory, selectedPriceRange, selectedRating, sortBy]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedPriceRange(null);
    setSelectedRating(null);
  };

  const hasActiveFilters = selectedCategory || selectedPriceRange || selectedRating;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Search Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {query ? `Results for "${query}"` : 'All Products'}
              </h1>
              <p className="text-muted-foreground">
                {searchResults.length} results
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="hidden md:flex items-center gap-1 border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-muted' : ''}`}
                  aria-label="Grid view"
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-muted' : ''}`}
                  aria-label="List view"
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg"
              >
                <FiFilter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-sm"
                >
                  {categories.find((c) => c.id === selectedCategory)?.name}
                  <FiX className="w-3 h-3" />
                </button>
              )}
              {selectedPriceRange && (
                <button
                  onClick={() => setSelectedPriceRange(null)}
                  className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-sm"
                >
                  {selectedPriceRange.label}
                  <FiX className="w-3 h-3" />
                </button>
              )}
              {selectedRating && (
                <button
                  onClick={() => setSelectedRating(null)}
                  className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-sm"
                >
                  {selectedRating}+ Stars
                  <FiX className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-amazon-link hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <aside
              className={`${
                showFilters ? 'fixed inset-0 z-50 bg-card p-6' : 'hidden'
              } md:block md:relative md:w-64 flex-shrink-0`}
            >
              <div className="flex items-center justify-between mb-6 md:hidden">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-foreground mb-3">Department</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() =>
                          setSelectedCategory(
                            selectedCategory === category.id ? null : category.id
                          )
                        }
                        className={`text-sm hover:text-primary transition-colors ${
                          selectedCategory === category.id
                            ? 'text-primary font-medium'
                            : 'text-foreground'
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-foreground mb-3">Price</h3>
                <ul className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <li key={index}>
                      <button
                        onClick={() =>
                          setSelectedPriceRange(
                            selectedPriceRange === range ? null : range
                          )
                        }
                        className={`text-sm hover:text-primary transition-colors ${
                          selectedPriceRange === range
                            ? 'text-primary font-medium'
                            : 'text-foreground'
                        }`}
                      >
                        {range.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-bold text-foreground mb-3">Customer Review</h3>
                <ul className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <li key={rating}>
                      <button
                        onClick={() =>
                          setSelectedRating(selectedRating === rating ? null : rating)
                        }
                        className={`flex items-center gap-1 text-sm hover:text-primary transition-colors ${
                          selectedRating === rating
                            ? 'text-primary font-medium'
                            : 'text-foreground'
                        }`}
                      >
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FiStar
                              key={star}
                              className={`w-4 h-4 ${
                                star <= rating
                                  ? 'fill-amazon-star text-amazon-star'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <span>& Up</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button (Mobile) */}
              <button
                onClick={() => setShowFilters(false)}
                className="md:hidden w-full amazon-button mt-4"
              >
                Apply Filters
              </button>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground mb-4">
                    No results found for "{query}"
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Try checking your spelling or use more general terms
                  </p>
                  <button onClick={clearFilters} className="amazon-button">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <motion.div
                  layout
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                      : 'space-y-4'
                  }
                >
                  {searchResults.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <ProductCard
                        product={product}
                        variant={viewMode === 'list' ? 'horizontal' : 'default'}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;
