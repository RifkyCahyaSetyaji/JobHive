import { IJobRepository } from '../domain/repositories/IJobRepository';
import { Job, Testimonial, FaqItem, PlatformMetric } from '../domain/models/job';

export class GetHomeDataUseCase {
  constructor(private readonly jobRepo: IJobRepository) {}

  async execute(): Promise<{
    featuredJobs: Job[];
    testimonials: Testimonial[];
    faqs: FaqItem[];
    metrics: PlatformMetric[];
  }> {
    const [featuredJobs, testimonials, faqs, metrics] = await Promise.all([
      this.jobRepo.getFeaturedJobs(),
      this.jobRepo.getTestimonials(),
      this.jobRepo.getFaqs(),
      this.jobRepo.getMetrics(),
    ]);

    return {
      featuredJobs,
      testimonials,
      faqs,
      metrics,
    };
  }
}
