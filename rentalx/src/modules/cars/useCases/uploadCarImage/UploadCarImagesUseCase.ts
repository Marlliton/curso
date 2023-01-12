import { inject, injectable } from "tsyringe";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { AppErros } from "@shared/errors/AppErros";

interface IRequest {
  carId: string;
  imagesName: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: ICarsImageRepository
  ) {}
  async execute({ carId, imagesName }: IRequest): Promise<void> {
    if (!carId || !imagesName) throw new AppErros("Invalid data to create a image cars");

    imagesName.map(async image => await this.carsImageRepository.create(carId, image));
  }
}
