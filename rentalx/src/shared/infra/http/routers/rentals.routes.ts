import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRouters = Router();
const createRentalController = new CreateRentalController();

rentalsRouters.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalsRouters };