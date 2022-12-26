import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const listCategoryUseCase = new ListCategoriesUseCase(new CategoriesRepository());
const listCategoriesController = new ListCategoriesController(listCategoryUseCase);

export { listCategoriesController };