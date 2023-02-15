import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { $Date } from "@shared/dates/$Date";
import { AppErros } from "@shared/errors/AppErros";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
  password: string;
  refreshToken: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("UserTokensRepository") private userTokensRepository: IUserTokensRepository,
    @inject("UserRepository") private usersRepository: IUserRepository
  ) {}

  async execute({ password, refreshToken }: IRequest): Promise<void> {
    if (!password || !refreshToken) throw new AppErros("Invalid arguments");
    const userToken = await this.userTokensRepository.findByRefreshToken(refreshToken);

    if (!userToken) throw new AppErros("Token invalid!");
    if ($Date.isPast(userToken.expired_date, $Date.create())) throw new AppErros("Expired token!"); // Se expire_date for já estiver no passado quer dizer que o token é inválido

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) throw new AppErros("User not found!");

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);
    await this.userTokensRepository.deleteById(userToken.id);

  }
}
