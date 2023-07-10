import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

import { CheckInUseCase } from "../check-in";

export function makeCheckInUseCase() {
  const chekcInRepository = new PrismaCheckInRepository();
  const gymRepository = new PrismaGymsRepository();

  return new CheckInUseCase(chekcInRepository, gymRepository);
}
