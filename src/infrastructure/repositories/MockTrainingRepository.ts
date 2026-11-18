import { ITrainingRepository } from '@/core/domain/repositories/ITrainingRepository';
import { TrainingModule, InterviewResult, InterviewPracticeConfig } from '@/core/domain/models/training';

export class MockTrainingRepository implements ITrainingRepository {
  private config: InterviewPracticeConfig = {
    videoEnabled: true,
    audioEnabled: true,
    selectedCamera: 'FaceTime HD Camera (Built-in)',
    selectedMic: 'Built-in Microphone',
    selectedSpeaker: 'Built-in Output Speakers',
    inputVolume: 80,
    outputVolume: 75,
    backgroundBlur: false,
    difficulty: 'Easy',
    questionCount: 5,
    timeLimitMinutes: 10,
    language: 'English',
    fontSize: 'Medium',
  };

  async getTrainingModules(): Promise<TrainingModule[]> {
    return [
      {
        id: 'mod-1',
        title: 'Behavioral Interview Simulation',
        category: 'interview',
        description: 'Practice the STAR method with AI feedback on communication and clarity.',
        iconName: 'MessageSquare',
        duration: '15 min',
        badge: 'Popular',
      },
      {
        id: 'mod-2',
        title: 'Technical Frontend Screening',
        category: 'interview',
        description: 'Test your technical depth in React, Next.js, and Modern Web Architecture.',
        iconName: 'Code',
        duration: '25 min',
      },
      {
        id: 'mod-3',
        title: 'Speaking & Pronunciation Polish',
        category: 'speaking',
        description: 'Refine vocal confidence, speech pacing, and eliminate conversational filler words.',
        iconName: 'Mic',
        duration: '10 min',
      },
      {
        id: 'mod-4',
        title: 'CV Optimization & ATS Score',
        category: 'cv-scan',
        description: 'Automated scan of keywords, achievements formatting, and role alignment.',
        iconName: 'FileText',
        duration: '5 min',
      },
    ];
  }

  async getLatestInterviewResult(candidateId?: string): Promise<InterviewResult> {
    return {
      id: 'res-101',
      candidateName: 'Riyan Pangestu',
      date: '02 May 2025',
      interviewType: 'AI-Powered Mock Interview',
      roleTargeted: 'Junior Web Developer',
      overallPerformance:
        'You demonstrated a strong ability to communicate your thoughts clearly and maintain a professional tone throughout the AI interview. Your responses were structured and showed an understanding of common interview formats.',
      areasForImprovement: [
        'Depth of Examples: While your answers were generally strong, some responses could benefit from deeper or more specific examples (especially using the STAR method – Situation, Task, Action, Result).',
        'Engagement: In a real interview, maintaining eye contact and using expressive tone helps build rapport. While AI may not respond to that, practicing such engagement habits can still be beneficial.',
        'Follow-Up Questions: Anticipate possible follow-up questions and prepare to elaborate when necessary.',
      ],
      summaryNote:
        'Great job on completing the demo interview! Your performance shows strong potential and a willingness to grow. With a bit more polish and specific examples, you’ll be very well-prepared for live interviews with hiring managers.',
      speakingScore: 88,
      contentScore: 85,
      readinessScore: 82,
      detailedMetrics: [
        { name: 'Speaking Fluency', score: 78, maxScore: 100, icon: '🎤' },
        { name: 'Answer Relevance', score: 80, maxScore: 100, icon: '🧠' },
        { name: 'Structure & Clarity', score: 85, maxScore: 100, icon: '🗂️' },
        { name: 'Grammar & Language', score: 72, maxScore: 100, icon: '🧑‍🏫' },
        { name: 'Time Management', score: 90, maxScore: 100, icon: '⏱️' },
      ],
    };
  }

  async saveInterviewConfig(config: Partial<InterviewPracticeConfig>): Promise<void> {
    this.config = { ...this.config, ...config };
  }

  async getSavedInterviewConfig(): Promise<InterviewPracticeConfig> {
    return { ...this.config };
  }
}
