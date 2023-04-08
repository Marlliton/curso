import { CarImage } from "../infra/typeorm/entities/CarImage";

export interface ICarsImageRepository {
  create(carId: string, imageName: string): Promise<CarImage>;
}
