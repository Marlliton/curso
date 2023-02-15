import { ICarRepositoryDTO } from "../dtos";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
  create(car: ICarRepositoryDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | null>;
  listAvailableCars(brand?: string, carName?: string, categoryId?: string): Promise<Car[]>;
  findById(carId?: string): Promise<Car | null>;
  update(dados: ICarRepositoryDTO): Promise<Car>;
}
