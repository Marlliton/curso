import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { AppErros } from "@shared/errors/AppErros";
import { $Date } from "@shared/dates/$Date";
import { IMailProvider } from "@shared/container/providers/mailProvider/IMailProvider";

@injectable()
export class SendForgotPasswordEmailUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppErros("User not found.");
    }

    const token = uuidv4();
    await this.userTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expired_date: $Date.addHours(new Date(), 3),
    });

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      `Link para recuperação de senha: ${token}`
    );
  }
}
