import Image from "next/image";
import { ProductContainer, ImageContainer, ProductDetails } from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

interface ProductProps {
  product: {
    id: string;
    description: string;
    image: string;
    name: string;
    price: string;
    priceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>loading...</p>;
  }

  async function handlePayProduct() {
    try {
      const response = await axios.post("/api/checkout", {
        priceId: product.priceId,
      });

      window.location.href = response.data;
    } catch (error) {}
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image width={520} height={480} src={product.image} alt="Camiseta" />
        </ImageContainer>

        <ProductDetails>
          <div>
            <h1>{product.name}</h1>
            <span>{product.price}</span>
            <p>{product.description}</p>
          </div>

          <button onClick={handlePayProduct}>Adicionar a sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_Ncjvc6M2Ht601M" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: productId,
        name: product.name,
        image: product.images[0],
        price: Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        description: product.description,
        priceId: price.id,
      },
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
