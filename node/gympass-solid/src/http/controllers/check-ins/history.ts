import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeFetchCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-use-case";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInsHistoryQuerySchema.parse(request.query);

  const makeFetchCheckInsUseCase = makeFetchCheckInsHistoryUseCase();
  const { checkIns } = await makeFetchCheckInsUseCase.execute({
    page,
    userId: request.user.sub,
  });

  reply.status(201).send({ checkIns });
}
