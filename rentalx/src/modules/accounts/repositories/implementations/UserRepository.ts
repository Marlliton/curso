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

  async create({ name, email, password, driver_license }: IUserRepositoryDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.repository.save(user);
  }
}
