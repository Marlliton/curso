import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  categoryId?: string;
  brand?: string;
  carName?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carRepository: ICarsRepository
  ) {}

  async execute({ brand, carName, categoryId }: IRequest): Promise<Car[]> {
    const cars = this.carRepository.listAvailableCars(brand, carName, categoryId);
    return cars;
  }
}
