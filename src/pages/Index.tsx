import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSlider from '@/components/home/HeroSlider';
import CategoryGrid from '@/components/home/CategoryGrid';
import ProductCarousel from '@/components/home/ProductCarousel';
import CartDrawer from '@/components/cart/CartDrawer';
import { categories, getDeals, getBestSellers, getTrending, products } from '@/data/products';

const Index = () => {
  const deals = getDeals();
  const bestSellers = getBestSellers();
  const trending = getTrending();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />
      
      <main className="flex-1">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Main Content */}
        <div className="container mx-auto px-4 -mt-24 relative z-10">
          {/* Category Cards Grid */}
          <CategoryGrid categories={categories} />

          {/* Deals Carousel */}
          <ProductCarousel
            title="Today's Deals"
            products={deals}
            viewAllLink="/deals"
          />

          {/* Best Sellers */}
          <ProductCarousel
            title="Best Sellers"
            products={bestSellers}
            viewAllLink="/best-sellers"
          />

          {/* Featured Banner */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-6"
          >
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-amazon-navy to-amazon-navy-light p-8 md:p-12">
              <div className="relative z-10 max-w-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-2">
                  Shop with confidence
                </h2>
                <p className="text-secondary-foreground/80 mb-4">
                  Free delivery on millions of items. Easy returns. 24/7 customer service.
                </p>
                <button className="amazon-button">
                  Sign up for Prime
                </button>
              </div>
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <path
                    fill="currentColor"
                    className="text-primary"
                    d="M100 0C155.228 0 200 44.772 200 100C200 155.228 155.228 200 100 200C44.772 200 0 155.228 0 100C0 44.772 44.772 0 100 0Z"
                  />
                </svg>
              </div>
            </div>
          </motion.section>

          {/* Trending Products */}
          <ProductCarousel
            title="Trending Now"
            products={trending}
            viewAllLink="/trending"
          />

          {/* Recently Viewed (Mock) */}
          <ProductCarousel
            title="Inspired by your browsing history"
            products={products.slice(0, 8)}
          />

          {/* More to Explore */}
          <section className="py-6">
            <div className="amazon-card p-6">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                More items to explore
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.slice(0, 10).map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <a href={`/product/${product.id}`} className="block">
                      <div className="aspect-square overflow-hidden rounded-lg bg-muted mb-2">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {product.title}
                      </p>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
