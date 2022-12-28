import { inject, injectable } from "tsyringe";
import { IUserRepositoryDTO } from "../../dtos";
import { IUserRepository } from "../../repositories/IUserRepository";
import { hash } from "bcrypt";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ driver_license, email, name, password }: IUserRepositoryDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      driver_license,
      email,
      name,
      password: passwordHash,
    });
  }
}
    