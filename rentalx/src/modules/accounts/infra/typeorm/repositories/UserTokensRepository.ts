import { IUserTokensRepositoryDTO } from "@modules/accounts/dtos";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { appDataSource } from "@shared/infra/typeorm/dataSource";
import { Repository } from "typeorm";
import { User } from "../entities/User";
import { UserTokens } from "../entities/UserTokens";

export class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = appDataSource.getRepository(UserTokens);
  }

  async create({ expired_date, refresh_token, user_id }: IUserTokensRepositoryDTO): Promise<void> {
    const refreshToken = this.repository.create({
      expired_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(refreshToken);
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens | null> {
    const userTokens = await this.repository.findOneBy({
      user_id: userId,
      refresh_token: refreshToken,
    });

    return userTokens ?? null;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async findByRefreshToken(token: string): Promise<UserTokens | null> {
    return await this.repository.findOneBy({ refresh_token: token });
  }
}
