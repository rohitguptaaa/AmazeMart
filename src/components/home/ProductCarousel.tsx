import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Product } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

const ProductCarousel = ({ title, products, viewAllLink }: ProductCarouselProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="py-6">
      <div className="amazon-card p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="text-sm text-amazon-link hover:text-primary hover:underline"
            >
              See all deals
            </a>
          )}
        </div>

        {/* Carousel */}
        <div className="relative group">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              480: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            className="!overflow-visible"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} variant="compact" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-card shadow-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
            aria-label="Previous products"
          >
            <FiChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            ref={nextRef}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-card shadow-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
            aria-label="Next products"
          >
            <FiChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
