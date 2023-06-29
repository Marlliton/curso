import { Gym } from "@prisma/client";

import { GymsRepository } from "../users-repository copy";

export class InMemoryGymsRepository implements GymsRepository {
  _items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this._items.find((gym) => gym.id === id);

    return gym ?? null;
  }
}
