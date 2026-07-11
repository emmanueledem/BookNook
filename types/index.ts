export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  description: string;
  reviewList: Review[];
}

export interface CartItem extends Book {
  quantity: number;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
}
