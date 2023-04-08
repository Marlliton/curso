import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRantalsDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { appDataSource } from "@shared/infra/typeorm/dataSource";
import { IsNull, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = appDataSource.getRepository(Rental);
  }

  async create({
    carId,
    expectReturnDate,
    userId,
    end_date,
    id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id: carId,
      expect_return_date: expectReturnDate,
      user_id: userId,
      end_date: end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }
  async findOpenRentalCar(carId: string): Promise<Rental | null> {
    const openByCar = await this.repository.findOne({
      where: {
        car_id: carId,
        end_date: IsNull(),
      },
    });
    return openByCar ?? null;
  }

  async findOpenRentalToUser(userId: string): Promise<Rental | null> {
    const openByUser = await this.repository.findOne({
      where: {
        user_id: userId,
        end_date: IsNull(),
      },
    });

    return openByUser ?? null;
  }

  async findById(id: string): Promise<Rental | null> {
    const rental = await this.repository.findOneBy({ id });

    return rental ?? null;
  }

  async findByUser(id: string): Promise<Rental[]> {
    return await this.repository.find({
      where: {
        user_id: id,
      },
      relations: ["car"]
    });
  }
} 
