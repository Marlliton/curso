import { Repository } from "typeorm";

import { ICarRepositoryDTO } from "@modules/cars/dtos";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { appDataSource } from "@shared/infra/typeorm/dataSource";
import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = appDataSource.getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICarRepositoryDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    return await this.repository.findOneBy({ license_plate });
  }

  async listAvailableCars(
    brand?: string | undefined,
    carName?: string | undefined,
    categoryId?: string | undefined
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("resultCarsQuery")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("resultCarsQuery.brand = :brand", { brand });
    }
    if (carName) {
      carsQuery.andWhere("resultCarsQuery.name = :carName", { carName });
    }
    if (categoryId) {
      carsQuery.andWhere("resultCarsQuery.category_id = :categoryId", { categoryId });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }
}
