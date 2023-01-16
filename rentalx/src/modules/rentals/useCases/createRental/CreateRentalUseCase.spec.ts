import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsrepositoryInMemory";
import { AppErros } from "@shared/errors/AppErros";
import { addDays } from "@utils/date";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });
  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      carId: "1234",
      expectReturnDate: addDays(new Date(), 1
      ),
      userId: "1234",
    });

    expect(rental).toBeTruthy();
    expect(rental).toHaveProperty("start_date");
  });

  it("Shouldn't  be able to create a rental without a car unavailable", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        carId: "1234",
        expectReturnDate: new Date(),
        userId: "x",
      });
      await createRentalUseCase.execute({
        carId: "1234",
        expectReturnDate: new Date(),
        userId: "z",
      });
    }).rejects.toBeInstanceOf(AppErros);
  });

  it("Shouldn't  be able to create a rental if user has an open rent", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        carId: "222",
        expectReturnDate: new Date(),
        userId: "x",
      });
      await createRentalUseCase.execute({
        carId: "aaa",
        expectReturnDate: new Date(),
        userId: "x",
      });
    }).rejects.toBeInstanceOf(AppErros);
  });

  it("Shouldn't  be able to create a rental if expect return was less than 24 hours", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        carId: "aaa",
        expectReturnDate: new Date(),
        userId: "x",
      });
    }).rejects.toBeInstanceOf(AppErros);
  });

});
