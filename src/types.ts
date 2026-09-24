export type ProductCategory =
  | 'Gaming PCs'
  | 'Monitors'
  | 'Keyboards'
  | 'Mice'
  | 'Headsets'
  | 'Accessories';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  shortDescription: string;
  fullDescription: string;
  specs: Record<string, string>;
  images: {
    front: string;
    side: string;
    detail: string;
    lifestyle: string;
  };
  compatibility: ('PC' | 'Mac' | 'PlayStation 5' | 'Xbox Series X')[];
  variants?: {
    name: string;
    options: string[];
  }[];
  shippingInfo: string;
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface FilterState {
  category: string;
  searchQuery: string;
  priceRange: [number, number];
  brands: string[];
  compatibility: string[];
  minRating: number;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'best-selling';
}

export interface OrderCustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: 'card' | 'apple_pay' | 'cod';
}

export interface PlacedOrder {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
  customer: OrderCustomerInfo;
}
