import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

import { SearchGymUseCase } from "../search-gyms";

export function makeSearchGymsUseCase() {
  const repository = new PrismaGymsRepository();

  return new SearchGymUseCase(repository);
}
