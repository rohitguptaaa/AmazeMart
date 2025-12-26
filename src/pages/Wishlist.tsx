import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiShoppingCart, FiHeart } from 'react-icons/fi';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductCarousel from '@/components/home/ProductCarousel';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectWishlistItems, removeFromWishlist } from '@/redux/slices/wishlistSlice';
import { addToCart } from '@/redux/slices/cartSlice';
import { products } from '@/data/products';
import { toast } from 'sonner';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(selectWishlistItems);

  const handleMoveToCart = (productId: string) => {
    const product = wishlistItems.find((p) => p.id === productId);
    if (product) {
      dispatch(addToCart(product));
      dispatch(removeFromWishlist(productId));
      toast.success('Moved to cart', { description: product.title });
    }
  };

  const handleRemove = (productId: string) => {
    dispatch(removeFromWishlist(productId));
    toast.success('Removed from wishlist');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <CartDrawer />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <FiHeart className="w-16 h-16 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-6">
              Save items you love by clicking the heart icon on any product.
            </p>
            <Link to="/" className="amazon-button inline-block">
              Start Shopping
            </Link>
          </div>

          <div className="mt-12">
            <ProductCarousel
              title="Recommended for you"
              products={products.slice(0, 8)}
            />
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            My Wishlist ({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="amazon-card p-4 group"
            >
              <Link to={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden rounded-lg bg-muted mb-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              <Link to={`/product/${product.id}`}>
                <h3 className="text-sm font-medium text-foreground line-clamp-2 hover:text-primary transition-colors mb-2">
                  {product.title}
                </h3>
              </Link>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-lg font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className={`text-sm mb-3 ${product.inStock ? 'text-amazon-success' : 'text-destructive'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleMoveToCart(product.id)}
                  disabled={!product.inStock}
                  className="flex-1 amazon-button py-2 text-sm flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <FiShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="p-2 border border-border rounded-lg hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="mt-12">
          <ProductCarousel
            title="Based on your wishlist"
            products={products.filter((p) => !wishlistItems.some((w) => w.id === p.id)).slice(0, 8)}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
