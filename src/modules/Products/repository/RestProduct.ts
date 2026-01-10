import { toProduct } from "../adapters/toProduct";
import type { Product } from "../entities/Product";
import type { ProductsRepository } from "./ProductRepo";

const BASE_URL = "https://dummyjson.com/products";


export const restProducts = (): ProductsRepository => {
  return {
    getAll: async (): Promise<Product[]> => {
      const response = await fetch(BASE_URL);

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();
      return toProduct(data.products);
    },
  };
};
