import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    className={`bg-muted animate-pulse rounded ${className}`}
  />
);

export const ProductCardSkeleton = () => (
  <div className="amazon-card p-4">
    <Skeleton className="aspect-square mb-3 rounded-lg" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-3 w-1/2 mb-2" />
    <Skeleton className="h-6 w-1/3" />
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const HeroSkeleton = () => (
  <Skeleton className="w-full h-[300px] md:h-[400px] lg:h-[500px]" />
);

export const CategoryGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="amazon-card p-5">
        <Skeleton className="h-6 w-1/2 mb-3" />
        <Skeleton className="aspect-square mb-3 rounded-lg" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    ))}
  </div>
);

interface PageLoaderProps {
  message?: string;
}

export const PageLoader = ({ message = 'Loading...' }: PageLoaderProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center min-h-[400px] gap-4"
  >
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    <p className="text-muted-foreground">{message}</p>
  </motion.div>
);
