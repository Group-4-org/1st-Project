import type { Product } from "../entities/Product";
import type { Category } from "../entities/Category";
import type { FilterOptions } from "../utils/filterAndSort";
export interface ProductsRepository {
  getAll: (skip: number, limit: number) => Promise<Product[]>;
  getById: (id: number | string) => Promise<Product>;
  deleteById: (id: number | string) => Promise<void>;
  getCategories: () => Promise<Category[]>;
  getByCategory: (category: string, options?: FilterOptions) => Promise<Product[]>;
  updateById: (id: number | string, patch: Partial<Product>) => Promise<Product>; 
}