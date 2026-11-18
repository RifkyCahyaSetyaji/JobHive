import { container } from '@/infrastructure/container';
import { InterviewReportPage } from '@/presentation/components/report/InterviewReportPage';

export default async function InterviewReportRoute() {
  // Clean Architecture: Server Component trigger UseCase
  const data = await container.getTrainingDataUseCase.execute();

  return <InterviewReportPage result={data.latestResult} />;
}
