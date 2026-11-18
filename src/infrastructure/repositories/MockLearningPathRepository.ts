import { ILearningPathRepository } from '@/core/domain/repositories/ILearningPathRepository';
import { LearningPathTrack, LearningReview } from '@/core/domain/models/learningPath';

export class MockLearningPathRepository implements ILearningPathRepository {
  async getCategories(): Promise<string[]> {
    return [
      'All Class',
      'UI/UX Designer',
      'Machine Learning',
      'Multi-Platform App',
      'Business Analyst',
      'DevOps Engineer',
      'Mobile Development',
    ];
  }

  async getLearningPathTrack(roleId?: string): Promise<LearningPathTrack> {
    return {
      id: 'track-uiux',
      roleName: 'UI/UX Designer',
      category: 'UI/UX',
      curriculumSummary:
        "A comprehensive curriculum designed by JobHive's team of experts in collaboration with industry practitioners. Participants are prepared to become UI/UX Designers in line with industry standards.",
      description:
        'Become a job-ready UI/UX Designer by mastering user research, wireframing, high-fidelity Figma prototyping, and usability testing.',
      steps: [
        {
          stepNumber: 1,
          title: 'Learn the Fundamentals of UI/UX',
          subtitle: 'Learn What UI/UX Means',
          description:
            'This first step helps you learn the basics of user interface and user experience design. You will learn the most important principles of design, the difference between UI and UX, and why design is so important for developing digital products.',
          hours: 6,
          modulesCount: 10,
          reviewsCount: 1000,
          level: 'Beginner',
          topics: ['Design Principles', 'UI vs UX Core', 'Product Thinking', 'Heuristic Evaluation'],
        },
        {
          stepNumber: 2,
          title: 'Design User Flows',
          subtitle: 'From Idea to Wireframe',
          description:
            'In this step, you will learn how to identify what users need and turn that into designs for websites and apps. You will also learn about design thinking processes and how to create the early structure of a product before moving on to visuals.',
          hours: 23,
          modulesCount: 8,
          reviewsCount: 2142,
          level: 'Beginner',
          topics: ['User Journey Maps', 'Information Architecture', 'Low-fidelity Wireframes', 'Design Thinking'],
        },
        {
          stepNumber: 3,
          title: 'Master Professional Design Tools',
          subtitle: 'Use Figma to Make Your Designs Real',
          description:
            'This step teaches you how to use popular design tools like Figma. You will learn how to design layouts, use style guides, and create interactive prototypes that users can try out.',
          hours: 27,
          modulesCount: 13,
          reviewsCount: 1732,
          level: 'Intermediate',
          topics: ['Figma Auto Layout', 'Components & Variants', 'Interactive Prototyping', 'Design Systems'],
        },
        {
          stepNumber: 4,
          title: 'Test and Refine Your Designs',
          subtitle: 'Test Your Designs, Listen to the Users',
          description:
            'The last stage is all about testing how easy the design is to use and making changes to it. You will learn how to collect feedback, analyze it effectively, and improve your design to better match user needs and business goals.',
          hours: 25,
          modulesCount: 9,
          reviewsCount: 3566,
          level: 'Advanced',
          topics: ['Usability Testing (UT)', 'A/B Testing Analysis', 'Iteration Cycles', 'Handoff to Dev'],
        },
      ],
    };
  }

  async getStudentReviews(): Promise<LearningReview[]> {
    return [
      {
        id: 'rev-1',
        authorName: 'Riyan Pangestu',
        company: 'PT. Innovatech Solutions',
        courseTaken: 'Learn Advanced UI/UX Design',
        comment:
          "The material is concise and relevant to industry needs. I found it most helpful when learning about user flow and usability testing, topics that are rarely taught in depth elsewhere. It would be even better if there were more real-world case studies, but overall it's well worth taking.",
        rating: 5,
      },
      {
        id: 'rev-2',
        authorName: 'Shakira Naya',
        company: 'PT. Solusi Inovasi Nusantara',
        courseTaken: 'Learn Intermediate UI/UX Design',
        comment:
          "I took this class without any background in design, but the explanations in each module were really clear and practical. I liked the Figma section the most because I could immediately practice and create my own prototypes. It's perfect for beginners who want to pursue a career as a UI/UX designer.",
        rating: 5,
      },
    ];
  }
}
