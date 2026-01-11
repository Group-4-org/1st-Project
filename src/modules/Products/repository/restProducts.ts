import { toProduct } from '../adapters/toProduct';
import type { Product } from '../entities/Product';
import type { ProductsRepository } from './ProductRepo';

const Base_URL = 'https://dummyjson.com/products';

export const restProducts = (): ProductsRepository => {
  return {
    getAll: async (limitation: number, skip: number): Promise<Product[]> => {
      const response = await fetch(`${Base_URL}?limit=${limitation}&skip=${skip}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json().then((data) => toProduct(data.products));
    },
  };
};
