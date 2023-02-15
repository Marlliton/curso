import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { AppErros } from "@shared/errors/AppErros";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
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

    expect(car).toHaveProperty("id");
  });

  it("Should not be possible to create an existing car", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car name",
        brand: "brand",
        category_id: "category",
        daily_rate: 100,
        description: "description",
        fine_amount: 100,
        license_plate: "License",
      });

      await createCarUseCase.execute({
        name: "Car name",
        brand: "brand",
        category_id: "category",
        daily_rate: 100,
        description: "description",
        fine_amount: 100,
        license_plate: "License",
      });
    }).rejects.toBeInstanceOf(AppErros);
  });

  it("Should be possible to rent a newly registered car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      description: "description",
      fine_amount: 100,
      license_plate: "AAA999",
    });

    expect(car.available).toBe(true);
  });
});
