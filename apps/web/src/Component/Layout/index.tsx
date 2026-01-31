import { Outlet } from '@tanstack/react-router';
import Header from './header';
import Footer from './footer';
import { Box } from '@mantine/core';
import { useFeatureFlags } from '../../modules/Products/featureFlag';

export default function Layout() {
  const { isMainLayourNewUI } = useFeatureFlags();
  if (isMainLayourNewUI) {
    return (
      <Box
        style={{
          minHeight: '100vh',
          width: '100%',
        }}
        p={20}
      >
        <Header />
        <Outlet />
        <Footer />
      </Box>
    );
  } else {
    return (
      <Box
        style={{
          minHeight: '100vh',
          width: '100%',
        }}
        p={20}
      >
        <Outlet />
        <Footer />
      </Box>
    );
  }
}
