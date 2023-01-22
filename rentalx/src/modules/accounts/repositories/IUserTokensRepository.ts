import { IUserTokensRepositoryDTO } from "../dtos";

export interface IUserTokensRepository {
  create(data: IUserTokensRepositoryDTO): Promise<void>;
}
