import { DataSource, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor(dataSorce: DataSource) {
    this.repository = dataSorce.getRepository(Category);
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    return await this.repository.find();
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOneBy({
      name,
    });
    return category;
  }
}
