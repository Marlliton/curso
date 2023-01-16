import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRantalsDTO";
import { Rental } from "@modules/rentals/infra/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({ carId, expectReturnDate, userId }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      car_id: carId,
      user_id: userId,
      expect_return_date: expectReturnDate,
      start_date: new Date(),
    });

    this.rentals.push(rental);
    return rental;
  }

  async findOpenRentalCar(carId: string): Promise<Rental | null> {
    return this.rentals.find(rental => rental.car_id === carId && !rental.end_date) ?? null;
  }
  async findOpenRentalToUser(userId: string): Promise<Rental | null> {
    return this.rentals.find(rental => rental.user_id === userId && !rental.end_date) ?? null;
  }
}
