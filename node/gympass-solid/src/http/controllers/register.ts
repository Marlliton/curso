import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { UserAlreadyExistisErro } from "@/use-cases/errors/user-already-existis-erro";
import { RegisterUseCase } from "@/use-cases/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(request.body);

  try {
    const userRepository = new PrismaUserRepository();
    await new RegisterUseCase(userRepository).execute({
      email,
      name,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistisErro) {
      return reply.status(409).send({ message: error.message });
    }

    return reply.status(500).send();
  }

  reply.status(201).send();
}
