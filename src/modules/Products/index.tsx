import { createContext, useContext, type PropsWithChildren } from "react";

const ProductsContext = createContext<string | null>(null);

type ProductsProviderProps = PropsWithChildren<{
  value: string;
}>;

export const ProductsProvider = ({
  value,
  children,
}: ProductsProviderProps) => {
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () =>{
    const context = useContext(ProductsContext);

    if(context == null){
        throw new Error("Context is null");
    }
    return context;
}
