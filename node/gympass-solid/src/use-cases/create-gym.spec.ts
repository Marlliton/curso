import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory-repositories/in-memory-gyms-repository";

import { CreateGymUseCase } from "./create-gym";

let gymRepository: InMemoryGymsRepository;
// SUT - System Under Teste (Sistema em teste) trata-se do ator que está sendo testado nesse caso a classe instanciada abaixo
let sut: CreateGymUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymRepository);
  });

  it("should be able to register", async () => {
    const { gym } = await sut.execute({
      title: "javascript gym",
      description: null,
      phone: null,
      latitude: -10.7488685,
      longitude: -37.8017486,
    });

    expect(gym).toBeTruthy();
  });
});
