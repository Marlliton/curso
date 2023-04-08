import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

export class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as IFiles[];

    const fileNames = images?.map(file => file.filename);
    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);
    await uploadCarImagesUseCase.execute({ carId: id, imagesName: fileNames });

    return res.status(201).send();
  }
}
