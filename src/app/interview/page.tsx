import { container } from '@/infrastructure/container';
import { InterviewRoom } from '@/presentation/components/interview/InterviewRoom';

export default async function InterviewPage() {
  // Clean Architecture: Ambil konfigurasi default dari usecase
  const data = await container.getTrainingDataUseCase.execute();

  return <InterviewRoom initialConfig={data.defaultConfig} />;
}
