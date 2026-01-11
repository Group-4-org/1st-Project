import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { useProducts } from "..";
import { useGetAllProducts } from "./useGetAllProducts";

export const useDeleteProduct = ({ onSuccess }: { onSuccess: () => void }) => {
    const { delete: deleteProduct } = useProducts();
    const queryclient = useQueryClient();

    const { mutate, isError, isPending, isSuccess } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: [useGetAllProducts.queryKey] });
            onSuccess();
        },
    });

    return {
        deleteProduct: mutate,
        isError,
        isPending,
        isSuccess,
    };
}