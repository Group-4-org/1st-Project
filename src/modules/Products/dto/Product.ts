export type ProductDto = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  images: string[];
  stock: number;
  discountPercentage: number;
  rating: number;
  tags: string[];
  reviews: ReviewDto[];
};

export type ReviewDto = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};
