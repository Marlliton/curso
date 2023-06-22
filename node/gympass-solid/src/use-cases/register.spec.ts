import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory-repositories/in-memory-users-repository";

import { UserAlreadyExistisErro } from "./errors/user-already-existis-error";
import { RegisterUseCase } from "./register";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUseCase.execute({
      email: "marlliton@zmail.com",
      name: "marlliton",
      password: "123456",
    });

    expect(user).toBeTruthy();
  });

  it("check if it works", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUseCase.execute({
      email: "marlliton@zmail.com",
      name: "marlliton",
      password: "123456",
    });

    const isPassowrdCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );
    expect(isPassowrdCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    // SUT - System Under Teste (Sistema em teste) trata-se do ator que está sendo testado nesse caso a classe instanciada abaixo
    const sut = new RegisterUseCase(inMemoryUsersRepository);
    const email = "marlliton@zmail.com";

    await sut.execute({
      email,
      name: "marlliton",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        email,
        name: "marlliton",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistisErro);
  });
});
