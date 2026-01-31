import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Container, Group, Stack, Text, Title } from "@mantine/core";

import { ProductsSidebar } from "./components/ProductsSidebar";
import { ProductsSection } from "./components/ProductsSection";
import { ProductsLoading } from "./components/ProductsLoading";

import { useGetCategories } from "../hooks/useGetCategories";
import { useGetProductsByCategory } from "../hooks/useGetProductsByCategory";

import type { FilterOptions } from "../utils/filterAndSort";

const PRICE_MIN = 0;
const PRICE_MAX = 3000;

export const Products = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const [options, setOptions] = useState<FilterOptions>({
    sort: "featured",
    onlyAvailable: false,
    priceRange: [PRICE_MIN, PRICE_MAX],
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { categories, isLoading: categoriesLoading } = useGetCategories();

  const { products, isLoading: productsLoading } = useGetProductsByCategory({
    category: selectedCategory, 
    options,
  });

  const selectedCategoryName = selectedCategory
    ? categories.find((c) => c.slug === selectedCategory)?.name ?? selectedCategory
    : "All Products";

  console.log("categories:", categories);
  console.log("selectedCategory:", selectedCategory);

  if (categoriesLoading || productsLoading) return <ProductsLoading />;

  return (
    <AppShell
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
      styles={{
        main: {
          background: "linear-gradient(180deg, #f8f9fa, #ffffff)",
          minHeight: "100vh",
        },
      }}
    >
      <AppShell.Navbar>
        <ProductsSidebar
          opened={opened}
          toggle={toggle}
          options={options}
          setOptions={setOptions}
          priceMin={PRICE_MIN}
          priceMax={PRICE_MAX}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="lg">
          <Stack gap="xl" py={24}>
            <Group justify="space-between" align="center">
              <Stack gap={4}>
                <Title order={2}>Our Products</Title>
                <Text c="dimmed">
                  Browse all items and explore categories. Sale label appears on the card if
                  discount is higher than 10%.
                </Text>
              </Stack>
              <Burger hiddenFrom="sm" opened={opened} onClick={toggle} />
            </Group>

            {products.length === 0 ? (
              <Text c="dimmed">No products match your filters.</Text>
            ) : (
              <ProductsSection title={selectedCategoryName} items={products} />
            )}
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};