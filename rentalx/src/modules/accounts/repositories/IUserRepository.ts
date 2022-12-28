import { IUserRepositoryDTO } from "../dtos";
import { User } from "../entities/User";

export interface IUserRepository {
  create(data: IUserRepositoryDTO): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
