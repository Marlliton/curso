import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRantalsDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { appDataSource } from "@shared/infra/typeorm/dataSource";
import { Repository } from "typeorm";
import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = appDataSource.getRepository(Rental);
  }

  async create({ carId, expectReturnDate, userId }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id: carId,
      expect_return_date: expectReturnDate,
      user_id: userId,
    });

    await this.repository.save(rental);

    return rental;
  }
  async findOpenRentalCar(carId: string): Promise<Rental | null> {
    const openByCar = await this.repository.findOneBy({ car_id: carId });
    return openByCar ?? null;
  }

  async findOpenRentalToUser(userId: string): Promise<Rental | null> {
    const openByUser = await this.repository.findOneBy({ user_id: userId });

    return openByUser ?? null
  }
}
