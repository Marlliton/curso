import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ description, name }: IRequest): void {
    const categoryAlreadyExistis = this.categoriesRepository.findByName(name);
    if (categoryAlreadyExistis) throw new Error("Category Already Existis.");

    this.categoriesRepository.create({ name, description });
  }
}
