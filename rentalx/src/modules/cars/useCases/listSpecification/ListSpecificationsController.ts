import { Request, Response } from "express";
import { ListSpecificationUseCase } from "./ListSpecificationsUseCase";

export class ListSpecificationsController {
  constructor(private listSpecificationUseCase: ListSpecificationUseCase) {}

  handle(req: Request, res: Response): Response {
    const specifications = this.listSpecificationUseCase.execute();
    return res.status(201).json(specifications);
  }
}
