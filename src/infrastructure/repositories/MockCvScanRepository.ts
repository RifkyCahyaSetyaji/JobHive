import { ICvScanRepository } from '@/core/domain/repositories/ICvScanRepository';
import { CvCheckAnalysis, JobMatchDetail, CvFormData } from '@/core/domain/models/cvScan';

export class MockCvScanRepository implements ICvScanRepository {
  async analyzeCv(fileOrText?: string): Promise<CvCheckAnalysis> {
    return {
      overallScore: 82,
      atsPassRate: 85,
      totalIssuesCount: 3,
      issues: [
        {
          id: 'iss-1',
          type: 'critical',
          title: 'Profile Summary Missing',
          description: 'No professional personal summary found in the header section.',
          actionNeeded: 'Fill in a short 3-4 sentence paragraph highlighting your career achievements and core skill stack.',
        },
        {
          id: 'iss-2',
          type: 'critical',
          title: 'Skills Not Found or Not Properly Tagged',
          description: 'Skill section is missing or not formatted for ATS table scanners.',
          actionNeeded: 'Add key industry keywords (e.g. Figma, React, Next.js, Design Thinking).',
        },
        {
          id: 'iss-3',
          type: 'warning',
          title: 'Too Long Summary / Verbose Bullets',
          description: 'Several bullet points exceed 140 characters without quantifiable metrics.',
          actionNeeded: 'Shorten descriptions and use metric verbs (e.g., increased conversion by 24%).',
        },
      ],
    };
  }

  async getJobMatches(cvSkills?: string[]): Promise<JobMatchDetail[]> {
    return [
      {
        id: 'jm-1',
        jobTitle: 'UX Designer – Junior to Mid Level',
        companyName: 'Google Inc.',
        industry: 'Creative Agency / Digital Product Design',
        location: 'Jakarta Selatan (Hybrid) / WFA Remote OK',
        matchScore: 87,
        hourlyRateOrSalary: '$120 / hour (or IDR 25M - 35M / month)',
        postedTime: '1 min ago',
        requirements: [
          '1+ year experience in UI/UX, or a strong portfolio as a fresh grad',
          'Proficient in Figma, Adobe XD, or equivalent modern design tools',
          'Solid understanding of design thinking, wireframing, and interactive prototyping',
          'Strong communication & cross-functional teamwork skills',
          'Online portfolio link is required',
        ],
        responsibilities: [
          'Design intuitive mobile & web interfaces according to design system guidelines',
          'Collaborate directly with developers and agile project managers',
          'Conduct user research sessions and usability testing interviews',
          'Contribute to maintaining and scaling atomic component libraries',
        ],
        aboutCompany:
          'Google Inc. is a global technology company best known for its powerful search engine and developer ecosystems. We believe in continuous learning, creative freedom, and a supportive work environment where everyone can grow and contribute.',
        workCulture: [
          'Teamwork & open collaborative feedback',
          'Design-first product development mindset',
          'Flexible and results-driven autonomy',
          'Always learning & growing together',
        ],
        website: 'www.google.com',
      },
      {
        id: 'jm-2',
        jobTitle: 'Product Designer (Design Systems)',
        companyName: 'Tokopedia / GoTo',
        industry: 'E-Commerce & Tech Ecosystem',
        location: 'Jakarta Selatan (Hybrid)',
        matchScore: 83,
        hourlyRateOrSalary: 'IDR 18M - 26M / month',
        postedTime: '2 hours ago',
        requirements: [
          'Experience building design tokens and multi-brand components in Figma',
          'Familiar with accessibility (WCAG 2.1) guidelines',
        ],
        responsibilities: [
          'Scale component libraries across web and mobile platforms',
          'Document usage guidelines for engineers',
        ],
        aboutCompany: 'GoTo is the largest digital ecosystem in Indonesia.',
        workCulture: ['Fast-paced', 'Customer Obsession', 'Growth Mindset'],
        website: 'www.tokopedia.com',
      },
    ];
  }

  async saveCvTemplate(data: Partial<CvFormData>): Promise<{ success: boolean; id: string }> {
    return {
      success: true,
      id: 'cv-tmpl-' + Date.now(),
    };
  }
}
