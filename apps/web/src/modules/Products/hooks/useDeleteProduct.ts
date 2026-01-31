import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Product } from "../entities/Product";
import { GET_PRODUCTS_BY_CATEGORY_QUERY_KEY } from "./useGetProductsByCategory";

export const DELETED_PRODUCT_IDS_KEY = ["deletedProductIds"];

export const useDeleteProductById = () => {
  const { deleteById } = useProducts();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => deleteById(id),

    onMutate: async (id) => {
      const numericId = Number(id);

      queryClient.setQueryData<number[]>(DELETED_PRODUCT_IDS_KEY, (old) => {
        const prev = old ?? [];
        return prev.includes(numericId) ? prev : [...prev, numericId];
      });

      await queryClient.cancelQueries({ queryKey: [GET_PRODUCTS_BY_CATEGORY_QUERY_KEY] });

      const previous = queryClient.getQueriesData<Product[]>({
        queryKey: [GET_PRODUCTS_BY_CATEGORY_QUERY_KEY],
      });

      queryClient.setQueriesData<Product[]>(
        { queryKey: [GET_PRODUCTS_BY_CATEGORY_QUERY_KEY] },
        (old) => (old ?? []).filter((p) => Number(p.id) !== numericId)
      );

      return { previous };
    },

    onError: (_err, _id, context) => {
      context?.previous?.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });

    },

    onSuccess: () => {
      console.log("Deleted locally");
    },
  });
};