import { Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationsService } from "../modules/cars/service/CreateSpecificationsService";

const specificationsRouter = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRouter.post("/", async (req, res) => {
  const { name, description } = req.body;

  const createSpecificationsService = new CreateSpecificationsService(specificationsRepository);
  createSpecificationsService.execute({ name, description });
  return res.status(201).send();
});

specificationsRouter.get("/", async (req, res) => {
  const specifications = specificationsRepository.list(); 
  return res.status(201).json(specifications);
});

export { specificationsRouter };
