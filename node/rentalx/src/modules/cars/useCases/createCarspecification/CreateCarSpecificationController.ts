import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId } = req.params;
    const { specificationsId } = req.body;
    const createSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

    const car = await createSpecificationUseCase.execute({ carId, specificationsId });

    return res.json(car);
  }
}
