import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/inMemory/SpecificationsRepositoryInMemory";
import { AppErros } from "@shared/errors/AppErros";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;

describe("Create Specification Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepository
    );
  });
  it("Should not be able to add a specification for a non-existent car", async () => {
    expect(async () => {
      const carId = "1234";
      const specificationsId = ["2q345"];

      await createCarSpecificationUseCase.execute({ carId, specificationsId });
    }).rejects.toBeInstanceOf(AppErros);
  });

  it("Should be able to add create a specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car available",
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      description: "description",
      fine_amount: 100,
      license_plate: "AAA999",
    });

    const specification = await specificationsRepository.create({
      description: "test",
      name: "test",
    });

    const carWithSpecification = await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationsId: [specification.id!],
    });
    expect(carWithSpecification.specifications.length).toBeGreaterThan(0);
  });
});
