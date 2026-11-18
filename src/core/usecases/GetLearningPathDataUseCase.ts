import { ILearningPathRepository } from '../domain/repositories/ILearningPathRepository';
import { LearningPathTrack, LearningReview } from '../domain/models/learningPath';

export class GetLearningPathDataUseCase {
  constructor(private readonly learningPathRepo: ILearningPathRepository) {}

  async execute(selectedRoleId?: string): Promise<{
    categories: string[];
    track: LearningPathTrack;
    reviews: LearningReview[];
  }> {
    const [categories, track, reviews] = await Promise.all([
      this.learningPathRepo.getCategories(),
      this.learningPathRepo.getLearningPathTrack(selectedRoleId),
      this.learningPathRepo.getStudentReviews(),
    ]);

    return {
      categories,
      track,
      reviews,
    };
  }
}
