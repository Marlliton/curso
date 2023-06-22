import { User } from "@prisma/client";
import { hash } from "bcryptjs";

import { UsersRepository } from "@/repositories/users-repository";

import { UserAlreadyExistisErro } from "./errors/user-already-existis-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 8);
    const userWithSameEmail = await this.userRepository.findByEmail(email);
    if (userWithSameEmail) throw new UserAlreadyExistisErro();

    const user = await this.userRepository.create({
      email,
      name,
      password_hash,
    });

    return { user };
  }
}
