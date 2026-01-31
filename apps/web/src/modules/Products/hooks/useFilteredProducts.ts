import { useMemo } from "react";
import type { Product } from "../entities/Product";
import { filterAndSort, type FilterOptions } from "../utils/filterAndSort";

export function useFilteredProducts(
    Products: Product[],
    options: FilterOptions
) {
    return useMemo(() => {
        return {
            all: filterAndSort(Products, options),
        };
    }, [Products, options]);
}