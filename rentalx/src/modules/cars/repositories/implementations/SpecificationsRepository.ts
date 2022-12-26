import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];
  private static INSTANCE: SpecificationsRepository;

  constructor() {
    this.specifications = [];
  }

  create({ description, name }: ICreateSpecificationDTO): void {
    const specification = new Specification();
    Object.assign(specification, {
      description,
      name,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }
  findByName(name: string): Specification | null {
    const specification = this.specifications.find(specification => specification.name === name);
    return specification ?? null;
  }

  list(): Specification[] {
    return this.specifications;
  }
}
