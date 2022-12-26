import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
export class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}

  execute(): Specification[] {
    const specifications = this.specificationRepository.list();
    return specifications ?? [];
  }
}
