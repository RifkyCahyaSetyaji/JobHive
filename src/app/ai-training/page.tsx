import { container } from '@/infrastructure/container';
import { AiTrainingClientPage } from '@/presentation/components/ai-training/AiTrainingClientPage';

export default async function AiTrainingPage() {
  // Clean Architecture: Server Component triggers UseCase
  const data = await container.getTrainingDataUseCase.execute();

  return (
    <AiTrainingClientPage
      initialModules={data.modules}
    />
  );
}
