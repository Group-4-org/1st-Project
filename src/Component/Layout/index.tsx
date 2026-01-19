import { Outlet } from '@tanstack/react-router';
import Header from './header';
import Footer from './footer';
import { Box } from '@mantine/core';

export default function Layout() {
  return (
    <Box
      style={{
        backgroundColor: '#23272f',
        minHeight: '100vh',
        width: '100vw',
      }}
      p={20}
    >
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
}
