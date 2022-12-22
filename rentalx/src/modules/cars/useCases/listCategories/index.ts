import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { ListCategoriesController } from "./ListCategoriesController";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

const listCategoryUseCase = new ListCategoriesUseCase(CategoriesRepository.getInstance());
const listCategoriesController = new ListCategoriesController(listCategoryUseCase);

export { listCategoriesController };
