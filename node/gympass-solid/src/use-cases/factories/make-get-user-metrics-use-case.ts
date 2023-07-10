import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";

import { GetUserMetricsUseCase } from "../get-user-metrics";

export function makeGetUserMetricsUseCase() {
  const repository = new PrismaCheckInRepository();

  return new GetUserMetricsUseCase(repository);
}
