import {
  Box,
  Burger,
  Button,
  Group,
  RangeSlider,
  Select,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import type { FilterOptions, SortKey } from "../../utils/filterAndSort";
import type { Category } from "../../entities/Category";

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc", label: "Name: A → Z" },
  { value: "name-desc", label: "Name: Z → A" },
  { value: "rating", label: "Rating: High → Low" },
  { value: "discount", label: "Biggest Discount" },
];

type Props = {
  opened: boolean;
  toggle: () => void;
  options: FilterOptions;
  setOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  priceMin: number;
  priceMax: number;
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
};

export function ProductsSidebar({
  opened,
  toggle,
  options,
  setOptions,
  priceMin,
  priceMax,
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map((cat) => ({
      value: cat.slug,
      label: cat.name,
    })),
  ];

  return (
    <Stack gap="md" p="md" style={{ height: "100%" }}>
      <Group justify="space-between" align="center">
        <Title order={4}>Sort & Filter</Title>
        <Burger hiddenFrom="sm" opened={opened} onClick={toggle} size="sm" />
      </Group>

      <Select
        label="Category"
        value={selectedCategory ?? "all"}
        placeholder="All Categories"
        data={categoryOptions}
        onChange={(value) =>
          setSelectedCategory(!value || value === "all" ? null : value)
        }
      />

      <Select
        label="Sort by"
        value={options.sort}
        data={SORT_OPTIONS}
        onChange={(value) => {
          if (!value) return;
          setOptions((prev) => ({ ...prev, sort: value }));
        }}
      />

      <Switch
        label="Only available"
        checked={options.onlyAvailable}
        onChange={(event) =>
          setOptions((prev) => ({
            ...prev,
            onlyAvailable: event.currentTarget.checked,
          }))
        }
      />

      <Box>
        <Text size="sm" fw={500} mb={6}>
          Price range
        </Text>
        <RangeSlider
          min={priceMin}
          max={priceMax}
          value={options.priceRange}
          onChange={(range) =>
            setOptions((prev) => ({ ...prev, priceRange: range }))
          }
        />
        <Text size="xs" c="dimmed" mt={6}>
          ${options.priceRange[0]} — ${options.priceRange[1]}
        </Text>
      </Box>

      <Button
        variant="light"
        onClick={() => {
          setOptions({
            sort: "featured",
            onlyAvailable: false,
            priceRange: [priceMin, priceMax],
          });
          setSelectedCategory(null);
        }}
      >
        Reset filters
      </Button>
    </Stack>
  );
}