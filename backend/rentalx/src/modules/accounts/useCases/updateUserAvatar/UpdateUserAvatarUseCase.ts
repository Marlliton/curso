import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { deleteFile } from "@utils/file";

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

    if (user?.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }
    user!.avatar = avatarFile;

    await this.userRepository.update(user!);
  }
}
