export interface LearningStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  hours: number;
  modulesCount: number;
  reviewsCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: string[];
}

export interface LearningPathTrack {
  id: string;
  roleName: string;
  category: string;
  description: string;
  curriculumSummary: string;
  steps: LearningStep[];
}

export interface LearningReview {
  id: string;
  authorName: string;
  company: string;
  courseTaken: string;
  comment: string;
  rating: number;
}
