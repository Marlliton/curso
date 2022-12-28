import { IUserRepositoryDTO } from "../dtos";

export interface IUserRepository {
  create(data: IUserRepositoryDTO): Promise<void>;
}
