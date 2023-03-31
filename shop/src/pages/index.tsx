import { Carousel } from "@/components/Carousel";
import { stripe } from "@/lib/stripe";
import { HomeContainer, Product } from "@/styles/pages/home";
import { GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    description: string;
    image: string;
    name: string;
    price: number;
  }[];
}

export default function Home(props: HomeProps) {
  return (
    <HomeContainer>
      <Carousel perPage={2}>
        {props.products.map((product) => {
          return (
            <Product href={`/product/${product.id}`} key={product.id}>
              <Image width={520} height={480} src={product.image} alt="Camisa 01" />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          );
        })}
      </Carousel>
    </HomeContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      description: product.description,
      image: product.images[0],
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
    revalidate: 60 * 60 * 3, // 3 horas
  };
};
