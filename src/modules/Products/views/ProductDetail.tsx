import { useRouterState } from '@tanstack/react-router';
import type { Product } from '../entities/Product';

export function ProductDetail() {
  const stateProduct = useRouterState({
    select: (s) => (s.location.state as { product?: Product })?.product,
  });
  console.log(stateProduct);
  return <h1>{stateProduct?.name}</h1>;
}
