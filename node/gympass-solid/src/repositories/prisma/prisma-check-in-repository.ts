import { Prisma, CheckIn } from "@prisma/client";
import dayjs from "dayjs";

import { prisma } from "@/lib/prisma";

import { CheckInRepository } from "../check-ins-repository";

export class PrismaCheckInRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    return await prisma.checkIn.create({
      data,
    });
  }
  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    return await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });
  }
  async findById(id: string): Promise<CheckIn | null> {
    return await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });
  }
  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return await prisma.checkIn.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * 20,
    });
  }
  async countByUserId(userId: string): Promise<number> {
    return await prisma.checkIn.count({
      where: { user_id: userId },
    });
  }
  async save(data: CheckIn): Promise<CheckIn> {
    return await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
