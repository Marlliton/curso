import { Response } from "express";
import { Request } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    console.log(id);
    const avatarFile = req.file?.filename;
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ userId: id, avatarFile: avatarFile! });
    return res.status(204).send();
  }
}
