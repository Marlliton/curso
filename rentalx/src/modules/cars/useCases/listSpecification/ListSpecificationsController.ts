import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationUseCase } from "./ListSpecificationsUseCase";

export class ListSpecificationsController {

  handle(req: Request, res: Response): Response {
    const listSpecificationUseCase = container.resolve(ListSpecificationUseCase)
    const specifications = listSpecificationUseCase.execute();
    return res.status(201).json(specifications);
  }
}
