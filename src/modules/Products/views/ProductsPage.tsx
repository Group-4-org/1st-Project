import {
  AppShell,
  Burger,
  Box,
  Title,
  Grid,
  Text,
  Stack,
  Container,
  Paper,
  Divider,
  Select,
  Switch,
  RangeSlider,
  Group,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import ProductCard from "./ProductCard";
import type { Product } from "../entities/Product";

type SortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

function applyFiltersAndSort(
  items: Product[],
  opts: {
    sort: SortKey;
    onlyAvailable: boolean;
    priceRange: [number, number];
  },
) {
  const filtered = items.filter((p) => {
    if (opts.onlyAvailable && !p.isAvailable) return false;

    const price = Number(p.price);
    if (!Number.isNaN(price)) {
      if (price < opts.priceRange[0] || price > opts.priceRange[1])
        return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const pa = Number(a.price);
    const pb = Number(b.price);

    switch (opts.sort) {
      case "price-asc":
        return (Number.isNaN(pa) ? 0 : pa) - (Number.isNaN(pb) ? 0 : pb);
      case "price-desc":
        return (Number.isNaN(pb) ? 0 : pb) - (Number.isNaN(pa) ? 0 : pa);
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return sorted;
}

export const Products = () => {
  const limit = 20;
  const skip = 0;

  const {
    all: products,
    productsWithDiscountHigherThan10,
    productsWithDiscountLowerThan10,
    isLoading,
  } = useGetAllProducts(limit, skip);

  const [opened, { toggle }] = useDisclosure(false);

  const [sort, setSort] = useState<SortKey>("featured");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const filteredAll = useMemo(
    () =>
      applyFiltersAndSort(products ?? [], {
        sort,
        onlyAvailable,
        priceRange,
      }),
    [products, sort, onlyAvailable, priceRange],
  );

  const filteredHigh = useMemo(
    () =>
      applyFiltersAndSort(productsWithDiscountHigherThan10 ?? [], {
        sort,
        onlyAvailable,
        priceRange,
      }),
    [productsWithDiscountHigherThan10, sort, onlyAvailable, priceRange],
  );

  const filteredLow = useMemo(
    () =>
      applyFiltersAndSort(productsWithDiscountLowerThan10 ?? [], {
        sort,
        onlyAvailable,
        priceRange,
      }),
    [productsWithDiscountLowerThan10, sort, onlyAvailable, priceRange],
  );

  if (isLoading) {
    return (
      <Box
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #f8f9fa, #ffffff)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container size="lg">
          <Paper withBorder radius="lg" p="xl" shadow="sm">
            <Title order={3} ta="center">
              Loading products...
            </Title>
            <Text c="dimmed" ta="center" mt={6}>
              Please wait a moment
            </Text>
          </Paper>
        </Container>
      </Box>
    );
  }

  const Sidebar = (
    <Stack gap="md" p="md">
      <Group justify="space-between" align="center">
        <Title order={4}>Sort & Filter</Title>
        <Burger hiddenFrom="sm" opened={opened} onClick={toggle} size="sm" />
      </Group>

      <Select
        label="Sort by"
        value={sort}
        onChange={(v) => setSort((v as SortKey) ?? "featured")}
        data={[
          { value: "featured", label: "Featured" },
          { value: "price-asc", label: "Price: Low → High" },
          { value: "price-desc", label: "Price: High → Low" },
          { value: "name-asc", label: "Name: A → Z" },
          { value: "name-desc", label: "Name: Z → A" },
        ]}
      />

      <Switch
        label="Only available"
        checked={onlyAvailable}
        onChange={(e) => setOnlyAvailable(e.currentTarget.checked)}
      />

      <Box>
        <Text size="sm" fw={500} mb={6}>
          Price range
        </Text>
        <RangeSlider
          min={0}
          max={5000}
          value={priceRange}
          onChange={setPriceRange}
        />
        <Text size="xs" c="dimmed" mt={6}>
          ${priceRange[0]} — ${priceRange[1]}
        </Text>
      </Box>

      <Button
        variant="light"
        onClick={() => {
          setSort("featured");
          setOnlyAvailable(false);
          setPriceRange([0, 5000]);
        }}
      >
        Reset
      </Button>
    </Stack>
  );

  const Section = ({ title, items }: { title: string; items: Product[] }) => (
    <Paper
      withBorder
      radius="lg"
      p="lg"
      shadow="xs"
      style={{ overflow: "hidden" }}
    >
      <GroupTitle title={title} />

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

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      styles={{
        main: {
          background: "linear-gradient(180deg, #f8f9fa, #ffffff)",
          minHeight: "100vh",
        },
      }}
    >
      <AppShell.Navbar>{Sidebar}</AppShell.Navbar>

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

            <Section title="All Products" items={filteredAll} />

            <Divider />

            <Section title="Discounts higher than 10%" items={filteredHigh} />

            <Section title="Discounts lower than 10%" items={filteredLow} />
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

function GroupTitle({ title }: { title: string }) {
  return (
    <Stack gap={6} mb="md">
      <Title order={3}>{title}</Title>
      <Text c="dimmed" size="sm">
        Showing the latest products in this category.
      </Text>
    </Stack>
  );
}
