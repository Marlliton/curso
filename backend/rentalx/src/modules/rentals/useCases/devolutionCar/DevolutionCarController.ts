import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionCarUseCase } from "./DevolutionCarUseCase";

export class DevolutionCarController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { id: userId } = req.user;

    const devolutionCarUseCase = container.resolve(DevolutionCarUseCase);

    await devolutionCarUseCase.execute({
      id,
      userId,
    });

    return res.status(201).send();
  }
}
