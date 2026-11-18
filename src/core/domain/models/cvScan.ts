export interface CvIssue {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  actionNeeded: string;
}

export interface CvCheckAnalysis {
  overallScore: number;
  atsPassRate: number;
  totalIssuesCount: number;
  issues: CvIssue[];
}

export interface JobMatchDetail {
  id: string;
  jobTitle: string;
  companyName: string;
  industry: string;
  location: string;
  matchScore: number;
  hourlyRateOrSalary: string;
  postedTime: string;
  requirements: string[];
  responsibilities: string[];
  aboutCompany: string;
  workCulture: string[];
  website: string;
}

export interface CvFormData {
  fullName: string;
  email: string;
  phone: string;
  targetRole: string;
  summary: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
}
