import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Product } from "../entities/Product";
import { GET_PRODUCTS_BY_CATEGORY_QUERY_KEY } from "./useGetProductsByCategory";

const GET_PRODUCT_BY_ID_QUERY_KEY = "product";

type Patch = Partial<Pick<Product, "name" | "price" | "description">>;

export const useUpdateProductById = () => {
  const { updateById } = useProducts(); // إذا موجودة عندك، لو مش موجودة احكيلّي
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, patch }: { id: number | string; patch: Patch }) => {
      // لو بدك تعديل محلي فقط: رجعي patch مع id بدون API
      // return { id, ...patch } as any;

      // لو عندك API:
      return updateById(id, patch);
    },

    onMutate: async ({ id, patch }) => {
      const numericId = Number(id);

      await queryClient.cancelQueries({ queryKey: [GET_PRODUCTS_BY_CATEGORY_QUERY_KEY] });
      await queryClient.cancelQueries({ queryKey: [GET_PRODUCT_BY_ID_QUERY_KEY, id] });

      const prevProduct = queryClient.getQueryData<Product>([GET_PRODUCT_BY_ID_QUERY_KEY, id]);
      const prevLists = queryClient.getQueriesData<Product[]>({
        queryKey: [GET_PRODUCTS_BY_CATEGORY_QUERY_KEY],
      });

      queryClient.setQueryData<Product | undefined>(
        [GET_PRODUCT_BY_ID_QUERY_KEY, id],
        (old) => (old ? { ...old, ...patch } : old)
      );

      queryClient.setQueriesData<Product[]>(
        { queryKey: [GET_PRODUCTS_BY_CATEGORY_QUERY_KEY] },
        (old) =>
          (old ?? []).map((p) =>
            Number(p.id) === numericId ? { ...p, ...patch } : p
          )
      );

      return { prevProduct, prevLists, id };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prevProduct) {
        queryClient.setQueryData([GET_PRODUCT_BY_ID_QUERY_KEY, ctx.id], ctx.prevProduct);
      }
      ctx?.prevLists?.forEach(([key, data]) => queryClient.setQueryData(key, data));
    },


  });
};