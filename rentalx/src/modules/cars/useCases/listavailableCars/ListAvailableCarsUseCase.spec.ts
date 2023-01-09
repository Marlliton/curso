import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryImMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryImMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryImMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryImMemory);
  });

  it("Should be able to list all cars available.", async () => {
    await carsRepositoryImMemory.create({
      name: "Corolla",
      description: "Sedan de luxo",
      daily_rate: 250,
      license_plate: "NRM-9090",
      fine_amount: 160,
      brand: "Toyota",
      category_id: "406f4268-dade-4dcc-8a54-1518afa682c7",
    });
    const cars = await listCarsUseCase.execute({});

    expect(cars.length).toBeGreaterThan(0);
  });

  it("Should be able to list all cars available by name", async () => {
    await carsRepositoryImMemory.create({
      name: "Corolla",
      description: "Sedan de luxo",
      daily_rate: 250,
      license_plate: "NRM-9090",
      fine_amount: 160,
      brand: "Toyota",
      category_id: "406f4268-dade-4dcc-8a54-1518afa682c7",
    });
    const vectra = await carsRepositoryImMemory.create({
      name: "Vectra",
      description: "Sedan",
      daily_rate: 70,
      license_plate: "NRM-9090",
      fine_amount: 10,
      brand: "Chevrolet",
      category_id: "406f4268-dade-4dcc-8a54-1518afa682c7",
    });
    const cars = await listCarsUseCase.execute({
      carName: "Vectra",
    });

    expect(cars).toEqual([vectra]);
  });

  it("Should be able to list all cars available by category id", async () => {
    await carsRepositoryImMemory.create({
      name: "Corolla",
      description: "Sedan de luxo",
      daily_rate: 250,
      license_plate: "NRM-9090",
      fine_amount: 160,
      brand: "Toyota",
      category_id: "406f4268",
    });
    const carByCategory = await carsRepositoryImMemory.create({
      name: "Vectra",
      description: "Sedan",
      daily_rate: 70,
      license_plate: "NRM-9090",
      fine_amount: 10,
      brand: "Chevrolet",
      category_id: "406f4268-dade-4dcc-8a54-1518afa682c7",
    });
    const cars = await listCarsUseCase.execute({
      categoryId: "406f4268-dade-4dcc-8a54-1518afa682c7"
    });

    expect(cars).toEqual([carByCategory]);
  });

  it("Should be able to list all cars available by brand", async () => {
    await carsRepositoryImMemory.create({
      name: "Corolla",
      description: "Sedan de luxo",
      daily_rate: 250,
      license_plate: "NRM-9090",
      fine_amount: 160,
      brand: "Toyota",
      category_id: "406f4268",
    });
    const carByBrand = await carsRepositoryImMemory.create({
      name: "Vectra",
      description: "Sedan",
      daily_rate: 70,
      license_plate: "NRM-9090",
      fine_amount: 10,
      brand: "Chevrolet",
      category_id: "406f4268-dade-4dcc-8a54-1518afa682c7",
    });
    const cars = await listCarsUseCase.execute({
      brand: "Chevrolet"
    });

    expect(cars).toEqual([carByBrand]);
  });
});
