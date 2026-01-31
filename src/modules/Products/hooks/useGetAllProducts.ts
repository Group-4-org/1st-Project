import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Product } from "../entities/Product";

const Get_ALL_PRODUCTS_QUERY_KEY = "products";

export const useGetAllProducts = (skip: number, limit: number) => {
  const { getAll } = useProducts();

  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: [Get_ALL_PRODUCTS_QUERY_KEY,skip,limit],
    queryFn: () => getAll(skip, limit),
    staleTime: 1000 * 60,
  });

  return {
    all: data as Product[],
    isEmpty: !!error,
    isLoading,
    error,
  };
};

useGetAllProducts.queryKey = Get_ALL_PRODUCTS_QUERY_KEY;
