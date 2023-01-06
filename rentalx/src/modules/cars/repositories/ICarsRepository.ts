import { ICarRepositoryDTO } from "../dtos";

export interface ICarsRepository {
  create(car: ICarRepositoryDTO): Promise<void>
}