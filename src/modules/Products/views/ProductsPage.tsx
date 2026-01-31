import {
  AppShell,
  Burger,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";

import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { ProductsLoading } from "./components/ProductsLoading";
import { ProductsSection } from "./components/ProductsSection";
import { ProductsSidebar } from "./components/ProductsSidebar";

import type { Product } from "../entities/Product";
import type { FilterOptions } from "../utils/filterAndSort";

const PRICE_MIN = 0;
const PRICE_MAX = 3000;

export const Products = () => {
  const limit = 200;
  const skip = 0;

  const { all, isLoading } = useGetAllProducts(limit, skip);

  const [opened, { toggle }] = useDisclosure(false);

  const [options, setOptions] = useState<FilterOptions>({
    sort: "featured",
    onlyAvailable: false,
    priceRange: [PRICE_MIN, PRICE_MAX],
  });

  const filteredProducts = useMemo(() => {
    const products = (all ?? []) as Product[];

    const afterAvailability = options.onlyAvailable
      ? products.filter((p) => p.isAvailable)
      : products;

    const [minPrice, maxPrice] = options.priceRange ?? [PRICE_MIN, PRICE_MAX];
    const afterPrice = afterAvailability.filter((p) => {
      const price = Number(p.price ?? 0);
      return price >= minPrice && price <= maxPrice;
    });

    const sorted = [...afterPrice];

    switch (options.sort) {
      case "price-asc":
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "price-desc":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "rating":
        sorted.sort((a, b) => Number(b.rating ?? 0) - Number(a.rating ?? 0));
        break;

      case "discount":
        sorted.sort(
          (a, b) =>
            Number(b.discountPercentage ?? 0) - Number(a.discountPercentage ?? 0),
        );
        break;

      default:
        break;
    }

    return sorted;
  }, [all, options]);

  const productsByCategory = useMemo(() => {
    const map = new Map<string, Product[]>();

    for (const p of filteredProducts) {
      const category = (p.category || "Uncategorized").toString();
      if (!map.has(category)) map.set(category, []);
      map.get(category)!.push(p);
    }

    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredProducts]);

  if (isLoading) return <ProductsLoading />;

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
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="lg">
          <Stack gap="xl" py={24}>
            <Group justify="space-between" align="center">
              <Stack gap={4}>
                <Title order={2}>Our Products</Title>
                <Text c="dimmed">
                  Browse all items and explore categories. Sale label appears on
                  the card if discount is higher than 10%.
                </Text>
              </Stack>
              <Burger hiddenFrom="sm" opened={opened} onClick={toggle} />
            </Group>

            <ProductsSection title="All Products" items={filteredProducts.slice(0, 10)} />

            <Divider />

            {productsByCategory.length === 0 ? (
              <Text c="dimmed">No products match your filters.</Text>
            ) : (
              productsByCategory.map(([category, items]) => (
                <Stack key={category} gap="md">
                  <ProductsSection title={category} items={items} />
                  <Divider />
                </Stack>
              ))
            )}
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};