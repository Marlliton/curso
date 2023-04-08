import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImageRepository } from "../ICarsImageRepository";

export class CarsImageRepositoryInMemory implements ICarsImageRepository {
  private carsImages: CarImage[] = [];

  async create(carId: string, imageName: string): Promise<CarImage> {
    const carImage = new CarImage();
    Object.assign(carImage, { carId, imageName });
    this.carsImages.push(carImage);

    return carImage;
  }
}
