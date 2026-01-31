import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Category } from "../dto/Product";

export const GET_CATEGORIES_QUERY_KEY = "categories";

export const useGetCategories = () => {
  const { getCategories } = useProducts();

  const { data, error, isLoading } = useQuery<Category[]>({
    queryKey: [GET_CATEGORIES_QUERY_KEY],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60,
  });

  const categories = data ?? [];

  return {
    categories,                         
    isEmpty: !isLoading && categories.length === 0,
    isLoading,
    error,
  };
};

useGetCategories.queryKey = GET_CATEGORIES_QUERY_KEY;