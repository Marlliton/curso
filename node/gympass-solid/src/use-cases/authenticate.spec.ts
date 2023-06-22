import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory-repositories/in-memory-users-repository";

import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
// SUT - System Under Teste (Sistema em teste) trata-se do ator que está sendo testado nesse caso a classe instanciada abaixo
let sut: AuthenticateUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate", async () => {
    const email = "marlliton@zmail.com";
    const password = "123456";

    await inMemoryUsersRepository.create({
      name: "marlliton",
      email,
      password_hash: await hash(password, 8),
    });
    const { user } = await sut.execute({
      email,
      password,
    });

    expect(user).toBeTruthy();
  });

  it("should not be able to authenticate with a wrong password", async () => {
    const email = "marlliton@zmail.com";
    const password = "123456";

    await inMemoryUsersRepository.create({
      name: "marlliton",
      email,
      password_hash: await hash("password", 8),
    });

    await expect(() =>
      sut.execute({
        email,
        password,
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    const email = "marlliton@zmail.com";
    const password = "123456";

    await expect(() =>
      sut.execute({
        email,
        password,
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
