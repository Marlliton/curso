import { inject, injectable } from "tsyringe";
import { AppErros } from "../../../../errors/AppErros";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExistis = await this.categoriesRepository.findByName(name);
    if (categoryAlreadyExistis) throw new AppErros("Category Already Existis.");

    await this.categoriesRepository.create({ name, description });
  }
}
