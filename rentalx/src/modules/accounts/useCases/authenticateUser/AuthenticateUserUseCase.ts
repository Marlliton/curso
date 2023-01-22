import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppErros } from "@shared/errors/AppErros";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import auth from "@config/auth";
import { $Date } from "@shared/dates/$Date";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const {
      secretKey,
      secretKeyRefreshToken,
      tokenExpiresIn,
      RefreshTokenExpiresIn,
      daysToExpiresRefreshToken,
    } = auth;
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppErros("Email or password incorrect.");
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppErros("Email or password incorrect.");

    const token = sign({}, secretKey, {
      subject: user.id,
      expiresIn: tokenExpiresIn,
    });

    const refreshToken = sign({ email }, secretKeyRefreshToken, {
      subject: user.id,
      expiresIn: RefreshTokenExpiresIn,
    });

    await this.userTokensRepository.create({
      refresh_token: refreshToken,
      user_id: user.id,
      expired_date: $Date.addDays(new Date(), daysToExpiresRefreshToken),
    });

    const tokenReturn: IResponse = {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
      refreshToken,
    };

    return tokenReturn;
  }
}
