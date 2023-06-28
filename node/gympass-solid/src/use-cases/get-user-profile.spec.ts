import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory-repositories/in-memory-users-repository";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUserProfileUseCase } from "./get-user-profile";

let inMemoryUsersRepository: InMemoryUsersRepository;
// SUT - System Under Teste (Sistema em teste) trata-se do ator que está sendo testado nesse caso a classe instanciada abaixo
let sut: GetUserProfileUseCase;

describe("Get user profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(inMemoryUsersRepository);
  });

  it("should be able to get user profile", async () => {
    const email = "marlliton@zmail.com";
    const password = "123456";

    const createdUser = await inMemoryUsersRepository.create({
      name: "marlliton",
      email,
      password_hash: await hash(password, 8),
    });
    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toBeTruthy();
  });

  it("should not be able to get user profile with a wrong ID", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-exists-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
