import { Repository } from "typeorm";
import { appDataSource } from "@shared/infra/typeorm/dataSource";
import { Specification } from "../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../../../repositories/ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;
  constructor() {
    this.repository = appDataSource.getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    return await this.repository.save(specification);
  }
  async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository.findOneBy({ name });
    return specification ?? null;
  }

  async list(): Promise<Specification[]> {
    return await this.repository.find();
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.list();
    return specifications.filter(specification => ids.includes(specification.id!)) ?? [];
  }
}
