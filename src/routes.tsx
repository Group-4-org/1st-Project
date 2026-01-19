import { createRootRoute, createRoute, Navigate } from '@tanstack/react-router';
import Layout from './Component/Layout';
import { Products } from './modules/Products/views/ProductsPage';
import { ProductDetail } from './modules/Products/views/ProductDetail';

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: () => <Navigate to="/" />,
});

export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Products,
});

export const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/product',
  component: ProductDetail,
});

export const routeTree = rootRoute.addChildren([productsRoute, productRoute]);
