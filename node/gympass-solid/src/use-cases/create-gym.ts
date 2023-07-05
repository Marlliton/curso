import { Gym } from "@prisma/client";

import { GymsRepository } from "@/repositories/gyms-repository";

interface RegisterGymCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface RegisterGymCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: RegisterGymCaseRequest): Promise<RegisterGymCaseResponse> {
    const gym = await this.gymRepository.create({
      description,
      latitude,
      longitude,
      phone,
      title,
    });

    return { gym };
  }
}
