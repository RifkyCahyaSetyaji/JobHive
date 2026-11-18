export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // Full-time, Part-time, Remote
  salaryRange?: string;
  skills: string[];
  matchScore?: number;
  logoUrl?: string;
  postedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface PlatformMetric {
  label: string;
  value: string;
  description?: string;
}
