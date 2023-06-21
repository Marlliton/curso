import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistisErro } from "./errors/user-already-existis-erro";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private repository: UsersRepository) {}
  
  async execute({ email, name, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 8);
    const userWithSameEmail = await this.repository.findByEmail(email);
    if(userWithSameEmail) throw new UserAlreadyExistisErro();

    await this.repository.create({ email, name, password_hash });
  }

}