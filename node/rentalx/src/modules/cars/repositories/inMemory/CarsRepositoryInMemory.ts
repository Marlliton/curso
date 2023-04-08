import { ICarRepositoryDTO } from "@modules/cars/dtos";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[];
  constructor() {
    this.cars = [];
  }

  async update({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
  }: ICarRepositoryDTO): Promise<Car> {
    const car = await this.findByLicensePlate(license_plate);
    Object.assign(car!, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
    });

    this.cars.push(car!);
    return car!;
  }

  async findById(carId?: string | undefined): Promise<Car | null> {
    return this.cars.find(car => car.id === carId) ?? null;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    return this.cars.find(car => car.license_plate === license_plate) ?? null;
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
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async listAvailableCars(brand?: string, carName?: string, categoryId?: string): Promise<Car[]> {
    const cars = this.cars.filter(car => car.available);

    return brand
      ? cars.filter(car => car.brand === brand)
      : carName
      ? cars.filter(car => car.name === carName)
      : categoryId
      ? cars.filter(car => car.category_id === categoryId)
      : cars;
  }
}
