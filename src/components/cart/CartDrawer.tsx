import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
  setCartOpen,
} from '@/redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const isOpen = useAppSelector((state) => state.cart.isOpen);

  const handleClose = () => {
    dispatch(setCartOpen(false));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-foreground/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Shopping Cart</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Close cart"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <button
                    onClick={handleClose}
                    className="amazon-button"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-3 bg-muted/50 rounded-lg"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-primary font-bold mt-1">
                          ${item.product.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
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
                            className="p-1 bg-card rounded hover:bg-muted disabled:opacity-50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  productId: item.product.id,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                            className="p-1 bg-card rounded hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              dispatch(removeFromCart(item.product.id))
                            }
                            className="p-1 ml-auto text-destructive hover:bg-destructive/10 rounded transition-colors"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-foreground">
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                    items):
                  </span>
                  <span className="text-xl font-bold text-foreground">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="space-y-2">
                  <Link
                    to="/cart"
                    onClick={handleClose}
                    className="block w-full amazon-button-secondary text-center"
                  >
                    View Cart
                  </Link>
                  <button className="w-full amazon-button">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
