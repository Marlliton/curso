import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

export class CreateSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const createSpecificationUseCase = container.resolve(CreateSpecificationsUseCase);

    await createSpecificationUseCase.execute({ name, description });
    return res.status(201).send();
  }
}
