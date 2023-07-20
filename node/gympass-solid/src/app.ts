import fastify from "fastify";
import { ZodError } from "zod";

import fastifyJwt from "@fastify/jwt";

import { env } from "./env";
import { checkInsRoutes } from "./http/controllers/check-ins/routes";
import { gymsRoutes } from "./http/controllers/gyms/routes";
import { usersRoutes } from "./http/controllers/users/routes";

const app = fastify();

app.register(fastifyJwt, {
  secret: env.SECRET_KEY,
});
app.register(checkInsRoutes);
app.register(usersRoutes);
app.register(gymsRoutes);

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
