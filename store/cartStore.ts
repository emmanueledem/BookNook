import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book, CartItem } from '@/types';

interface CartStore {
  items: CartItem[];

  addToCart: (book: Book) => void;
  removeFromCart: (id: string) => void;

  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;

  clearCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (book) => {
        const existing = get().items.find((item) => item.id === book.id);

        if (existing) {
          set({
            items: get().items.map((item) =>
              item.id === book.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
            ),
          });

          return;
        }

        set({
          items: [
            ...get().items,
            {
              ...book,
              quantity: 1,
            },
          ],
        });
      },

      removeFromCart: (id) =>
        set({
          items: get().items.filter((item) => item.id !== id),
        }),

      increaseQuantity: (id) =>
        set({
          items: get().items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        }),

      decreaseQuantity: (id) =>
        set({
          items: get()
            .items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        }),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      getTotalPrice: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
