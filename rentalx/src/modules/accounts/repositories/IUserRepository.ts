import { IUserRepositoryDTO } from "../dtos";
import { User } from "../entities/User";

export type UpdateUser = Omit<
  IUserRepositoryDTO,
  keyof {
    name?: string;
    password?: string;
    email?: string;
    driver_license?: string;
    avatar?: string;
  }
>;
export interface IUserRepository {
  create(data: IUserRepositoryDTO): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, data: UpdateUser): Promise<User | null>;
}
