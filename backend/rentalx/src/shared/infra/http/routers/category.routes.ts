import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoryRouter = Router();
const importUpload = multer(uploadConfig.upload("./tmp"));
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoryRouter.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoryRouter.get("/", listCategoriesController.handle);

categoryRouter.post(
  "/import",
  importUpload.single("file"),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);

export { categoryRouter };
