import { Repository } from "typeorm";
import { appDataSource } from "../../../../database/dataSource";
import { IUserRepositoryDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
  }: IUserRepositoryDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.repository.save(user);
  }
}
