import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { appDataSource } from "@shared/infra/typeorm/dataSource";
import { Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";

export class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = appDataSource.getRepository(CarImage);
  }

  async create(carId: string, imageName: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id: carId,
      image_name: imageName,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}
