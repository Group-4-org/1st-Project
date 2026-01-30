import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Product } from "../entities/Product";

export const useDeleteProductById = () => {
  const { deleteById } = useProducts();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => deleteById(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previousProducts = queryClient.getQueryData<Product[]>([
        "products",
      ]);

      queryClient.setQueryData<Product[]>(["products"], (old) =>
        old?.filter((p) => p.id !== id),
      );

      return { previousProducts };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["products"], context?.previousProducts);
    },

    onSuccess: () => {
      console.log("Product deleted successfully");
    },
  });
};
