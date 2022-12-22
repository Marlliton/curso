import { Request, Response } from "express";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";

export class CreateSpecificationsController {
  constructor(private createSpecificationUseCase: CreateSpecificationsUseCase) {}

  handle(req: Request, res: Response) {
    const { name, description } = req.body;

    this.createSpecificationUseCase.execute({ name, description });
    res.status(201).send();
  }
}
