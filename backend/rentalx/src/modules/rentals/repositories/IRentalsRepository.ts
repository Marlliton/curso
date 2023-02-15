import { ICreateRentalDTO } from "../dtos/ICreateRantalsDTO";
import { Rental } from "../infra/entities/Rental";

export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalCar(carId: string): Promise<Rental | null>;
  findOpenRentalToUser(userId: string): Promise<Rental | null>;
  findById(id: string): Promise<Rental | null>;
  findByUser(id: string): Promise<Rental[]>;
}
