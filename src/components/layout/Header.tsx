import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiMapPin, FiChevronDown } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectCartCount, setCartOpen } from '@/redux/slices/cartSlice';
import { selectWishlistCount } from '@/redux/slices/wishlistSlice';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { toggleMobileMenu } from '@/redux/slices/uiSlice';
import { searchProducts, categories } from '@/data/products';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchProducts>>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const cartCount = useAppSelector(selectCartCount);
  const wishlistCount = useAppSelector(selectWishlistCount);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      const results = searchProducts(query);
      setSearchResults(results.slice(0, 8));
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main Header */}
      <div className="amazon-header">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 gap-4">
            {/* Mobile Menu */}
            <button
              className="lg:hidden text-secondary-foreground hover:text-primary p-2"
              onClick={() => dispatch(toggleMobileMenu())}
              aria-label="Open menu"
            >
              <FiMenu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-secondary-foreground">
                Amaze<span className="text-primary">mart</span>
              </span>
            </Link>

            {/* Deliver To */}
            <div className="hidden md:flex items-center text-secondary-foreground hover:outline hover:outline-1 hover:outline-secondary-foreground/50 rounded p-2 cursor-pointer">
              <FiMapPin className="w-5 h-5 mr-1" />
              <div className="text-xs">
                <span className="text-muted-foreground">Deliver to</span>
                <p className="font-bold">United States</p>
              </div>
            </div>

            {/* Search Bar */}
            <div ref={searchRef} className="flex-1 max-w-3xl relative hidden sm:block">
              <form onSubmit={handleSearchSubmit} className="flex">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="h-full py-2.5 px-3 bg-muted text-foreground text-sm rounded-l-md border-r border-border focus:outline-none cursor-pointer"
                  >
                    <option value="All">All</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery.length > 1 && setShowResults(true)}
                  placeholder="Search products, brands, and more..."
                  className="search-input flex-1"
                />
                <button type="submit" className="search-button" aria-label="Search">
                  <FiSearch className="w-5 h-5 text-secondary" />
                </button>
              </form>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-card rounded-md shadow-dropdown overflow-hidden z-50"
                  >
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-muted transition-colors"
                        onClick={() => setShowResults(false)}
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-2">
                            {product.title}
                          </p>
                          <p className="text-sm text-primary font-semibold">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    ))}
                    <Link
                      to={`/search?q=${encodeURIComponent(searchQuery)}`}
                      className="block p-3 text-center text-sm text-amazon-link hover:bg-muted border-t border-border"
                      onClick={() => setShowResults(false)}
                    >
                      See all results for "{searchQuery}"
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Account & Lists */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="hidden lg:flex flex-col text-secondary-foreground hover:outline hover:outline-1 hover:outline-secondary-foreground/50 rounded p-2"
            >
              <span className="text-xs text-muted-foreground">
                Hello, {isAuthenticated ? 'User' : 'sign in'}
              </span>
              <span className="text-sm font-bold flex items-center">
                Account & Lists <FiChevronDown className="ml-1 w-3 h-3" />
              </span>
            </Link>

            {/* Returns & Orders */}
            <Link
              to="/orders"
              className="hidden lg:flex flex-col text-secondary-foreground hover:outline hover:outline-1 hover:outline-secondary-foreground/50 rounded p-2"
            >
              <span className="text-xs text-muted-foreground">Returns</span>
              <span className="text-sm font-bold">& Orders</span>
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative text-secondary-foreground hover:outline hover:outline-1 hover:outline-secondary-foreground/50 rounded p-2"
              aria-label="Wishlist"
            >
              <FiHeart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => dispatch(setCartOpen(true))}
              className="relative flex items-center text-secondary-foreground hover:outline hover:outline-1 hover:outline-secondary-foreground/50 rounded p-2"
              aria-label="Shopping cart"
            >
              <FiShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-primary text-secondary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
              <span className="hidden lg:block ml-1 text-sm font-bold">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Header - Categories */}
      <nav className="bg-amazon-navy-light border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-10 gap-1 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="flex items-center gap-1 nav-link px-3 py-1 whitespace-nowrap"
            >
              <FiMenu className="w-4 h-4" />
              <span>All</span>
            </button>
            {['Today\'s Deals', 'Customer Service', 'Registry', 'Gift Cards', 'Sell'].map(
              (item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/['\s]/g, '-')}`}
                  className="nav-link px-3 py-1 whitespace-nowrap"
                >
                  {item}
                </Link>
              )
            )}
            <span className="deal-badge ml-2">Holiday Deals</span>
          </div>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="sm:hidden bg-secondary p-3">
        <form onSubmit={handleSearchSubmit} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            className="search-input flex-1 rounded-l-md"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <FiSearch className="w-5 h-5 text-secondary" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
