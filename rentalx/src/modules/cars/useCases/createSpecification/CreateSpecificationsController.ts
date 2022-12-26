import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

export class CreateSpecificationsController {
  handle(req: Request, res: Response) {
    const { name, description } = req.body;
    const createSpecificationUseCase = container.resolve(CreateSpecificationsUseCase);

    createSpecificationUseCase.execute({ name, description });
    res.status(201).send();
  }
}
