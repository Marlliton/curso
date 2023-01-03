import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";
import { verify } from "jsonwebtoken";
import { AppErros } from "@errors/AppErros";
import { UserRepository } from "@modules/accounts/repositories/implementations/UserRepository";

interface IReturnToken {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppErros("Missing token authorization.", 401);
  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(
      token,
      "$2b$08$aqcN7mgFJm7nLVDNM5hYde0CEd.KZsJNkY7LrGpUrSmkDwNJdgmJC"
    ) as IReturnToken;
    const userRepository = new UserRepository();
    const user = await userRepository.findById(userId);

    if (!user) throw new AppErros("User does not exits.", 401);

    req.user = {
      id: userId,
    };
    next();
  } catch(err) {
    const msg = err instanceof AppErros ? err.message : "Internal Error";
    throw new AppErros(msg, 401);
  }
}
