import { useQuery } from '@tanstack/react-query';
import { useProducts } from '..';
import type { Product } from '../entities/Product';

type SelectQueryData = {
  all: Product[];
  productsWithDiscountHigherThan10: Product[];
  productsWithDiscountLowerThan10: Product[];
  productsWithHighRating: Product[];
  productsfurniture: Product[];
};

const Get_ALL_PRODUCTS_QUERY_KEY = 'products';

export const useGetAllProducts = (limit: number, skip: number) => {
  const { getAll } = useProducts();
  const {
    data = {
      all: [],
      productsWithDiscountHigherThan10: [],
      productsWithDiscountLowerThan10: [],
      productsWithHighRating: [],
      productsfurniture: [],
    },
    error,
    isLoading,
  } = useQuery({
    queryKey: [Get_ALL_PRODUCTS_QUERY_KEY],
    queryFn: () => getAll(limit, skip),
    staleTime: 1000 * 60,
    select: (data: Product[]): SelectQueryData => {
      return {
        all: data,
        productsWithDiscountHigherThan10: data.filter(
          (product) =>  product.discountPercentage > 10
        ),
        productsWithDiscountLowerThan10: data.filter(
          (product) =>  product.discountPercentage <= 10
        ),
        productsWithHighRating: data.filter((product) => product.rating > 4),
        productsfurniture: data.filter((product) => product.category === 'furniture'),
      };
    },
  });

  return {
    productsWithDiscountHigherThan10: data.productsWithDiscountHigherThan10,
    productsWithDiscountLowerThan10: data.productsWithDiscountLowerThan10,
    productsWithHighRating: data.productsWithHighRating,
    productsfurniture: data.productsfurniture,
    all: data.all,
    isEmpty: error,
    isLoading,
  };
};

useGetAllProducts.queryKey = Get_ALL_PRODUCTS_QUERY_KEY;
