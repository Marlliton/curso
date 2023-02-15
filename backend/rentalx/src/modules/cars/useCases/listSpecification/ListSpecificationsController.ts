import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationUseCase } from "./ListSpecificationsUseCase";

export class ListSpecificationsController {

  async handle(req: Request, res: Response): Promise<Response> {
    const listSpecificationUseCase = container.resolve(ListSpecificationUseCase)
    const specifications = await listSpecificationUseCase.execute();
    return res.status(201).json(specifications);
  }
}
