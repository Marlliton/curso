import { appDataSource } from "../../../../database/dataSource";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default (): CreateCategoryController => {
  const createCategoryUseCase = new CreateCategoryUseCase(new CategoriesRepository(appDataSource));
  const createCategoryController = new CreateCategoryController(createCategoryUseCase);

  return createCategoryController;
};
