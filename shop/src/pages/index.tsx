import { Carousel } from "@/components/Carousel";
import { ShoppingCartBag } from "@/components/shoppingCartBag";
import { stripe } from "@/lib/stripe";
import { HomeContainer, Product } from "@/styles/pages/home";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    description: string;
    image: string;
    name: string;
    price: string;
  }[];
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Shop</title>
      </Head>

      <HomeContainer>
        <Carousel perPage={2}>
          {props.products.map((product) => {
            return (
              <Product href={`/product/${product.id}`} key={product.id} prefetch={false}>
                <Image width={520} height={480} src={product.image} alt="Camisa 01" />
                <footer>
                  <span>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </span>
                  <ShoppingCartBag />
                </footer>
              </Product>
            );
          })}
        </Carousel>
      </HomeContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      description: product.description,
      image: product.images[0] ?? "",
      name: product.name,
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount! / 100),
    };
  });

  return {
    props: {
      products,
    },
  };
};
