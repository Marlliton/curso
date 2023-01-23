import { IUserTokensRepositoryDTO } from "../dtos";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

export interface IUserTokensRepository {
  create(data: IUserTokensRepositoryDTO): Promise<void>;
  findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UserTokens | null>;
  deleteById(id: string): Promise<void>;
}
 