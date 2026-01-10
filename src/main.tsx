import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MantineProvider } from "@mantine/core";
import { ProductsProvider } from "./modules/Products/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <ProductsProvider value="Products">
        <App />
      </ProductsProvider>
    </MantineProvider>
  </StrictMode>
);
