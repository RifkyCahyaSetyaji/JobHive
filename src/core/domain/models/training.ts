export interface InterviewPracticeConfig {
  videoEnabled: boolean;
  audioEnabled: boolean;
  selectedCamera: string;
  selectedMic: string;
  selectedSpeaker: string;
  inputVolume: number;
  outputVolume: number;
  backgroundBlur: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionCount: number;
  timeLimitMinutes: number;
  language: 'English' | 'Indonesian';
  fontSize: 'Small' | 'Medium' | 'Large';
}

export interface InterviewMetricScore {
  name: string;
  score: number;
  maxScore: number;
  icon?: string;
  description?: string;
}

export interface InterviewResult {
  id: string;
  candidateName: string;
  date: string;
  interviewType: string;
  roleTargeted: string;
  overallPerformance: string;
  areasForImprovement: string[];
  summaryNote: string;
  speakingScore: number;
  contentScore: number;
  readinessScore: number;
  detailedMetrics: InterviewMetricScore[];
}

export interface TrainingModule {
  id: string;
  title: string;
  category: 'interview' | 'speaking' | 'cv-scan' | 'learning-path';
  description: string;
  iconName: string;
  duration: string;
  badge?: string;
}
