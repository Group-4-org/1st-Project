import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routes';
import type { Product } from './modules/Products/entities/Product';

const router = createRouter({ routeTree, notFoundMode: 'root' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
  interface HistoryState {
    product?: Product;
  }
}
function App() {
  return <RouterProvider router={router} />;
}

export default App;
