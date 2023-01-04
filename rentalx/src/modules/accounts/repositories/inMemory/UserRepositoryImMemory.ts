import { IUserRepositoryDTO } from "../../dtos";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepositoryImMemory implements IUserRepository {
  users: User[] = [];

  async create({ driver_license, email, name, password }: IUserRepositoryDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) ?? null;
  }
  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) ?? null;
  }
  async update(user: User): Promise<User | null> {
    const u = this.users.find(user => user.id === user.id);
    Object.assign(u!, {
      ...u,
      ...user,
    });

    return u ?? null;
  }
}
