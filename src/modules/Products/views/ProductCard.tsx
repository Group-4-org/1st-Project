import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Badge,
} from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import type { Product } from "../entities/Product";

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  return (
    <Grid.Col span={{ base: 12, md: 4 }}>
      <Card
        withBorder
        radius="lg"
        shadow="sm"
        onClick={() =>
          navigate({ to: `/product/${product.id}`, state: { product } })
        }
        style={{
          cursor: "pointer",
          transition: "all 0.25s ease",
        }}
        styles={{
          root: {
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            },
          },
        }}
      >
        {/* Image */}
        <Card.Section
          style={{
            backgroundColor: "#f8f9fa",
            padding: 12,
            position: "relative",
          }}
        >
          <Image src={product.image} h={170} fit="contain" alt={product.name} />

          {product.isAvailable && (
            <Badge
              color="green"
              variant="filled"
              size="sm"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
              }}
            >
              Available
            </Badge>
          )}
        </Card.Section>

        {/* Content */}
        <Stack gap={8} mt="md">
          <Group justify="space-between" align="start">
            <Text fw={600} size="md" lineClamp={1}>
              {product.name}
            </Text>

            <Text fw={700} size="lg" c="blue">
              ${product.price}
            </Text>
          </Group>

          <Text size="sm" c="dimmed" lineClamp={2}>
            {product.description}
          </Text>

          {product.hasDiscounts && (
            <Badge color="yellow" variant="light" w="fit-content">
              On Sale
            </Badge>
          )}
        </Stack>

        {/* Action */}
        <Group justify="space-between" mt="md">
          <Text size="xs" c="dimmed">
            Click for details
          </Text>

          <Button size="sm" radius="md">
            Order Now
          </Button>
        </Group>
      </Card>
    </Grid.Col>
  );
}
