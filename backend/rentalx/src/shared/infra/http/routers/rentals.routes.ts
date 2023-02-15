import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionCarController } from "@modules/rentals/useCases/devolutionCar/DevolutionCarController";
import { ListRentalsController } from "@modules/rentals/useCases/listRentals/ListRentalsController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRouters = Router();
const createRentalController = new CreateRentalController();
const devolutionController = new DevolutionCarController();
const listRentalsController = new ListRentalsController();

rentalsRouters.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRouters.post("/devolution/:id", ensureAuthenticated, devolutionController.handle);
rentalsRouters.get("/", ensureAuthenticated, listRentalsController.handle);

export { rentalsRouters };
 