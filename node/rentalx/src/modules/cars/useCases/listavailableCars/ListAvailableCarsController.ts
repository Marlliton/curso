import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

export class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, category_id } = req.query;
    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);

    const cars = await listAvailableCarsUseCase.execute({
      brand: brand as string,
      carName: name as string,
      categoryId: category_id as string,
    });

    return res.json(cars);
  }
}
