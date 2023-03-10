import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

export class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, { description, name });

    this.specifications.push(specification);
    return specification;
  }
  findByName(name: string): Promise<Specification | null> {
    throw new Error("Method not implemented.");
  }
  list(): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(specification => ids.includes(specification.id!));
  }
}
