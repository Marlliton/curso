import { Rental } from "@modules/rentals/infra/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppErros } from "@shared/errors/AppErros";
import { diffInHours } from "@utils/date";
import { inject, injectable } from "tsyringe";

interface IRequest {
  carId: string;
  userId: string;
  expectReturnDate: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(@inject("RentalsRepository") private rentalsRepository: IRentalsRepository) {}
 
  async execute({ carId, expectReturnDate, userId }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalCar(carId);
    if (carUnavailable) throw new AppErros("Car isn't available.");
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalToUser(userId);
    if (rentalOpenToUser) {
      throw new AppErros("There's a rental in progress to this user.");
    }

    const minimumHoursToReturn = 24; // 24 horas
    if (diffInHours(new Date(), expectReturnDate) < minimumHoursToReturn) {
      throw new AppErros("Minimum hours to return is 24 hours");
    }

    return await this.rentalsRepository.create({ carId, expectReturnDate, userId });
  }
}
