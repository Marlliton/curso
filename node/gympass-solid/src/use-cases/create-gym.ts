import { Gym, User } from "@prisma/client";
import { hash } from "bcryptjs";

import { GymsRepository } from "@/repositories/gyms-repository";
import { UsersRepository } from "@/repositories/users-repository";

import { UserAlreadyExistisErro } from "./errors/user-already-existis-error";

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

export class CreateGymRepository {
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
