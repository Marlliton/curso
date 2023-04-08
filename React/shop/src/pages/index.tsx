import { Carousel } from "@/components/carousel";
import { useCart } from "@/hooks/useCart";
import { stripe } from "@/lib/stripe";
import { HomeContainer, Product, ProductBag } from "@/styles/pages/home";
import { currencyBRL } from "@/utils/currencyFormatterBRL";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { ShoppingBag } from "phosphor-react";
import Stripe from "stripe";

type ProductProps = {
  id: string;
  description: string;
  image: string;
  name: string;
  price: number;
  priceId: string;
};
interface HomeProps {
  products: ProductProps[];
}

export default function Home(props: HomeProps) {
  const { addToCart, productHasExists } = useCart();
  function handleClick(event: any, product: ProductProps) {
    event.preventDefault();

    addToCart(product);
  }

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
                    <span>{currencyBRL.format(product.price)}</span>
                  </span>
                  <ProductBag
                    disabled={productHasExists(product)}
                    onClick={(event) => handleClick(event, product)}
                  >
                    <ShoppingBag size={24} />
                  </ProductBag>
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
      price: price.unit_amount! / 100,
      priceId: price.id,
    };
  });

  return {
    props: {
      products,
    },
  };
};
