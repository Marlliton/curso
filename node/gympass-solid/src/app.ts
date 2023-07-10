import fastify from "fastify";
import { ZodError } from "zod";

import { appRoutes } from "@/http/routes";
import fastifyJwt from "@fastify/jwt";

import { env } from "./env";

const app = fastify();

app.register(fastifyJwt, {
  secret: env.SECRET_KEY,
});
app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation Error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal Server Error." });
});

export { app };
