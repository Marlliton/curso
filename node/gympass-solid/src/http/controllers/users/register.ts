import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { UserAlreadyExistisErro } from "@/use-cases/errors/user-already-existis-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({
      email,
      name,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistisErro) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  reply.status(201).send();
}
