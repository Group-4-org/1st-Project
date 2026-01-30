import {
  Badge,
  ActionIcon,
  Card,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Button,
} from "@mantine/core";
import { FaTrash } from "react-icons/fa";
import type { Product } from "../entities/Product";
import { useDeleteProductById } from "../hooks/useDeleteProduct";
import { useNavigate } from "@tanstack/react-router";

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { mutate: deleteProduct, isPending } = useDeleteProductById();

  const isOnSale = product.discountPercentage > 10;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteProduct(product.id);
  };

  return (
    <Grid.Col span={{ base: 12, md: 4 }}>
      <Card
        withBorder
        radius="lg"
        shadow="sm"
        h={380} 
        display="flex"
        onClick={() =>
          navigate({ to: `/product/${product.id}`, state: { product } })
        }
        style={{
          flexDirection: "column",
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
        <Card.Section
          style={{
            backgroundColor: "#f8f9fa",
            padding: 12,
            position: "relative",
          }}
        >
          <Image
            src={product.image}
            h={170}
            fit="contain"
            alt={product.name}
          />

          {product.isAvailable && (
            <Badge
              color="green"
              variant="filled"
              size="sm"
              style={{ position: "absolute", top: 10, left: 10 }}
            >
              Available
            </Badge>
          )}

          {isOnSale && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left:0,
                background: "#dda925",
                color: "white",
                padding: "6px 48px",
                width:"100%",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1,
                boxShadow: "0 4px 10px rgba(146, 137, 137, 0.2)",
                textTransform: "uppercase",
                textAlign:"center"
              }}
            >
              SALE
            </div>
          )}

          <ActionIcon
            color="red"
            variant="light"
            size="sm"
            loading={isPending}
            onClick={handleDelete}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <FaTrash size={16} />
          </ActionIcon>
        </Card.Section>

        <Stack gap={8} mt="md" style={{ flex: 1 }}>
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

          {isOnSale && (
            <Text size="xs" c="dimmed">
              {product.discountPercentage}% off
            </Text>
          )}
        </Stack>

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
