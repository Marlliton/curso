import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

import { CheckInRepository } from "../check-ins-repository";

export class InMemoryCheckInRepository implements CheckInRepository {
  readonly _items: CheckIn[] = [];

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = this._items.find((checkIn) => {
      const isOnSameDay =
        dayjs(checkIn.created_at).isAfter(startOfTheDay) &&
        dayjs(checkIn.created_at).isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDay;
    });

    if (!checkIn) return null;

    return checkIn;
  }

  async findById(id: string): Promise<CheckIn | null> {
    return this._items.find((checkIn) => checkIn.id === id) ?? null;
  }

  async save(data: CheckIn): Promise<CheckIn> {
    const checkInIndex = this._items.findIndex((item) => item.id === data.id);

    if (checkInIndex >= 0) {
      this._items[checkInIndex] = data;
    }

    return data;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this._items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }
  async countByUserId(userId: string): Promise<number> {
    return this._items.filter((item) => item.user_id === userId).length;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: data?.id ?? randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this._items.push(checkIn);

    return checkIn;
  }
}
