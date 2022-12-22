import { ListSpecificationUseCase } from "./ListSpecificationsUseCase";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";

const listSpecificationUseCase = new ListSpecificationUseCase(
  SpecificationsRepository.getInstance()
);
const listSpecificationsController = new ListSpecificationsController(listSpecificationUseCase);

export { listSpecificationsController };
