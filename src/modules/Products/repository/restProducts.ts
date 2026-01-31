import { toProduct, toSingleProduct } from "../adapters/toProduct";
import type { Product } from "../entities/Product";
import type { ProductsRepository } from "./ProductRepo";
import type { FilterOptions } from "../utils/filterAndSort";
import { toCategories } from "../adapters/toCategories";
import type { Category } from "../entities/Category";
import type { CategoryDto } from "../dto/Category";

const BASE_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsRepository => {
  return {
    getAll: async (skip: number, limit: number): Promise<Product[]> => {
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

    async getCategories(): Promise<Category[]> {
      const res = await fetch(`${BASE_URL}/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = (await res.json()) as CategoryDto;

      return toCategories(data);
    },

    async deleteById(id: number | string): Promise<void> {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
    },

    async updateById(
      id: number | string,
      patch: Partial<Product>,
    ): Promise<Product> {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });

      if (!res.ok) throw new Error("Failed to update product");
      const data = await res.json();
      return toSingleProduct(data);
    },
  };
};
