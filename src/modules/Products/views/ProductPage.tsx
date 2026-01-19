import { Box, Title, Grid, Text, Stack } from '@mantine/core';
import { useGetAllProducts } from '../hooks/useGetAllProducts';
import ProductCard from './ProductCard';

export const Products = () => {
  const limit = 20;
  const skip = 0;
  const {
    all: products,
    productsWithDiscountHigherThan10,
    productsWithDiscountLowerThan10,
    isLoading,
  } = useGetAllProducts(limit, skip);

  if (isLoading) {
    return (
      <Box
        style={{
          backgroundColor: '#23272f',
          minHeight: '100vh',
          width: '100%',
        }}
        p={80}
      >
        <Text c="#e3e8ec" ta="center">
          Loading products...
        </Text>
      </Box>
    );
  }

  return (
   
      <Stack gap="xl">
        <Title order={2} c="#e3e8ec" ta="center">
          Our Products
        </Title>

        <Grid justify="center" gutter="lg">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
       
        <Title order={2} c="#e3e8ec" ta="center">
          Products with discounts higher than 10%
        </Title>

        <Grid justify="center" gutter="lg">
          {productsWithDiscountHigherThan10.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
        <Title order={2} c="#e3e8ec" ta="center">
          Products with discounts lower than 10%
        </Title>

        <Grid justify="center" gutter="lg">
          {productsWithDiscountLowerThan10.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Stack>
  );
};
