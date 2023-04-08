import type { AppProps } from "next/app";
import Image from "next/image";
import logo from "../assets/logo.svg";
import { globalStyles } from "../styles/global";
import { Container, Header } from "../styles/pages/app";
import { ShoppingCartBag } from "@/components/shoppingCartBag";
import { CartProvider } from "@/context/CartContext";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CartProvider>
        <Header>
          <Image src={logo} alt="" />
          <ShoppingCartBag showCounter />
        </Header>
        <Component {...pageProps} />
      </CartProvider>
    </Container>
  );
}
