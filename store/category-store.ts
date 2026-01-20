import type { Category, Product, SubCategory } from '@/types/category';
import { create } from 'zustand';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CategoryState {
  selectedSuperCategory: string | null;
  selectedCategory: Category | null;
  selectedSubCategory: SubCategory | null;
  isModalVisible: boolean;
  cartItems: CartItem[];
  showCartNotification: boolean;
  totalSavings: number;
  setSelectedSuperCategory: (superCategory: string) => void;
  setSelectedCategory: (category: Category | null) => void;
  setSelectedSubCategory: (subCategory: SubCategory | null) => void;
  setModalVisible: (visible: boolean) => void;
  resetCategorySelection: () => void;
  addToCart: (product: Product) => void;
  setShowCartNotification: (visible: boolean) => void;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  selectedSuperCategory: null,
  selectedCategory: null,
  selectedSubCategory: null,
  isModalVisible: false,
  cartItems: [],
  showCartNotification: false,
  totalSavings: 0,
  setSelectedSuperCategory: (superCategory) =>
    set({ selectedSuperCategory: superCategory }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedSubCategory: (subCategory) =>
    set({ selectedSubCategory: subCategory }),
  setModalVisible: (visible) => set({ isModalVisible: visible }),
  resetCategorySelection: () =>
    set({
      selectedCategory: null,
      selectedSubCategory: null,
    }),
  addToCart: (product) => {
    const { cartItems } = get();
    const existingItem = cartItems.find((item) => item.product.id === product.id);

    let newCartItems;
    if (existingItem) {
      newCartItems = cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCartItems = [...cartItems, { product, quantity: 1 }];
    }

    const savings = newCartItems.reduce((total, item) => {
      const itemSavings = (item.product.originalPrice - item.product.price) * item.quantity;
      return total + itemSavings;
    }, 0);

    set({
      cartItems: newCartItems,
      showCartNotification: true,
      totalSavings: savings
    });

    setTimeout(() => {
      set({ showCartNotification: false });
    }, 10000);
  },
  setShowCartNotification: (visible) => set({ showCartNotification: visible }),
}));
