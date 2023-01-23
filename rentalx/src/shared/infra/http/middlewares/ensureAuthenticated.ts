import auth from "@config/auth";
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository";
import { AppErros } from "@shared/errors/AppErros";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IReturnToken {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppErros("Missing token authorization.", 401);
  const [, token] = authHeader.split(" ");
  const userTokensRepository = new UserTokensRepository();

  try {
    const { sub: userId } = verify(token, auth.secretKeyRefreshToken) as IReturnToken;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(userId, token);

    if (!user) throw new AppErros("User does not exits.", 401);

    req.user = {
      id: userId,
    };
    next();
  } catch (err) {
    const msg = err instanceof AppErros ? err.message : "Internal Error";
    throw new AppErros(msg, 401);
  }
}
