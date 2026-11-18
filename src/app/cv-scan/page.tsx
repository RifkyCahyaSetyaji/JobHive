import { container } from '@/infrastructure/container';
import { Navbar } from '@/presentation/components/common/Navbar';
import { Footer } from '@/presentation/components/common/Footer';
import { CvScanClientPage } from '@/presentation/components/cv-scan/CvScanClientPage';

export default async function CvScanPage() {
  // Clean Architecture: Server Component calls UseCase via container
  const data = await container.getCvScanDataUseCase.execute();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="grow">
        <CvScanClientPage
          initialAnalysis={data.analysis}
          initialJobMatches={data.jobMatches}
        />
      </main>
      <Footer />
    </div>
  );
}
