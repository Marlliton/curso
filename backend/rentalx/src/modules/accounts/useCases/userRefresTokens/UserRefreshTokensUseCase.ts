import auth from "@config/auth";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { $Date } from "@shared/dates/$Date";
import { AppErros } from "@shared/errors/AppErros";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IDecode {
  sub: string;
  email: string;
}

@injectable()
export class UserRefreshTokensUseCase {
  constructor(
    @inject("UserTokensRepository") private userTokensRepository: IUserTokensRepository
  ) {}

  async execute(refreshToken: string): Promise<string> {
    const { email, sub } = verify(refreshToken, auth.secretKeyRefreshToken) as IDecode;
    const userId = sub;

    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken(
      userId,
      refreshToken
    );

    if (!userToken) {
      throw new AppErros("Refresh token doesn't existis.");
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const newRefreshToken = sign({ email }, auth.secretKeyRefreshToken, {
      subject: userId,
      expiresIn: auth.RefreshTokenExpiresIn,
    });

    await this.userTokensRepository.create({
      user_id: userId,
      expired_date: $Date.addDays(new Date(), auth.daysToExpiresRefreshToken),
      refresh_token: newRefreshToken,
    });

    return newRefreshToken;
  }
}
