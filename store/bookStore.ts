import { create } from 'zustand';

import { Book } from '@/types';
import { getBooks } from '@/services/BookService';

interface BookStore {
  books: Book[];
  loading: boolean;
  error: string | null;

  fetchBooks: () => Promise<void>;
}

export const useBookStore = create<BookStore>((set) => ({
  books: [],
  loading: false,
  error: null,

  fetchBooks: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getBooks();

      set({
        books: response,
        loading: false,
      });
    } catch (e) {
      set({
        loading: false,
        error: 'Unable to load books.',
      });
    }
  },
}));
