import { currencyBRL } from "@/utils/currencyFormatterBRL";
import { ReactNode, createContext, useState } from "react";

interface Product {
  id: string;
  description: string;
  image: string;
  name: string;
  price: number;
  priceId: string;
}

interface CartContextProps {
  products: Product[];
  addToCart(product: Product): void;
  removeFromCart(id: string): void;
  getTotalPrice(): string;
  productHasExists(product: Product): boolean;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);

  function addToCart(product: Product): void {
    setProducts((state) => [...state, product]);
  }

  function removeFromCart(id: string): void {
    const newListProducts = products.filter((prod) => prod.id !== id);
    setProducts(newListProducts);
  }

  function getTotalPrice(): string {
    const total = products.reduce((total, prod) => {
      total += prod.price;
      return total;
    }, 0);
    return currencyBRL.format(total);
  }

  function productHasExists(product: Product) {
    return products.some((prod) => prod.id === product.id);
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addToCart,
        removeFromCart,
        getTotalPrice,
        productHasExists,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
