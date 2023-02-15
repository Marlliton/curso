import { inject, injectable } from "tsyringe";
import { parse } from "csv-parse";
import { createReadStream, promises } from "node:fs";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IImportCategories {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private createCategories: ICategoriesRepository) {}

  private _loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategories[] = [];
      const stream = createReadStream(file.path);
      const parseFile = parse();

      stream.pipe(parseFile);
      parseFile
        .on("data", async line => {
          const [name, description] = await line;

          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", error => {
          reject(error);
        });
    }); 
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this._loadCategories(file);

    categories.forEach(async (category) => {
      const existsCategory = await this.createCategories.findByName(category.name);
      if (!existsCategory) {
        await this.createCategories.create({ name: category.name, description: category.description });
      }
    });
  }
}
