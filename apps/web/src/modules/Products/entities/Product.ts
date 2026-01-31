export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  isAvailable: boolean;
  hasDiscounts: boolean;
  rating: number;
  tags: string[];
  discountPercentage: number;
  reviews: Review[];
};

export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewer: {
    name: string;
    email: string;
  };
};
