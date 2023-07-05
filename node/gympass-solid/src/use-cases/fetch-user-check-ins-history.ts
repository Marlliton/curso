import { CheckIn } from "@prisma/client";

import { CheckInRepository } from "@/repositories/check-ins-repository";

interface FetchUserUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInRepository) {}
  async execute({
    userId,
    page,
  }: FetchUserUseCaseRequest): Promise<FetchUserUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(
      userId,
      page
    );

    return { checkIns };
  }
}
