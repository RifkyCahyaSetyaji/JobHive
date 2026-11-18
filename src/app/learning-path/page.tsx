import { container } from '@/infrastructure/container';
import { Navbar } from '@/presentation/components/common/Navbar';
import { Footer } from '@/presentation/components/common/Footer';
import { LearningPathClientPage } from '@/presentation/components/learning-path/LearningPathClientPage';

export default async function LearningPathPage() {
  // Clean Architecture: Server Component calls UseCase via container
  const data = await container.getLearningPathDataUseCase.execute();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="grow">
        <LearningPathClientPage
          categories={data.categories}
          track={data.track}
          reviews={data.reviews}
        />
      </main>
      <Footer />
    </div>
  );
}
