import { Decimal } from "@prisma/client/runtime/library";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckInRepository } from "@/repositories/in-memory-repositories/in-memory-checkin-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory-repositories/in-memory-gyms-repository";

import { CheckInUseCase } from "./check-in";

let inMemoryCheckInRepository: InMemoryCheckInRepository;
let inMemoryGymRepository: InMemoryGymsRepository;
// SUT - System Under Teste (Sistema em teste) trata-se do ator que está sendo testado nesse caso a classe instanciada abaixo
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository();
    inMemoryGymRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(inMemoryCheckInRepository, inMemoryGymRepository);

    vi.useFakeTimers();

    await inMemoryGymRepository.create({
      id: "gym-01",
      description: "",
      phone: "",
      title: "",
      latitude: new Decimal(-10.7488685),
      longitude: new Decimal(-37.8017486),
    });
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -10.7488685,
      userLongitude: -37.8017486,
    });

    expect(checkIn).toBeTruthy();
  });

  it("should not be able to check in twice on the same day", async () => {
    vi.setSystemTime(new Date(2002, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -10.7488685,
      userLongitude: -37.8017486,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -10.7488685,
        userLongitude: -37.8017486,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in diferente day", async () => {
    vi.setSystemTime(new Date(2002, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -10.7488685,
      userLongitude: -37.8017486,
    });

    vi.setSystemTime(new Date(2002, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -10.7488685,
      userLongitude: -37.8017486,
    });

    expect(checkIn).toBeTruthy();
  });

  it("should not be able to check in on distant gym", async () => {
    await inMemoryGymRepository.create({
      id: "gym-02",
      description: "",
      phone: "",
      title: "",
      latitude: new Decimal(-10.6879357),
      longitude: new Decimal(-37.887771),
    });

    await expect(
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -10.7488685,
        userLongitude: -37.8017486,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
