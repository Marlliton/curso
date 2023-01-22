import { IUserTokensRepositoryDTO } from "@modules/accounts/dtos";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { appDataSource } from "@shared/infra/typeorm/dataSource";
import { Repository } from "typeorm";
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
}
