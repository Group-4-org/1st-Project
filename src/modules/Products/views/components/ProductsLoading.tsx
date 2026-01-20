import { Box, Container, Group, Loader, Stack, Text } from "@mantine/core";

export function ProductsLoading() {
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
        <Stack gap="xl">
          <Group justify="center">
            <Loader size="md" />
            <Text c="dimmed" size="sm">
              Loading products…
            </Text>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}