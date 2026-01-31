import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Product } from "../entities/Product";
import type { FilterOptions } from "../utils/filterAndSort";
import { DELETED_PRODUCT_IDS_KEY } from "./useDeleteProduct";

export const GET_PRODUCTS_BY_CATEGORY_QUERY_KEY = "productsByCategory";

type Params = {
  category: string | null;
  options: FilterOptions;
};

export const useGetProductsByCategory = ({ category, options }: Params) => {
  const { getByCategory, getAll } = useProducts();
  const queryClient = useQueryClient();

  const deletedIds = (queryClient.getQueryData<number[]>(DELETED_PRODUCT_IDS_KEY) ?? []);

  const query = useQuery<Product[]>({
    queryKey: [GET_PRODUCTS_BY_CATEGORY_QUERY_KEY, category ?? "all", options],
    queryFn: async () => {
      const SKIP = 0;
      const LIMIT = 100;

      if (!category) return getAll(SKIP, LIMIT);

      return getByCategory(category, {
        sort: options.sort,
        onlyAvailable: options.onlyAvailable,
        priceRange: options.priceRange,
      });
    },

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,

    staleTime: 1000 * 60,
    select: (data) =>
      (data ?? []).filter((p) => !deletedIds.includes(Number(p.id))),
  });

  return {
    products: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    isEmpty: (query.data ?? []).length === 0,
  };
};