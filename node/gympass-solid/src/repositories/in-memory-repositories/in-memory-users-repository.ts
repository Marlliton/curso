import { User, Prisma } from "@prisma/client";

import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  private _items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this._items.find((user) => user.email === email);

    return user ?? null;
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: data?.id ?? Math.random().toString(),
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this._items.push(user);

    return user;
  }
}
