import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShield, FiTruck } from 'react-icons/fi';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductCarousel from '@/components/home/ProductCarousel';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
} from '@/redux/slices/cartSlice';
import { products } from '@/data/products';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const savings = cartItems.reduce((acc, item) => {
    if (item.product.originalPrice && item.product.originalPrice > item.product.price) {
      return acc + (item.product.originalPrice - item.product.price) * item.quantity;
    }
    return acc;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <CartDrawer />
        
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/" className="amazon-button inline-flex items-center gap-2">
              Continue Shopping
              <FiArrowRight />
            </Link>
          </div>

          <div className="mt-12">
            <ProductCarousel
              title="Products you might like"
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
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="amazon-card p-4"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className="text-foreground font-medium line-clamp-2 hover:text-primary transition-colors">
                        {item.product.title}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-amazon-success mt-1">In Stock</p>
                    
                    {item.product.prime && (
                      <div className="flex items-center gap-1 text-xs mt-1">
                        <span className="font-bold text-amazon-teal">prime</span>
                        <span className="text-muted-foreground">FREE Delivery</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-bold text-foreground">
                        ${item.product.price.toFixed(2)}
                      </span>
                      {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 border border-border rounded-lg">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                productId: item.product.id,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-muted disabled:opacity-50 rounded-l-lg transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                productId: item.product.id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          className="p-2 hover:bg-muted rounded-r-lg transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="text-border">|</span>

                      {/* Remove */}
                      <button
                        onClick={() => dispatch(removeFromCart(item.product.id))}
                        className="text-amazon-link hover:text-destructive text-sm flex items-center gap-1 transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Delete
                      </button>

                      <span className="text-border">|</span>

                      {/* Save for later */}
                      <button className="text-amazon-link hover:underline text-sm transition-colors">
                        Save for later
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Subtotal (Mobile) */}
            <div className="lg:hidden amazon-card p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg">
                  Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}):
                </span>
                <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <button className="w-full amazon-button py-3">
                Proceed to Checkout
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="amazon-card p-6 sticky top-24">
              {/* Free Shipping Notice */}
              <div className="flex items-center gap-2 p-3 bg-amazon-success/10 rounded-lg mb-4">
                <FiTruck className="w-5 h-5 text-amazon-success" />
                <span className="text-sm text-amazon-success font-medium">
                  Your order qualifies for FREE Shipping
                </span>
              </div>

              {/* Subtotal */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-amazon-success">FREE</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm text-amazon-success">
                    <span>Your Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4 mb-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-bold">Order Total:</span>
                  <span className="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full amazon-button py-3 mb-4">
                Proceed to Checkout
              </button>

              {/* Security */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <FiShield className="w-4 h-4" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-12">
          <ProductCarousel
            title="Customers who bought these items also bought"
            products={products.slice(4, 12)}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
