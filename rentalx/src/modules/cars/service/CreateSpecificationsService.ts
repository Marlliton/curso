import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationsService {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ description, name }: IRequest) {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name);
    if (specificationAlreadyExists) throw new Error("Specification Already Exists.");

    this.specificationsRepository.create({ description, name });
  }
}
