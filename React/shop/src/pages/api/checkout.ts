// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return res.status(405).send("Method Not Allowed");

  const { products } = req.body;
  if (!products) return res.status(400).json({ error: "PriceID not found." });

  const successURL = `${process.env.NEXT_URL_APP}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelURL = `${process.env.NEXT_URL_APP}/`;
  const stripeSection = await stripe.checkout.sessions.create({
    success_url: successURL,
    cancel_url: cancelURL,
    mode: "payment",
    line_items: products.map((prod: any) => {
      return {
        price: prod.priceId,
        quantity: 1,
      };
    }),
  });

  return res.status(201).json(stripeSection.url);
}
