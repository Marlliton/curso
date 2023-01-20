import { Console } from "console";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { carId, expectReturnDate } = req.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      carId,
      expectReturnDate,
      userId: id,
    });

    return res.status(201).json(rental);
  }
}
