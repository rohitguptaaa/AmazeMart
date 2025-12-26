export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  inStock: boolean;
  prime: boolean;
  features: string[];
  specifications: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subcategories?: string[];
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop",
    subcategories: ["Smartphones", "Laptops", "Tablets", "Headphones", "Cameras"],
  },
  {
    id: "fashion",
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop",
    subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories"],
  },
  {
    id: "home",
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
    subcategories: ["Furniture", "Kitchen Appliances", "Bedding", "Decor"],
  },
  {
    id: "books",
    name: "Books",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=300&fit=crop",
    subcategories: ["Fiction", "Non-Fiction", "Educational", "Comics"],
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1461896836934- voices-f0f6758a3e?w=300&h=300&fit=crop",
    subcategories: ["Fitness", "Outdoor Gear", "Team Sports", "Water Sports"],
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop",
    subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances"],
  },
  {
    id: "toys",
    name: "Toys & Games",
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=300&fit=crop",
    subcategories: ["Action Figures", "Board Games", "Educational", "Outdoor Play"],
  },
  {
    id: "automotive",
    name: "Automotive",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=300&h=300&fit=crop",
    subcategories: ["Car Electronics", "Tools", "Accessories", "Parts"],
  },
];

export const products: Product[] = [
  {
    id: "1",
    title: "Apple iPhone 15 Pro Max - 256GB - Natural Titanium",
    description: "iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    price: 1199.00,
    originalPrice: 1299.00,
    discount: 8,
    rating: 4.8,
    reviewCount: 12453,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1695048132832-b41495278e24?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1695048132846-6d40c2c2b6da?w=800&h=800&fit=crop",
    ],
    category: "electronics",
    brand: "Apple",
    inStock: true,
    prime: true,
    features: [
      "6.7-inch Super Retina XDR display with ProMotion",
      "A17 Pro chip for unprecedented performance",
      "Pro camera system with 48MP Main camera",
      "Titanium design with textured matte glass back",
      "Action button for quick access to features",
    ],
    specifications: {
      "Display": "6.7-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Storage": "256GB",
      "Camera": "48MP + 12MP + 12MP",
      "Battery": "Up to 29 hours video playback",
    },
  },
  {
    id: "2",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    description: "Industry-leading noise cancellation with Auto NC Optimizer. Exceptional sound quality with 30mm drivers. Crystal clear hands-free calling with 4 beamforming microphones.",
    price: 328.00,
    originalPrice: 399.99,
    discount: 18,
    rating: 4.7,
    reviewCount: 8921,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop",
    ],
    category: "electronics",
    brand: "Sony",
    inStock: true,
    prime: true,
    features: [
      "Industry-leading noise cancellation",
      "30-hour battery life with quick charging",
      "Multipoint connection for 2 devices",
      "Speak-to-Chat automatically pauses music",
      "Lightweight design at 250g",
    ],
    specifications: {
      "Driver": "30mm",
      "Frequency Response": "4Hz-40,000Hz",
      "Battery Life": "30 hours",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.2",
    },
  },
  {
    id: "3",
    title: "Samsung 65\" Class OLED 4K S95D Smart TV",
    description: "Experience the deepest blacks and most vibrant colors with Samsung's revolutionary OLED technology. Neural Quantum Processor 4K AI upscaling delivers stunning picture quality.",
    price: 1997.99,
    originalPrice: 2599.99,
    discount: 23,
    rating: 4.6,
    reviewCount: 3421,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop",
    ],
    category: "electronics",
    brand: "Samsung",
    inStock: true,
    prime: true,
    features: [
      "65\" OLED 4K display with infinite contrast",
      "Neural Quantum Processor with AI upscaling",
      "Dolby Atmos and Object Tracking Sound",
      "Gaming Hub with cloud gaming support",
      "Smart TV with Tizen OS",
    ],
    specifications: {
      "Screen Size": "65 inches",
      "Resolution": "4K UHD (3840 x 2160)",
      "Panel Type": "OLED",
      "Refresh Rate": "120Hz",
      "HDR": "Quantum HDR OLED+",
    },
  },
  {
    id: "4",
    title: "Dyson V15 Detect Cordless Vacuum Cleaner",
    description: "Dyson's most powerful, intelligent cordless vacuum. Laser reveals microscopic dust. Piezo sensor counts and sizes dust particles. LCD screen shows what's been sucked up.",
    price: 649.99,
    originalPrice: 749.99,
    discount: 13,
    rating: 4.8,
    reviewCount: 6234,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=800&fit=crop",
    ],
    category: "home",
    brand: "Dyson",
    inStock: true,
    prime: true,
    features: [
      "Laser Slim Fluffy cleaner head reveals dust",
      "Piezo sensor measures dust 15,000 times a second",
      "Up to 60 minutes of fade-free power",
      "HEPA filtration captures 99.99% of particles",
      "LCD screen displays real-time reports",
    ],
    specifications: {
      "Run Time": "Up to 60 minutes",
      "Bin Volume": "0.76L",
      "Weight": "6.8 lbs",
      "Filtration": "Whole-machine HEPA",
      "Suction Power": "230 AW",
    },
  },
  {
    id: "5",
    title: "Apple MacBook Pro 16\" M3 Max - Space Black",
    description: "The most advanced Mac ever. M3 Max with up to 16-core CPU and 40-core GPU. Liquid Retina XDR display. Up to 22 hours battery life.",
    price: 3499.00,
    originalPrice: 3499.00,
    rating: 4.9,
    reviewCount: 4521,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
    ],
    category: "electronics",
    brand: "Apple",
    inStock: true,
    prime: true,
    features: [
      "M3 Max chip with 16-core CPU",
      "40-core GPU for professional graphics",
      "36GB unified memory",
      "16.2-inch Liquid Retina XDR display",
      "Up to 22 hours battery life",
    ],
    specifications: {
      "Chip": "Apple M3 Max",
      "Memory": "36GB",
      "Storage": "1TB SSD",
      "Display": "16.2-inch Liquid Retina XDR",
      "Battery": "Up to 22 hours",
    },
  },
  {
    id: "6",
    title: "Nike Air Jordan 1 Retro High OG - Chicago",
    description: "The shoe that started it all. The Air Jordan 1 Retro High OG features a premium leather upper and iconic colorway that pays homage to MJ's days in Chicago.",
    price: 180.00,
    originalPrice: 180.00,
    rating: 4.9,
    reviewCount: 15632,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=800&fit=crop",
    ],
    category: "fashion",
    brand: "Nike",
    inStock: true,
    prime: true,
    features: [
      "Premium leather upper",
      "Air-Sole unit for cushioning",
      "Rubber outsole with pivot circle",
      "Perforated toe box for ventilation",
      "Iconic Wings logo on collar",
    ],
    specifications: {
      "Material": "Full-grain leather",
      "Sole": "Rubber",
      "Closure": "Lace-up",
      "Style": "High-top",
      "Color": "Varsity Red/Black/White",
    },
  },
  {
    id: "7",
    title: "Kindle Paperwhite Signature Edition - 32GB",
    description: "The best Kindle for reading. With a 6.8\" display, adjustable warm light, auto-adjusting front light, and up to 10 weeks of battery life.",
    price: 189.99,
    originalPrice: 189.99,
    rating: 4.7,
    reviewCount: 28453,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=800&fit=crop",
    ],
    category: "electronics",
    brand: "Amazon",
    inStock: true,
    prime: true,
    features: [
      "6.8\" glare-free display",
      "Adjustable warm light",
      "32GB storage for thousands of books",
      "Wireless charging compatible",
      "IPX8 waterproof",
    ],
    specifications: {
      "Display": "6.8-inch 300 ppi",
      "Storage": "32GB",
      "Battery": "Up to 10 weeks",
      "Connectivity": "WiFi",
      "Weight": "207g",
    },
  },
  {
    id: "8",
    title: "Instant Pot Duo Plus 9-in-1 Electric Pressure Cooker",
    description: "9 appliances in 1: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, egg cooker, yogurt maker, warmer, and sterilizer.",
    price: 89.95,
    originalPrice: 119.95,
    discount: 25,
    rating: 4.7,
    reviewCount: 156234,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=800&fit=crop",
    ],
    category: "home",
    brand: "Instant Pot",
    inStock: true,
    prime: true,
    features: [
      "9 appliances in 1",
      "15 one-touch smart programs",
      "Easy-seal lid with auto sealing",
      "Dishwasher-safe parts",
      "Free Instant Pot app with recipes",
    ],
    specifications: {
      "Capacity": "6 quart",
      "Wattage": "1000W",
      "Programs": "15 smart programs",
      "Material": "Stainless steel",
      "Dimensions": "13.4 x 12.2 x 12.5 inches",
    },
  },
  {
    id: "9",
    title: "LEGO Star Wars Millennium Falcon Ultimate Collector Series",
    description: "Build and display the most iconic starship in the galaxy. This Ultimate Collector Series Millennium Falcon features intricate details and over 7,500 pieces.",
    price: 849.99,
    originalPrice: 849.99,
    rating: 4.9,
    reviewCount: 3421,
    image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800&h=800&fit=crop",
    ],
    category: "toys",
    brand: "LEGO",
    inStock: true,
    prime: true,
    features: [
      "7,541 pieces for advanced builders",
      "Highly detailed exterior and interior",
      "Includes 4 crew minifigures",
      "Rotating sensor dish and top/bottom quad laser cannons",
      "Display stand with informational fact plaque",
    ],
    specifications: {
      "Pieces": "7,541",
      "Age": "16+",
      "Dimensions": "33 x 22 x 8 inches",
      "Minifigures": "4 included",
      "Theme": "Star Wars",
    },
  },
  {
    id: "10",
    title: "PlayStation 5 Console - God of War Ragnarök Bundle",
    description: "Experience lightning-fast loading, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio. Includes God of War Ragnarök game.",
    price: 559.99,
    originalPrice: 559.99,
    rating: 4.8,
    reviewCount: 45632,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=800&fit=crop",
    ],
    category: "electronics",
    brand: "Sony",
    inStock: true,
    prime: true,
    features: [
      "Ultra-high speed SSD",
      "Ray tracing for realistic graphics",
      "4K-TV Gaming at 120fps",
      "Tempest 3D AudioTech",
      "Includes DualSense wireless controller",
    ],
    specifications: {
      "Storage": "825GB SSD",
      "GPU": "10.28 TFLOPs",
      "RAM": "16GB GDDR6",
      "Resolution": "Up to 8K",
      "Frame Rate": "Up to 120fps",
    },
  },
  {
    id: "11",
    title: "Bose QuietComfort Ultra Earbuds",
    description: "Bose's best noise cancelling earbuds with spatial audio. Immersive Audio for a deeper listening experience. Up to 6 hours of battery life.",
    price: 299.00,
    originalPrice: 299.00,
    rating: 4.5,
    reviewCount: 2341,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop",
    ],
    category: "electronics",
    brand: "Bose",
    inStock: true,
    prime: true,
    features: [
      "World-class noise cancellation",
      "Bose Immersive Audio with spatial sound",
      "CustomTune technology",
      "Up to 6 hours of battery life",
      "IPX4 water resistant",
    ],
    specifications: {
      "Battery Life": "6 hours (24 with case)",
      "Driver": "9.3mm",
      "Connectivity": "Bluetooth 5.3",
      "Water Resistance": "IPX4",
      "Weight": "6.24g per earbud",
    },
  },
  {
    id: "12",
    title: "Nespresso Vertuo Next Coffee and Espresso Machine",
    description: "Brew barista-grade coffee at home with the touch of a button. Centrifusion technology reads each capsule for perfect extraction every time.",
    price: 159.00,
    originalPrice: 209.00,
    discount: 24,
    rating: 4.6,
    reviewCount: 12453,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&h=800&fit=crop",
    ],
    category: "home",
    brand: "Nespresso",
    inStock: true,
    prime: true,
    features: [
      "Centrifusion technology for optimal extraction",
      "5 cup sizes from espresso to carafe",
      "30-second heat-up time",
      "Bluetooth and WiFi connectivity",
      "Made with 54% recycled plastics",
    ],
    specifications: {
      "Water Tank": "37 oz",
      "Pressure": "19 bars",
      "Cup Sizes": "5 (1.35oz - 18oz)",
      "Dimensions": "5.5 x 16.9 x 12.4 inches",
      "Weight": "8.8 lbs",
    },
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
};

export const getDeals = (): Product[] => {
  return products.filter((p) => p.discount && p.discount > 0);
};

export const getBestSellers = (): Product[] => {
  return [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);
};

export const getTrending = (): Product[] => {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
};
