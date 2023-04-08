import { Router } from "express";
import { CreateSpecificationsController } from "@modules/cars/useCases/createSpecification/CreateSpecificationsController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecification/ListSpecificationsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationsRouter = Router();
const createSpecificationsController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRouter.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationsController.handle
);

specificationsRouter.get(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  listSpecificationsController.handle
);

export { specificationsRouter };
