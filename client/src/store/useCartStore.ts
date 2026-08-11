import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size?: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: JSON.parse(localStorage.getItem('yoursneaker_cart') || '[]'),

  addItem: (product, size = '42') => {
    const items = get().items;
    const existingIndex = items.findIndex(
      (i) => i.product.id === product.id && i.selectedSize === size
    );

    let updatedItems: CartItem[];
    if (existingIndex > -1) {
      updatedItems = [...items];
      updatedItems[existingIndex].quantity += 1;
    } else {
      updatedItems = [...items, { product, quantity: 1, selectedSize: size }];
    }

    localStorage.setItem('yoursneaker_cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
  },

  removeItem: (productId, size) => {
    const updatedItems = get().items.filter(
      (i) => !(i.product.id === productId && i.selectedSize === size)
    );
    localStorage.setItem('yoursneaker_cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
  },

  updateQuantity: (productId, size, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, size);
      return;
    }
    const updatedItems = get().items.map((i) => {
      if (i.product.id === productId && i.selectedSize === size) {
        return { ...i, quantity };
      }
      return i;
    });
    localStorage.setItem('yoursneaker_cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
  },

  clearCart: () => {
    localStorage.removeItem('yoursneaker_cart');
    set({ items: [] });
  },

  getTotalPrice: () => {
    return get().items.reduce((total, i) => total + i.product.price * i.quantity, 0);
  },

  getTotalItems: () => {
    return get().items.reduce((total, i) => total + i.quantity, 0);
  },
}));
