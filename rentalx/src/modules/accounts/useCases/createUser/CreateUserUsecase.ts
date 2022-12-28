import { inject, injectable } from "tsyringe";
import { IUserRepositoryDTO } from "../../dtos";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ driver_license, email, name, password }: IUserRepositoryDTO): Promise<void> {
    await this.userRepository.create({
      driver_license,
      email,
      name,
      password,
    });
  }
}
    