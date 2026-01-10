import { Box, Container, Title, Text } from "@mantine/core";
import { useProducts } from "..";

export const Products = () => {
    const text = useProducts();
  return (
      <Container size="sm">
        <Title order={2}>{text}</Title>
        <Text c="dimmed" mt={6}>
          This page will display products and allow searching/filtering later.
        </Text>
      </Container>
  );
};
