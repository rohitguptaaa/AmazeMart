import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  image: string;
  gradient: string;
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Holiday Tech Deals',
    subtitle: 'Save up to 50% on electronics, gadgets, and more',
    cta: 'Shop Now',
    link: '/deals',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1920&h=600&fit=crop',
    gradient: 'from-secondary/90 to-transparent',
  },
  {
    id: '2',
    title: 'New Arrivals',
    subtitle: 'Discover the latest in fashion and accessories',
    cta: 'Explore',
    link: '/new-arrivals',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=600&fit=crop',
    gradient: 'from-primary/80 to-transparent',
  },
  {
    id: '3',
    title: 'Home Essentials',
    subtitle: 'Everything you need to make your house a home',
    cta: 'Shop Home',
    link: '/category/home',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=600&fit=crop',
    gradient: 'from-amazon-teal/80 to-transparent',
  },
];

const HeroSlider = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="w-full h-[300px] md:h-[400px] lg:h-[500px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}
              />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-lg"
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-3">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl text-secondary-foreground/80 mb-6">
                      {slide.subtitle}
                    </p>
                    <Link
                      to={slide.link}
                      className="inline-flex items-center gap-2 amazon-button text-lg px-8 py-3"
                    >
                      {slide.cta}
                      <FiArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-card/80 hover:bg-card rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-6 h-6 text-foreground" />
      </button>
      <button
        ref={nextRef}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-card/80 hover:bg-card rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next slide"
      >
        <FiChevronRight className="w-6 h-6 text-foreground" />
      </button>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSlider;
