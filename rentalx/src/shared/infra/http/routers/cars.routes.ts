import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRouters = Router();
const createCarController = new CreateCarController();

carsRouters.post("/", ensureAuthenticated, createCarController.handle);

export { carsRouters };
