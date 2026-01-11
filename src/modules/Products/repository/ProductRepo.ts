import type { Product } from "../entities/Product";

export interface ProductsRepository {
  getAll: (skip:number,limit:number) => Promise<Product[]>;
}