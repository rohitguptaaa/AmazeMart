import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiStar, FiShoppingCart, FiCheck } from 'react-icons/fi';
import { Product } from '@/data/products';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToCart } from '@/redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist, selectIsInWishlist } from '@/redux/slices/wishlistSlice';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'horizontal';
}

const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const isInWishlist = useAppSelector(selectIsInWishlist(product.id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success('Added to cart', {
      description: product.title,
      action: {
        label: 'View Cart',
        onClick: () => {},
      },
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= rating
                ? 'fill-amazon-star text-amazon-star'
                : 'text-muted-foreground'
            }`}
          />
        ))}
        <span className="text-xs text-amazon-link ml-1">
          ({product.reviewCount.toLocaleString()})
        </span>
      </div>
    );
  };

  if (variant === 'compact') {
    return (
      <Link to={`/product/${product.id}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="product-card group"
        >
          <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {product.discount && (
              <span className="deal-badge absolute top-2 left-2">
                -{product.discount}%
              </span>
            )}
          </div>
          <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
            {product.title}
          </h3>
          <p className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </p>
        </motion.div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/product/${product.id}`}>
        <motion.div
          whileHover={{ y: -2 }}
          className="product-card flex gap-4 group"
        >
          <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
              {product.title}
            </h3>
            {renderStars(product.rating)}
            <div className="mt-2">
              <span className="text-lg font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.prime && (
              <div className="flex items-center gap-1 mt-1 text-xs text-amazon-teal">
                <FiCheck className="w-3 h-3" />
                <span>Prime</span>
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="product-card group relative"
      >
        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-all duration-200 ${
            isInWishlist
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-card/80 text-foreground hover:bg-card'
          }`}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <FiHeart
            className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`}
          />
        </button>

        {/* Image */}
        <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.discount && (
            <span className="deal-badge absolute top-2 left-2">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {renderStars(product.rating)}

          <div className="flex items-baseline gap-2">
            <span className="amazon-price">
              <span className="amazon-price-symbol">$</span>
              <span className="amazon-price-whole">
                {Math.floor(product.price)}
              </span>
              <span className="amazon-price-fraction">
                {(product.price % 1).toFixed(2).slice(2)}
              </span>
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.prime && (
            <div className="flex items-center gap-1 text-xs">
              <span className="font-bold text-amazon-teal">prime</span>
              <span className="text-muted-foreground">FREE Delivery</span>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full amazon-button flex items-center justify-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
