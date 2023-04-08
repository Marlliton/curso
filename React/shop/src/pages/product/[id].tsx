import { useCart } from "@/hooks/useCart";
import { stripe } from "@/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { currencyBRL } from "@/utils/currencyFormatterBRL";

interface ProductProps {
  product: {
    id: string;
    description: string;
    image: string;
    name: string;
    price: number;
    priceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();
  const { addToCart, productHasExists } = useCart();

  if (isFallback) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image width={520} height={480} src={product.image} alt="" />
        </ImageContainer>

        <ProductDetails>
          <div>
            <h1>{product.name}</h1>
            <span>{currencyBRL.format(product.price)}</span>
            <p>{product.description}</p>
          </div>

          <button disabled={productHasExists(product)} onClick={() => addToCart(product)}>
            Adicionar a sacola
          </button>
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
        price: price.unit_amount! / 100,
        description: product.description,
        priceId: price.id,
      },
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
