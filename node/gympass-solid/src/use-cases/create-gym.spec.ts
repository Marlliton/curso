import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory-repositories/in-memory-gyms-repository";

import { CreateGymRepository } from "./create-gym";
import { RegisterUseCase } from "./register";

let inMemoryGymRepository: InMemoryGymsRepository;
// SUT - System Under Teste (Sistema em teste) trata-se do ator que está sendo testado nesse caso a classe instanciada abaixo
let sut: CreateGymRepository;

describe("Register Use Case", () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymsRepository();
    sut = new CreateGymRepository(inMemoryGymRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -10.7488685,
      longitude: -37.8017486,
    });

    expect(user).toBeTruthy();
  });
});
