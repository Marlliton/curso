import { Rental } from "@modules/rentals/infra/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRentalsUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(useId: string): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUser(useId);

    return rentals;
  }
}
