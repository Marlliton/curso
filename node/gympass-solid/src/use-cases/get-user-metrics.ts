import { CheckInRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsCaseRequest {
  userId: string;
}

interface GetUserMetricsUseResponse {
  checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInRepository) {}
  async execute({
    userId,
  }: GetUserMetricsCaseRequest): Promise<GetUserMetricsUseResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
