import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );

    reply
      .setCookie("refreshToken", refreshToken, {
        path: "/", // Ao definir "/", todo nosso backend pode acessar o refresh token
        secure: true, // Faz com que a informação do token seja encriptada usando HTTPs (o front não consegue ter o token)
        sameSite: true, // O cookie só pode ser lido no mesmo domínio
        httpOnly: true, // O cookie só pode ser acessado pelo backend
      })
      .status(200)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
