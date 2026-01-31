import { Avatar, Card, Group, Rating, Space, Text, Title } from "@mantine/core";
import type { Product } from "../../entities/Product";

export const ProductReviews = ({
  reviews,
}: {
  reviews: Product["reviews"];
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={2}>Reviews</Title>
      <Space h="md" />
      {reviews.map((review, index) => (
        <Card key={index} shadow="sm" padding="sm" radius="md" withBorder>
          <Group>
            <Avatar src="" alt={review.reviewer.name} color="blue">
              {review.reviewer.name.charAt(0)}
            </Avatar>
            <div>
              <Text fw={700}>{review.reviewer.name}</Text>
              <Text size="sm" c="dimmed">
                {new Date(review.date).toLocaleDateString()}
              </Text>
            </div>
          </Group>
          <Space h="xs" />
          <Rating value={review.rating} fractions={2} readOnly />
          <Space h="xs" />
          <Text size="sm">{review.comment}</Text>
        </Card>
      ))}
    </Card>
  );
};
