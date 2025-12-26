import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiStar, FiCheck, FiTruck, FiShield, FiRotateCcw, FiChevronRight } from 'react-icons/fi';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductCarousel from '@/components/home/ProductCarousel';
import { PageLoader } from '@/components/ui/loading';
import { getProductById, products } from '@/data/products';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToCart } from '@/redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist, selectIsInWishlist } from '@/redux/slices/wishlistSlice';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(getProductById(id || ''));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const isInWishlist = useAppSelector(selectIsInWishlist(id || ''));

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setProduct(getProductById(id || ''));
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <PageLoader message="Loading product..." />
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
            <Link to="/" className="amazon-button">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    toast.success(`Added ${quantity} item(s) to cart`, {
      description: product.title,
    });
  };

  const handleToggleWishlist = () => {
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
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-amazon-star text-amazon-star'
                : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <FiChevronRight className="w-4 h-4" />
            <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">
              {product.category}
            </Link>
            <FiChevronRight className="w-4 h-4" />
            <span className="text-foreground line-clamp-1">{product.title}</span>
          </nav>

          {/* Product Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-card border border-border">
                <img
                  src={product.images[selectedImage] || product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {product.title}
                </h1>
                <Link to={`/brand/${product.brand.toLowerCase()}`} className="text-amazon-link hover:underline">
                  Visit the {product.brand} Store
                </Link>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                {renderStars(product.rating)}
                <span className="text-amazon-link hover:underline cursor-pointer">
                  {product.reviewCount.toLocaleString()} ratings
                </span>
              </div>

              {/* Price */}
              <div className="border-t border-b border-border py-4">
                {product.discount && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="deal-badge">-{product.discount}%</span>
                    <span className="text-sm text-muted-foreground">Limited time deal</span>
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="amazon-price">
                    <span className="amazon-price-symbol">$</span>
                    <span className="text-3xl font-bold">{Math.floor(product.price)}</span>
                    <span className="amazon-price-fraction">
                      {(product.price % 1).toFixed(2).slice(2)}
                    </span>
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-muted-foreground">
                      List Price:{' '}
                      <span className="line-through">${product.originalPrice.toFixed(2)}</span>
                    </span>
                  )}
                </div>
                {product.prime && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-amazon-teal">prime</span>
                    <span className="text-muted-foreground">FREE delivery</span>
                  </div>
                )}
              </div>

              {/* Stock & Delivery */}
              <div className="space-y-3">
                <p className={`text-lg font-medium ${product.inStock ? 'text-amazon-success' : 'text-destructive'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <FiTruck className="w-5 h-5 text-muted-foreground" />
                  <span>FREE delivery <strong>Wednesday, December 27</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiRotateCcw className="w-5 h-5 text-muted-foreground" />
                  <span>Free 30-day returns</span>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              {product.inStock && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium">Qty:</label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="px-3 py-2 border border-border rounded-md bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 amazon-button py-3"
                    >
                      Add to Cart
                    </button>
                    <button className="flex-1 bg-primary hover:bg-amazon-orange-hover text-secondary font-medium rounded-lg py-3 transition-colors">
                      Buy Now
                    </button>
                  </div>

                  <button
                    onClick={handleToggleWishlist}
                    className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg border transition-colors ${
                      isInWishlist
                        ? 'border-destructive text-destructive hover:bg-destructive/10'
                        : 'border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    <FiHeart className={isInWishlist ? 'fill-current' : ''} />
                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              )}

              {/* Secure Transaction */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FiShield className="w-4 h-4" />
                <span>Secure transaction</span>
              </div>

              {/* Features */}
              <div className="border-t border-border pt-6">
                <h3 className="font-bold text-foreground mb-3">About this item</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <FiCheck className="w-4 h-4 text-amazon-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Specifications */}
          <section className="amazon-card p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Product Specifications</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex border-b border-border py-2">
                  <span className="w-1/3 text-muted-foreground">{key}</span>
                  <span className="w-2/3 text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Description */}
          <section className="amazon-card p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Product Description</h2>
            <p className="text-foreground leading-relaxed">{product.description}</p>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <ProductCarousel
              title="Products related to this item"
              products={relatedProducts}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
