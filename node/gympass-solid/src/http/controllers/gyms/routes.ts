import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { verifyRole } from "@/http/middlewares/verify-role";

import { create } from "./create";
import { nearby } from "./nearby";
import { search } from "./search";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);

  app.post("/gyms", { onRequest: [verifyRole("ADMIN")] }, create);
}
