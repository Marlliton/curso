import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";

import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
  const userRepository = new PrismaUserRepository();

  return new RegisterUseCase(userRepository);
}
