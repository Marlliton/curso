import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";

const categoryRouter = Router();
const upload = multer({
  dest: "./tmp",
});
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();

categoryRouter.post("/", createCategoryController.handle);

categoryRouter.get("/", async (req, res) => {
  return listCategoriesController.handle(req, res);
});

categoryRouter.post("/import", upload.single("file"), importCategoryController.handle);

export { categoryRouter };
