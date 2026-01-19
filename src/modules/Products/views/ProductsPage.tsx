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

import { filterAndSort, type FilterOptions } from "../utils/filterAndSort";

const PRICE_MIN = 0;
const PRICE_MAX = 3000;

export const Products = () => {
  const limit = 20;
  const skip = 0;

  const {
    all,
    productsWithDiscountHigherThan10,
    productsWithDiscountLowerThan10,
    isLoading,
  } = useGetAllProducts(limit, skip);

  const [opened, { toggle }] = useDisclosure(false);

  const [options, setOptions] = useState<FilterOptions>({
    sort: "featured",
    onlyAvailable: false,
    priceRange: [PRICE_MIN, PRICE_MAX],
  });

  const filtered = useMemo(() => {
    return {
      all: filterAndSort(all ?? [], options),
      high: filterAndSort(productsWithDiscountHigherThan10 ?? [], options),
      low: filterAndSort(productsWithDiscountLowerThan10 ?? [], options),
    };
  }, [
    all,
    productsWithDiscountHigherThan10,
    productsWithDiscountLowerThan10,
    options,
  ]);

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
                  Browse all items and check the best deals.
                </Text>
              </Stack>
              <Burger hiddenFrom="sm" opened={opened} onClick={toggle} />
            </Group>

            <ProductsSection title="All Products" items={filtered.all} />

            <Divider />

            <ProductsSection
              title="Discounts higher than 10%"
              items={filtered.high}
            />

            <ProductsSection
              title="Discounts lower than 10%"
              items={filtered.low}
            />
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};