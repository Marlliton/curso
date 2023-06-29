import { CheckIn } from "@prisma/client";

import { CheckInRepository } from "@/repositories/check-ins-repository";
import { GymsRepository } from "@/repositories/users-repository copy";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckInUseCaseRequest {
  gymId: string;
  userId: string;
  latitude: number;
  longitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymRepository: GymsRepository
  ) {}
  async execute({
    gymId,
    userId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId);

    if (!gym) throw new ResourceNotFoundError();

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new Error("CheckIn on the same day");
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
