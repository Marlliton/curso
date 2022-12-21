import { Router } from "express";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

const categoryRouter = Router();

categoryRouter.post("/", async (req, res) => {
  return createCategoryController.handle(req, res);
});

categoryRouter.get("/", async (req, res) => {
  return listCategoriesController.handle(req, res);
});

export { categoryRouter };
