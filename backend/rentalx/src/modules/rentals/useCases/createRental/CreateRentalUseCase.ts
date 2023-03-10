import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { $Date } from "@shared/dates/$Date";
import { AppErros } from "@shared/errors/AppErros";
import { inject, injectable } from "tsyringe";

interface IRequest {
  carId: string;
  userId: string;
  expectReturnDate: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository") private carsRepository: ICarsRepository
  ) {}

  async execute({ carId, expectReturnDate, userId }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalCar(carId);
    if (carUnavailable) throw new AppErros("Car isn't available.");
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalToUser(userId);
    if (rentalOpenToUser) {
      throw new AppErros("There's a rental in progress to this user.");
    }

    const minimumHoursToReturn = 24; // 24 horas
    if (
      $Date.diffInHours($Date.create(null), $Date.create(new Date(expectReturnDate))) < minimumHoursToReturn
    ) {
      throw new AppErros("Minimum hours to return is 24 hours");
    }

    await this.carsRepository.update({ id: carId, available: false });
    return await this.rentalsRepository.create({
      carId,
      expectReturnDate:
        expectReturnDate instanceof Date ? expectReturnDate : new Date(expectReturnDate),
      userId,
    });
  }
}
