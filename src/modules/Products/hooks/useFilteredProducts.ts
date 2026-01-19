import { useMemo } from "react";
import type { Product } from "../entities/Product";

export const useFilteredProducts = (
    products: Product[],
    priceRange: [number, number]
) => {
    return useMemo(() => {
        return products.filter(
            (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );
    }, [products, priceRange]);
};
