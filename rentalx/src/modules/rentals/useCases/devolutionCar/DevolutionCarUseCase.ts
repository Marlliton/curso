import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppErros } from "@shared/errors/AppErros";
import { diffInDays } from "@utils/date";
import { inject, injectable } from "tsyringe";

interface IRequest {
  userId: string;
  id: string;
}

@injectable()
export class DevolutionCarUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ id, userId }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental?.car_id);

    if (!rental) throw new AppErros("Rental doesn't exists.");

    let daily = diffInDays(rental.start_date, new Date());
    if (daily <= 0) {
      daily = 1; // Minimum daily
    }
    const delay = diffInDays(new Date(), rental.expect_return_date);
    let total = 0;
    if (delay > 0) {
      const calculateFine = delay * car?.fine_amount!;
      total = calculateFine;
    }
    console.log(total, delay)

    total += car?.daily_rate! * daily;
    rental.end_date = new Date();
    rental.total = total;

    await this.rentalsRepository.create({
      carId: rental.car_id,
      expectReturnDate: rental.expect_return_date,
      userId: rental.user_id,
      end_date: rental.end_date,
      id: rental.id,
      total: rental.total,
    });
    await this.carsRepository.update({ id: car?.id, available: true });

    return rental;
  }
}
