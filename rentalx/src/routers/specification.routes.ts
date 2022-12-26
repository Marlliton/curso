import { Router } from "express";
import { CreateSpecificationsController } from "../modules/cars/useCases/createSpecification/CreateSpecificationsController";
import { ListSpecificationsController } from "../modules/cars/useCases/listSpecification/ListSpecificationsController";

const specificationsRouter = Router();
const createSpecificationsController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRouter.post("/", createSpecificationsController.handle);

specificationsRouter.get("/", listSpecificationsController.handle);

export { specificationsRouter };
