import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryImMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryImMemory: CarsRepositoryInMemory;

describe("Create Cars", () => {
  beforeEach(() => {
    carsRepositoryImMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryImMemory);
  });
  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      description: "description",
      fine_amount: 100,
      license_plate: "License",
    });
  });
});
