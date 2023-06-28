import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";

import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUserRepository();

  return new AuthenticateUseCase(userRepository);
}
