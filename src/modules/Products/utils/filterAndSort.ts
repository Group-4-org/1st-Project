import type { Product } from "../entities/Product";

export type SortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "rating"
  | "discount";

export type FilterOptions = {
  sort: SortKey;
  onlyAvailable: boolean;
  priceRange: [number, number];
};

export function filterAndSort(
  items: Product[],
  opts: FilterOptions,
): Product[] {
  const [minPrice, maxPrice] = opts.priceRange;

  const filtered = items.filter((p) => {
    if (opts.onlyAvailable && !p.isAvailable) return false;

    const price = Number(p.price ?? 0);
    if (price < minPrice || price > maxPrice) return false;

    return true;
  });

  if (opts.sort === "featured") return filtered;

  return [...filtered].sort((a, b) => {
    switch (opts.sort) {
      case "price-asc":
        return Number(a.price ?? 0) - Number(b.price ?? 0);

      case "price-desc":
        return Number(b.price ?? 0) - Number(a.price ?? 0);

      case "name-asc":
        return a.name.localeCompare(b.name);

      case "name-desc":
        return b.name.localeCompare(a.name);

      case "rating":
        return Number(b.rating ?? 0) - Number(a.rating ?? 0);

      case "discount":
        return (
          Number(b.discountPercentage ?? 0) -
          Number(a.discountPercentage ?? 0)
        );

      default:
        return 0;
    }
  });
}
