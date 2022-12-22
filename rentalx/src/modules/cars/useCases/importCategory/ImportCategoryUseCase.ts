import { createReadStream, promises } from "node:fs";
import { parse } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategories {
  name: string;
  description: string;
}

export class ImportCategoryUseCase {
  constructor(private createCategories: ICategoriesRepository) {}

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

    categories.forEach(category => {
      const existsCategory = this.createCategories.findByName(category.name);
      if (!existsCategory) {
        this.createCategories.create({ name: category.name, description: category.description });
      }
    });
  }
}
