import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Product } from "../entities/Product";

const GET_PRODUCT_BY_ID_QUERY_KEY = "product";

export const useGetProductById = (id: number | string) => {
    const { getById } = useProducts();

    const {
        data,
        error,
        isLoading,
    } = useQuery({
        queryKey: [GET_PRODUCT_BY_ID_QUERY_KEY, id],
        queryFn: () => getById(id),
        staleTime: 1000 * 60,
        enabled: id !== undefined && id !== null && String(id).trim() !== "",
        select: (data: Product) => data,
    });

    return {
        product: data ?? null,
        isEmpty: error,
        isLoading,
    };
};

useGetProductById.queryKey = GET_PRODUCT_BY_ID_QUERY_KEY;
