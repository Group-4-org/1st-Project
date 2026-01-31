import type { Category } from "../entities/Category";
import type { CategoryDto } from "../dto/Category"; 

const BASE_URL = "https://dummyjson.com/products";

const prettify = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");

type CategoryApi = string | CategoryDto;

export const toCategories = (items: CategoryApi[]): Category[] => {
  if (!items || items.length === 0) return [];

  return (items as CategoryDto[]).map((c) => ({
    slug: c.slug,
    name: c.name ?? prettify(c.slug),
    url: c.url ?? `${BASE_URL}/category/${c.slug}`,
  }));
};