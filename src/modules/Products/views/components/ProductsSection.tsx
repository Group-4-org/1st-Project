import { Grid, Paper, Stack, Text, Title } from "@mantine/core";
import type { Product } from "../../entities/Product";
import ProductCard from "../ProductCard";

type Props = {
  title: string;
  items: Product[];
};

export function ProductsSection({ title, items }: Props) {
  return (
    <Paper
      withBorder
      radius="lg"
      p="lg"
      shadow="xs"
      style={{ overflow: "hidden" }}
    >
      <Stack gap={6} mb="md">
        <Title order={3}>{title}</Title>
        <Text c="dimmed" size="sm">
          Showing the latest products in this category.
        </Text>
      </Stack>

      {items.length === 0 ? (
        <Text c="dimmed" ta="center" py="md">
          No products found.
        </Text>
      ) : (
        <Grid gutter="lg">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      )}
    </Paper>
  );
}