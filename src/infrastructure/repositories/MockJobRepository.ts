import { IJobRepository } from '@/core/domain/repositories/IJobRepository';
import { Job, Testimonial, FaqItem, PlatformMetric } from '@/core/domain/models/job';

export class MockJobRepository implements IJobRepository {
  async getFeaturedJobs(): Promise<Job[]> {
    return [
      {
        id: 'job-1',
        title: 'Senior Frontend Engineer (React/Next)',
        company: 'TechCorp Global',
        location: 'Jakarta (Remote / Hybrid)',
        type: 'Full-time',
        salaryRange: 'IDR 18.000.000 - 28.000.000',
        skills: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Clean Architecture'],
        matchScore: 96,
        postedAt: '2 jam yang lalu',
      },
      {
        id: 'job-2',
        title: 'UI/UX Product Designer',
        company: 'Fintech Nusantara',
        location: 'Bandung / Remote',
        type: 'Full-time',
        salaryRange: 'IDR 14.000.000 - 22.000.000',
        skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
        matchScore: 92,
        postedAt: '5 jam yang lalu',
      },
      {
        id: 'job-3',
        title: 'AI Prompt & ML Engineer',
        company: 'JobHive Labs',
        location: 'Jakarta Pusat',
        type: 'Full-time',
        salaryRange: 'IDR 20.000.000 - 35.000.000',
        skills: ['Python', 'LLM Fine-tuning', 'LangChain', 'FastAPI'],
        matchScore: 89,
        postedAt: '1 hari yang lalu',
      },
      {
        id: 'job-4',
        title: 'Associate Business Analyst',
        company: 'Unicorn Logistics',
        location: 'Surabaya / Hybrid',
        type: 'Full-time',
        salaryRange: 'IDR 10.000.000 - 15.000.000',
        skills: ['SQL', 'Business Process', 'Data Visualization', 'Scrum'],
        matchScore: 85,
        postedAt: '2 hari yang lalu',
      },
    ];
  }

  async searchJobs(query: string, category?: string): Promise<Job[]> {
    const jobs = await this.getFeaturedJobs();
    return jobs.filter((job) => {
      const matchQuery =
        !query ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()));
      const matchCategory = !category || category === 'All' || job.skills.includes(category);
      return matchQuery && matchCategory;
    });
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return [
      {
        id: 'testi-1',
        name: 'Erica Aoyama',
        role: 'CEO',
        company: 'Design Studio Global',
        quote:
          'The design and functionality are intuitive, making users feel comfortable and excited to explore all the AI features available.',
        avatarUrl: '/avatars/erica.png',
      },
      {
        id: 'testi-2',
        name: 'Nanik Supriyanto',
        role: 'Freelancer',
        company: 'Digital Creative',
        quote:
          'The design looks amazing—the blue color combo you chose gives the site a fresh and professional vibe!',
        avatarUrl: '/avatars/nanik.png',
      },
      {
        id: 'testi-3',
        name: 'Cak Ripki Prakoso',
        role: 'Cyber Analyst',
        company: 'SecureNet',
        quote:
          'The AI-based skill training feature is unique and super helpful to improve skills without the hassle of finding a mentor.',
        avatarUrl: '/avatars/ripki.png',
      },
    ];
  }

  async getFaqs(): Promise<FaqItem[]> {
    return [
      {
        id: 'faq-1',
        question: 'Is JobHive suitable for fresh graduates?',
        answer:
          'Yes, JobHive is designed specifically with fresh graduates in mind, providing step-by-step AI guidance, CV ATS optimization, and mock interview simulations.',
      },
      {
        id: 'faq-2',
        question: 'How does the AI Training feature work?',
        answer:
          'Our AI analyzes your audio/video answers in real-time, assessing clarity, vocabulary, relevant keywords, and body language to give actionable score cards.',
      },
      {
        id: 'faq-3',
        question: "What's included in the Learning Path?",
        answer:
          'The Learning Path contains customized task modules, skill trainers, examinations, and automatic performance progress reports based on your target job.',
      },
      {
        id: 'faq-4',
        question: 'What is CV Scan?',
        answer:
          'CV Scan uses advanced OCR and ATS algorithms to benchmark your CV against live industry job requirements and detect weaknesses or keyword gaps.',
      },
      {
        id: 'faq-5',
        question: 'Is JobHive free to use?',
        answer:
          'JobHive offers full core features for free including basic mock interviews and resume parsing, alongside premium pro simulation packs.',
      },
    ];
  }

  async getMetrics(): Promise<PlatformMetric[]> {
    return [
      { label: 'Job Vacancy', value: '18K+' },
      { label: 'Candidates', value: '1M+' },
      { label: 'Company Partners', value: '2K+' },
    ];
  }
}
