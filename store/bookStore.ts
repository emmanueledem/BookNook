import { create } from 'zustand';
import { Book } from '@/types';
import { getBooks } from '@/services/BookService';

interface BookStore {
  books: Book[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  page: number;
  error: string | null;

  fetchBooks: () => Promise<void>;
  loadMore: () => Promise<void>;
}

export const useBookStore = create<BookStore>((set, get) => ({
  books: [],
  loading: false,
  loadingMore: false,
  page: 1,
  hasMore: true,
  error: null,

  fetchBooks: async () => {
    set({
      loading: true,
      error: null,
      page: 1,
    });

    try {
      const response = await getBooks(1);

      set({
        books: response.data,
        page: response.page,
        hasMore: response.hasMore,
        loading: false,
      });
    } catch {
      set({
        loading: false,
        error: 'Unable to load books.',
      });
    }
  },

  loadMore: async () => {
    const { loadingMore, hasMore, page, books } = get();

    if (loadingMore || !hasMore) return;

    set({
      loadingMore: true,
    });

    try {
      const response = await getBooks(page + 1);

      set({
        books: [...books, ...response.data],
        page: response.page,
        hasMore: response.hasMore,
        loadingMore: false,
      });
    } catch {
      set({
        loadingMore: false,
      });
    }
  },
}));
