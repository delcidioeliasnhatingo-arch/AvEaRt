import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, FilterState, PlacedOrder, OrderCustomerInfo, ProductReview } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  couponCode: string;
  isCouponApplied: boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  placedOrders: PlacedOrder[];
  placeOrder: (customer: OrderCustomerInfo) => PlacedOrder;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  setCategoryFilter: (category: string) => void;
  resetFilters: () => void;
  addReview: (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => void;
}

const initialFilters: FilterState = {
  category: 'All',
  searchQuery: '',
  priceRange: [0, 3000],
  brands: [],
  compatibility: [],
  minRating: 0,
  sortBy: 'featured',
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aveart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aveart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [placedOrders, setPlacedOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('aveart_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'AVT-89210',
          date: 'September 15, 2026',
          items: [
            { product: PRODUCTS[2], quantity: 1, selectedVariant: 'Smooth Linear (45g)' },
            { product: PRODUCTS[5], quantity: 1, selectedVariant: 'Ash White' },
          ],
          subtotal: 244,
          shipping: 0,
          discount: 24.4,
          total: 219.6,
          status: 'Shipped',
          estimatedDelivery: 'September 26, 2026',
          customer: {
            name: 'Alexander Grey',
            email: 'alex.grey@example.com',
            phone: '+1 (555) 349-1029',
            address: '742 Evergreen Terrace',
            city: 'Portland',
            postalCode: '97201',
            country: 'United States',
            paymentMethod: 'apple_pay',
          },
        },
      ];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [couponCode, setCouponCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [filterState, setFilterState] = useState<FilterState>(initialFilters);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('aveart_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aveart_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('aveart_orders', JSON.stringify(placedOrders));
    } catch (e) {
      console.error(e);
    }
  }, [placedOrders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === variant
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });
    showToast(`Added ${product.name} to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variant?: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedVariant === variant))
    );
  };

  const updateQuantity = (productId: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedVariant === variant) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      const prod = products.find((p) => p.id === productId);
      if (exists) {
        showToast(`Removed from wishlist`);
      } else {
        showToast(`Added ${prod?.name || 'Item'} to wishlist`);
      }
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product, 1);
    setWishlist((prev) => prev.filter((id) => id !== product.id));
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'AVEART10' || trimmed === 'VERTEX10' || trimmed === 'LEVELUP') {
      setCouponCode(trimmed);
      setDiscountRate(0.1);
      showToast('Promo code applied: 10% OFF');
      return true;
    }
    if (trimmed === 'VIP20') {
      setCouponCode(trimmed);
      setDiscountRate(0.2);
      showToast('VIP code applied: 20% OFF');
      return true;
    }
    showToast('Invalid promo code. Try "AVEART10"');
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountRate(0);
    showToast('Coupon removed');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 15;
  const discount = subtotal * discountRate;
  const total = Math.max(0, subtotal - discount + shipping);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const placeOrder = (customer: OrderCustomerInfo): PlacedOrder => {
    const newOrder: PlacedOrder = {
      id: `AVT-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...cart],
      subtotal,
      shipping,
      discount,
      total,
      status: 'Processing',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(
        'en-US',
        { month: 'long', day: 'numeric', year: 'numeric' }
      ),
      customer,
    };

    setPlacedOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const setCategoryFilter = (category: string) => {
    setFilterState((prev) => ({
      ...prev,
      category,
    }));
  };

  const resetFilters = () => {
    setFilterState(initialFilters);
  };

  const addReview = (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => {
    const newReview: ProductReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };

    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === productId) {
          const updatedReviews = [newReview, ...prod.reviews];
          const newAvg =
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
          return {
            ...prod,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: Math.round(newAvg * 10) / 10,
          };
        }
        return prod;
      })
    );
    showToast('Thank you! Your verified review has been published.');
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        cartCount,
        subtotal,
        discount,
        shipping,
        total,
        freeShippingThreshold,
        freeShippingProgress,
        couponCode,
        isCouponApplied: discountRate > 0,
        applyCoupon,
        removeCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAccountOpen,
        setIsAccountOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        placedOrders,
        placeOrder,
        toastMessage,
        showToast,
        filterState,
        setFilterState,
        setCategoryFilter,
        resetFilters,
        addReview,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
