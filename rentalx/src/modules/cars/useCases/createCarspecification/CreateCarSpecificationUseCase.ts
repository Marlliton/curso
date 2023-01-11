import { inject, injectable } from "tsyringe";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppErros } from "@shared/errors/AppErros";

interface IRequest {
  carId: string;
  specificationsId: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ carId, specificationsId }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(carId);

    if (!carExists) throw new AppErros("Car isn't exists.");
    const specifications = await this.specificationsRepository.findByIds(specificationsId);
    carExists.specifications = [...specifications];

    const car = await this.carsRepository.update(carExists);
    return car;
  }
}
