import { Repository } from "typeorm";
import { appDataSource } from "@shared/infra/typeorm/dataSource";
import { IUserRepositoryDTO } from "@modules/accounts/dtos";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }

  async update(user: User): Promise<User | null> {
    await this.repository
      .createQueryBuilder()
      .update(user)
      .set({
        avatar: user.avatar,
      })
      .where("id = :id", { id: user.id })
      .execute();
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });

    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });
    return user ?? null;
  }

  async create({ name, email, password, driver_license, id }: IUserRepositoryDTO): Promise<void> {
    console.log("🚀 ~ file: UserRepository.ts:38 ~ UserRepository ~ create ~ password", password)
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      id,
    });

    await this.repository.save(user);
  }
}
