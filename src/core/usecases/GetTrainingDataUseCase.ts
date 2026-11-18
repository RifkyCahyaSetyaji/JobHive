import { ITrainingRepository } from '../domain/repositories/ITrainingRepository';
import { TrainingModule, InterviewResult, InterviewPracticeConfig } from '../domain/models/training';

export class GetTrainingDataUseCase {
  constructor(private readonly trainingRepo: ITrainingRepository) {}

  async execute(): Promise<{
    modules: TrainingModule[];
    latestResult: InterviewResult;
    defaultConfig: InterviewPracticeConfig;
  }> {
    const [modules, latestResult, defaultConfig] = await Promise.all([
      this.trainingRepo.getTrainingModules(),
      this.trainingRepo.getLatestInterviewResult(),
      this.trainingRepo.getSavedInterviewConfig(),
    ]);

    return {
      modules,
      latestResult,
      defaultConfig,
    };
  }
}
