import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppErros } from "@shared/errors/AppErros";
import { IUserRepositoryDTO } from "@modules/accounts/dtos";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ driver_license, email, name, password }: IUserRepositoryDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email)
    if(userAlreadyExists) {
      throw new AppErros("User already existis.")
    }

    const passwordHash = await hash(password, 8);
    await this.userRepository.create({
      driver_license,
      email,
      name,
      password: passwordHash,
    }); 
  }
}
    