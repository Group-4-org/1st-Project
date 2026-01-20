import { useParams } from "@tanstack/react-router";
import { useGetProductById } from "../hooks/useGetProductById";
import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  RingProgress,
  SimpleGrid,
  Skeleton,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";

export function ProductDetail() {
  const { id } = useParams({
    from: "/product/$id",
  });
  const { product, isLoading } = useGetProductById(id);

  if (isLoading) {
    return (
      <Container my="md">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Skeleton height="400px" />
          <div>
            <Skeleton height={30} width="70%" mb="sm" />
            <Skeleton height={20} width="40%" mb="md" />
            <Skeleton height={80} mb="md" />
            <Skeleton height={40} width="50%" />
          </div>
        </SimpleGrid>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container my="md">
        <Text>Product not found</Text>
      </Container>
    );
  }

  return (
    <Container my="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Carousel withIndicators height={400}>
              {product.images.map((image, index) => (
                <Carousel.Slide key={index}>
                  <Image
                    src={image}
                    alt={`${product.name} - image ${index + 1}`}
                    fit="contain"
                    height={400}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Group justify="between">
              <Title order={1}>{product.name}</Title>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
            </Group>
            <Text c="dimmed" size="sm" mt="sm">
              {product.category}
            </Text>

            <Space h="md" />

            <Text size="lg" fw={700}>
              ${product.price}
            </Text>

            <Space h="md" />

            <Text size="sm">{product.description}</Text>

            <Space h="xl" />

            <Group>
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[
                  { value: (product.rating / 5) * 100, color: "blue" },
                ]}
                label={
                  <Text c="blue" fw={700} ta="center" size="xl">
                    {product.rating.toFixed(1)}
                  </Text>
                }
              />
              <div>
                <Text size="lg" fw={700}>
                  Rating
                </Text>
                <Text size="sm" c="dimmed">
                  Based on user reviews
                </Text>
              </div>
            </Group>

            <Space h="xl" />

            <Button color="blue" fullWidth mt="md" radius="md">
              Add to Cart
            </Button>
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  );
}
