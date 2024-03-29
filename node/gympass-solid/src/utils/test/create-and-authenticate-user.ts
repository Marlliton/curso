import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

import { prisma } from "@/lib/prisma";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false
) {
  await prisma.user.create({
    data: {
      email: "johndoe@example.com",
      name: "John Doe",
      password_hash: await hash("123456", 8),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const {
    body: { token },
  } = await request(app.server).post("/sessions").send({
    email: "johndoe@example.com",
    password: "123456",
  });

  return { token };
}
