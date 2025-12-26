import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Category } from '@/data/products';

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  return (
    <section className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.slice(0, 8).map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/category/${category.id}`}>
              <div className="category-card group">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {category.name}
                </h3>
                <div className="aspect-square overflow-hidden rounded-lg mb-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="text-sm text-amazon-link group-hover:text-primary group-hover:underline">
                  Shop now
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
