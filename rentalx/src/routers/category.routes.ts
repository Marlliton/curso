import { Router } from "express";
import multer from "multer";
import createCategoryController from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";

const categoryRouter = Router();
const upload = multer({
  dest: "./tmp",
});

categoryRouter.post("/", async (req, res) => {
  return createCategoryController().handle(req, res);
});

categoryRouter.get("/", async (req, res) => {
  return listCategoriesController.handle(req, res);
});

categoryRouter.post("/import", upload.single("file"), (req, res) => {
  return importCategoryController.handle(req, res);
});

export { categoryRouter };
