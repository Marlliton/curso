import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory-repositories/in-memory-gyms-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory-repositories/in-memory-users-repository";

import { CreateGymUseCase } from "./create-gym";
import { RegisterUseCase } from "./register";
import { SearchGymUseCase } from "./search-gyms";

let gymRepository: InMemoryGymsRepository;
// SUT - System Under Teste (Sistema em teste) trata-se do ator que está sendo testado nesse caso a classe instanciada abaixo
let sut: SearchGymUseCase;

describe("Search Gyms use case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymRepository);
  });

  it("should be able to search gyms by title", async () => {
    await gymRepository.create({
      title: "javascript gym",
      description: null,
      phone: null,
      latitude: -10.7488685,
      longitude: -37.8017486,
    });

    await gymRepository.create({
      title: "typescript gym",
      description: null,
      phone: null,
      latitude: -10.7488685,
      longitude: -37.8017486,
    });

    const { gyms } = await sut.execute({ query: "javascript", page: 1 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "javascript gym" }),
    ]);
  });

  it("should be able to paginated search gyms", async () => {
    await Promise.all(
      Array.from({ length: 22 }).map((_, i) =>
        gymRepository.create({
          title: `javascript gym-${i + 1}`,
          description: null,
          phone: null,
          latitude: -10.7488685,
          longitude: -37.8017486,
        })
      )
    );

    await gymRepository.create({
      title: "typescript gym",
      description: null,
      phone: null,
      latitude: -10.7488685,
      longitude: -37.8017486,
    });

    const { gyms } = await sut.execute({ query: "javascript", page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "javascript gym-21" }),
      expect.objectContaining({ title: "javascript gym-22" }),
    ]);
  });
});
