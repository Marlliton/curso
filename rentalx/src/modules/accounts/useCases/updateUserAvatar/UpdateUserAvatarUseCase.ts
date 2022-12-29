import { inject, injectable } from "tsyringe";
import { AppErros } from "../../../../errors/AppErros";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);

    user!.avatar = avatarFile
    await this.userRepository.create(user!);
  }
}
