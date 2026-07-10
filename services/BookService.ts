import { books } from '@/mock/book';
import { Book } from '@/types';

interface BookResponse {
  data: Book[];
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export const getBooks = (page: number, limit: number = 4): Promise<BookResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = start + limit;

      const data = books.slice(start, end);

      resolve({
        data,
        page,
        totalPages: Math.ceil(books.length / limit),
        hasMore: end < books.length,
      });
    }, 1000);
  });
};
