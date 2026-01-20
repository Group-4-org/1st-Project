import type { Product } from "../entities/Product";

export type SortKey =
    | "featured"
    | "price-asc"
    | "price-desc"
    | "name-asc"
    | "name-desc";

export type FilterOptions = {
    sort: SortKey;
    onlyAvailable: boolean;
    priceRange: [number, number];
};

export function filterAndSort(items: Product[], opts: FilterOptions): Product[] {
    const filtered = items.filter((p) => {
        if (opts.onlyAvailable && !p.isAvailable) return false;

        const price = Number(p.price);
        if (!Number.isNaN(price)) {
            if (price < opts.priceRange[0] || price > opts.priceRange[1]) return false;
        }
        return true;
    });

    if (opts.sort === "featured") return filtered;

    return filtered.sort((a, b) => {
        const pa = Number(a.price);
        const pb = Number(b.price);

        switch (opts.sort) {
            case "price-asc":
                return (Number.isNaN(pa) ? 0 : pa) - (Number.isNaN(pb) ? 0 : pb);
            case "price-desc":
                return (Number.isNaN(pb) ? 0 : pb) - (Number.isNaN(pa) ? 0 : pa);
            case "name-asc":
                return a.name.localeCompare(b.name);
            case "name-desc":
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });
}