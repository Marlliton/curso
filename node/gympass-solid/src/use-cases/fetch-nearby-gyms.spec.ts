import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory-repositories/in-memory-gyms-repository";

import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymRepository: InMemoryGymsRepository;
// SUT - System Under Teste (Sistema em teste) trata-se do ator que está sendo testado nesse caso a classe instanciada abaixo
let sut: FetchNearbyGymsUseCase;

describe("Fetch nearby gyms use case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -10.7488685,
      longitude: -37.8017486,
    });

    await gymRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -10.869052,
      longitude: -37.7151443,
    });

    const { gyms } = await sut.execute({
      userLatitude: -10.7488685,
      userLongitude: -37.8017486,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
