import { toProduct, toSingleProduct } from "../adapters/toProduct";
import type { Product } from "../entities/Product";
import type { ProductsRepository } from "./ProductRepo";
import type { FilterOptions } from "../utils/filterAndSort";

const BASE_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsRepository => {
  return {
    getAll: async (limit: number, skip: number): Promise<Product[]> => {
      const res = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return toProduct(data.products);
    },

    async getByCategory(
      category: string,
      options?: FilterOptions,
    ): Promise<Product[]> {
      const params = new URLSearchParams();
      if (options?.sort) params.append("sort", options.sort);
      if (options?.onlyAvailable) params.append("onlyAvailable", "true");
      if (options?.priceRange) {
        params.append("priceMin", options.priceRange[0].toString());
        params.append("priceMax", options.priceRange[1].toString());
      }

      const res = await fetch(
        `${BASE_URL}/category/${category}?${params.toString()}`,
      );
      if (!res.ok) throw new Error("Failed to fetch category products");
      const data = await res.json();
      return toProduct(data.products);
    },

    async getById(id: number | string): Promise<Product> {
      const res = await fetch(`${BASE_URL}/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      const data = await res.json();
      return toSingleProduct(data);
    },

    async getCategories(): Promise<string[]> {
      const res = await fetch(`${BASE_URL}/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },

    async deleteById(id: number | string): Promise<void> {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
    },
  };
};
