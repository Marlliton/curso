import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { ListCategoriesController } from "./ListCategoriesController";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { appDataSource } from "../../../../database/dataSource";

const listCategoryUseCase = new ListCategoriesUseCase(new CategoriesRepository(appDataSource));
const listCategoriesController = new ListCategoriesController(listCategoryUseCase);

export { listCategoriesController };
