import { Router } from "express";
import { createSpecificationsController } from "../modules/cars/useCases/createSpecification";
import { listSpecificationsController } from "../modules/cars/useCases/listSpecification";

const specificationsRouter = Router();

specificationsRouter.post("/", async (req, res) => {
  return createSpecificationsController.handle(req, res);
});

specificationsRouter.get("/", async (req, res) => {
  return listSpecificationsController.handle(req, res);
});

export { specificationsRouter };
