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
  beforeEach(() => {
    inMemoryCheckInRepository = new InMemoryCheckInRepository();
    inMemoryGymRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(inMemoryCheckInRepository, inMemoryGymRepository);

    vi.useFakeTimers();

    inMemoryGymRepository._items.push({
      id: "gym-01",
      description: "",
      phone: "",
      title: "",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      latitude: -10.7488685,
      longitude: -37.8017486,
    });

    expect(checkIn).toBeTruthy();
  });

  it("should not be able to check in twice on the same day", async () => {
    vi.setSystemTime(new Date(2002, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      latitude: -10.7488685,
      longitude: -37.8017486,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        latitude: -10.7488685,
        longitude: -37.8017486,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in diferente day", async () => {
    vi.setSystemTime(new Date(2002, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      latitude: -10.7488685,
      longitude: -37.8017486,
    });

    vi.setSystemTime(new Date(2002, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      latitude: -10.7488685,
      longitude: -37.8017486,
    });

    expect(checkIn).toBeTruthy();
  });
});
