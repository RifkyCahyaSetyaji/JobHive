import { LearningPathTrack, LearningReview } from '../models/learningPath';

export interface ILearningPathRepository {
  getCategories(): Promise<string[]>;
  getLearningPathTrack(roleId?: string): Promise<LearningPathTrack>;
  getStudentReviews(): Promise<LearningReview[]>;
}
