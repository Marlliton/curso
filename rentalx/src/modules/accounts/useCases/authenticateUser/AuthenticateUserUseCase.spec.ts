import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUsecase";
import { IUserRepository } from "../../repositories/IUserRepository";
import { UserRepositoryImMemory } from "../../repositories/inMemory/UserRepositoryImMemory";
import { IUserRepositoryDTO } from "../../dtos";
import { AppErros } from "../../../../errors/AppErros";

let userRepositoryInMemory: IUserRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUseUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryImMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    createUseUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });
  it("Should be able to authenticate an user", async () => {
    const user: IUserRepositoryDTO = {
      driver_license: "0001111",
      email: "email@g.com",
      name: "marlliton souza",
      password: "123456",
    };
    await createUseUseCase.execute(user);
    const { token } = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(token).not.toBeNull();
  });

  it("Should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@gmail.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppErros);
  });

  it("Should not be to authenticate a user with incorrect password", () => {
    expect(async () => {
      const user: IUserRepositoryDTO = {
        driver_license: "999999",
        email: "teste@gmail.com",
        name: "usuário teste",
        password: "123456",
      };
      await createUseUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "teste",
      });
    }).rejects.toBeInstanceOf(AppErros);
  });
});
