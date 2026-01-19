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

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc", label: "Name: A → Z" },
  { value: "name-desc", label: "Name: Z → A" },
];

type Props = {
  opened: boolean;
  toggle: () => void;
  options: FilterOptions;
  setOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  priceMin: number;
  priceMax: number;
};

export function ProductsSidebar({
  opened,
  toggle,
  options,
  setOptions,
  priceMin,
  priceMax,
}: Props) {
  return (
    <Stack gap="md" p="md">
      <Group justify="space-between" align="center">
        <Title order={4}>Sort & Filter</Title>
        <Burger hiddenFrom="sm" opened={opened} onClick={toggle} size="sm" />
      </Group>

      <Select
        label="Sort by"
        value={options.sort}
        onChange={(v) =>
          setOptions((prev) => ({
            ...prev,
            sort: (v as SortKey) ?? "featured",
          }))
        }
        data={SORT_OPTIONS}
      />

      <Switch
        label="Only available"
        checked={options.onlyAvailable}
        onChange={(event) => {
          const checked = event.currentTarget.checked;
          setOptions((prev) => ({ ...prev, onlyAvailable: checked }));
        }}
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
        onClick={() =>
          setOptions({
            sort: "featured",
            onlyAvailable: false,
            priceRange: [priceMin, priceMax],
          })
        }
      >
        Reset
      </Button>
    </Stack>
  );
}