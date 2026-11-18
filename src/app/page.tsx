import { container } from '@/infrastructure/container';
import { Navbar } from '@/presentation/components/common/Navbar';
import { Footer } from '@/presentation/components/common/Footer';
import { HeroSection } from '@/presentation/components/home/HeroSection';
import { AiFeatureSection } from '@/presentation/components/home/AiFeatureSection';
import { AboutSection } from '@/presentation/components/home/AboutSection';
import { JobRecommendationSection } from '@/presentation/components/home/JobRecommendationSection';
import { TestimonialSection } from '@/presentation/components/home/TestimonialSection';
import { FaqSection } from '@/presentation/components/home/FaqSection';

export default async function HomePage() {
  // Clean Architecture: Call UseCase via Container
  const data = await container.getHomeDataUseCase.execute();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="grow">
        <HeroSection />
        <AiFeatureSection />
        <AboutSection />
        <JobRecommendationSection jobs={data.featuredJobs} />
        <TestimonialSection testimonials={data.testimonials} />
        <FaqSection faqs={data.faqs} />
      </main>
      <Footer />
    </div>
  );
}
