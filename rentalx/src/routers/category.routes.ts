import { Router } from "express";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/service/CreateCategoryService";

const categoryRouter = Router();
const categoriesRepository = new CategoriesRepository();

categoryRouter.post("/", async (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });
  return res.status(201).send();
});

categoryRouter.get("/", async (req, res) => {
  const categories = categoriesRepository.list();
  return res.status(201).json(categories);
});

export { categoryRouter };
 