import { InterviewPracticeConfig, InterviewResult, TrainingModule } from '../models/training';

export interface ITrainingRepository {
  getTrainingModules(): Promise<TrainingModule[]>;
  getLatestInterviewResult(candidateId?: string): Promise<InterviewResult>;
  saveInterviewConfig(config: Partial<InterviewPracticeConfig>): Promise<void>;
  getSavedInterviewConfig(): Promise<InterviewPracticeConfig>;
}
