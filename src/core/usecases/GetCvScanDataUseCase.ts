import { ICvScanRepository } from '../domain/repositories/ICvScanRepository';
import { CvCheckAnalysis, JobMatchDetail } from '../domain/models/cvScan';

export class GetCvScanDataUseCase {
  constructor(private readonly cvScanRepo: ICvScanRepository) {}

  async execute(): Promise<{
    analysis: CvCheckAnalysis;
    jobMatches: JobMatchDetail[];
  }> {
    const [analysis, jobMatches] = await Promise.all([
      this.cvScanRepo.analyzeCv(),
      this.cvScanRepo.getJobMatches(),
    ]);

    return {
      analysis,
      jobMatches,
    };
  }
}
