import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";

import { ValidateCheckInUseCase } from "../validate-check-in";

export function makeValidateCheckInUseCase() {
  const repository = new PrismaCheckInRepository();

  return new ValidateCheckInUseCase(repository);
}
