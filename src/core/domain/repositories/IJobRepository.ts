import { Job, Testimonial, FaqItem, PlatformMetric } from '../models/job';

export interface IJobRepository {
  getFeaturedJobs(): Promise<Job[]>;
  searchJobs(query: string, category?: string): Promise<Job[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getFaqs(): Promise<FaqItem[]>;
  getMetrics(): Promise<PlatformMetric[]>;
}
