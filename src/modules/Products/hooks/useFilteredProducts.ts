import { useMemo } from "react";
import type { Product } from "../entities/Product";
import { filterAndSort, type FilterOptions } from "../utils/filterAndSort";

export function useFilteredProducts(
    all: Product[],
    high: Product[],
    low: Product[],
    options: FilterOptions
) {
    return useMemo(() => {
        return {
            all: filterAndSort(all, options),
            high: filterAndSort(high, options),
            low: filterAndSort(low, options),
        };
    }, [all, high, low, options]);
}
