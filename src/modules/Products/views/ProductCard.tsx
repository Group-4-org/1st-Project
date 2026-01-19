import { Box, Button, Card, Grid, Group, Image, Stack, Text } from '@mantine/core';
import type { Product } from '../entities/Product';
import { useNavigate } from '@tanstack/react-router';

export default function ProductCard({ product }: { product: Product }) {
  const navigator = useNavigate();
  return (
    <Grid.Col
      key={product.id}
      span={{ base: 12, md: 4 }}
      onClick={() => navigator({ to: `/product/${product.id}` })}
    >
      <Card
        withBorder
        radius="md"
        style={{
          backgroundColor: '#343a46',
          borderColor: '#3f4551',
          padding: '0',
          boxShadow: '3px 2px 12px rgba(154, 154, 154, 0.204)',
        }}
      >
        <Box
          style={{
            position: 'relative',
            borderBottom: '1px solid #3f4551',
          }}
        >
          <Image src={product.image} h={166} fit="contain" />

          {product.isAvailable && (
            <Box
              style={{
                position: 'absolute',
                top: 15,
                right: 10,
                backgroundColor: '#00b517',
                color: '#fff',
                fontSize: 12,
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 10,
                zIndex: 10,
              }}
            >
              Available
            </Box>
          )}
        </Box>

        <Stack gap={6} p="md">
          <Group justify="space-between">
            <Text
              fw={500}
              c="#e3e8ec"
              style={{
                maxWidth: '70%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {product.name}
            </Text>

            <Text fw={600} fz="lg" c="#e3e8ec">
              ${product.price}
            </Text>
          </Group>

          <Text fz="sm" c="#8b96a5">
            {product.description}
          </Text>

          {product.hasDiscounts && (
            <Box
              style={{
                width: '100%',
                backgroundColor: 'rgba(255, 179, 0, 0.6)',
                color: '#000',
                fontWeight: 600,
                textAlign: 'center',
                padding: '4px 0',
                fontSize: 12,
                borderRadius: 4,
              }}
            >
              On Sale
            </Box>
          )}
        </Stack>

        <Group justify="flex-end" p="md">
          <Button
            size="sm"
            style={{
              backgroundColor: '#0D6EFD',
              color: '#e3e8ec',
              fontWeight: 600,
            }}
          >
            Order Now
          </Button>
        </Group>
      </Card>
    </Grid.Col>
  );
}
