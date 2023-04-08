import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserRefreshTokensUseCase } from "./UserRefreshTokensUseCase";

export class UserRefreshTokensController {
  async handle(req: Request, res: Response): Promise<Response> {
    const refreshToken = req.body.token || req.headers["x-access-token"] || req.query.token;

    const refreshTokenUseCase = container.resolve(UserRefreshTokensUseCase);
    const newRefreshToken = await refreshTokenUseCase.execute(refreshToken);

    return res.json(newRefreshToken);
  }
}
