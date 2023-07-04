import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  _items: Gym[] = [];

  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      description: data?.description ?? null,
      latitude: new Prisma.Decimal(String(data.latitude)),
      longitude: new Prisma.Decimal(String(data.longitude)),
      phone: data?.phone ?? null,
      title: data.title,
    };
    this._items.push(gym);

    return gym;
  }
  async findById(id: string): Promise<Gym | null> {
    const gym = this._items.find((gym) => gym.id === id);

    return gym ?? null;
  }
}
