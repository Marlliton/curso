import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppErros } from "@shared/errors/AppErros";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

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
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppErros("Email or password incorrect.");
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppErros("Email or password incorrect.");

    const token = sign({}, "$2b$08$aqcN7mgFJm7nLVDNM5hYde0CEd.KZsJNkY7LrGpUrSmkDwNJdgmJC", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };

    return tokenReturn;
  }
}
