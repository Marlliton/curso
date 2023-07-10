import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";

import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";

export function makeFetchCheckInsHistoryUseCase() {
  const repository = new PrismaCheckInRepository();

  return new FetchUserCheckInsHistoryUseCase(repository);
}
