import { MockJobRepository } from './repositories/MockJobRepository';
import { MockTrainingRepository } from './repositories/MockTrainingRepository';
import { MockLearningPathRepository } from './repositories/MockLearningPathRepository';
import { MockCvScanRepository } from './repositories/MockCvScanRepository';
import { GetHomeDataUseCase } from '@/core/usecases/GetHomeDataUseCase';
import { GetTrainingDataUseCase } from '@/core/usecases/GetTrainingDataUseCase';
import { GetLearningPathDataUseCase } from '@/core/usecases/GetLearningPathDataUseCase';
import { GetCvScanDataUseCase } from '@/core/usecases/GetCvScanDataUseCase';

// Singleton instances for dependency injection
const jobRepository = new MockJobRepository();
const trainingRepository = new MockTrainingRepository();
const learningPathRepository = new MockLearningPathRepository();
const cvScanRepository = new MockCvScanRepository();

export const container = {
  jobRepository,
  trainingRepository,
  learningPathRepository,
  cvScanRepository,
  getHomeDataUseCase: new GetHomeDataUseCase(jobRepository),
  getTrainingDataUseCase: new GetTrainingDataUseCase(trainingRepository),
  getLearningPathDataUseCase: new GetLearningPathDataUseCase(learningPathRepository),
  getCvScanDataUseCase: new GetCvScanDataUseCase(cvScanRepository),
};
