import { CvCheckAnalysis, JobMatchDetail, CvFormData } from '../models/cvScan';

export interface ICvScanRepository {
  analyzeCv(fileOrText?: string): Promise<CvCheckAnalysis>;
  getJobMatches(cvSkills?: string[]): Promise<JobMatchDetail[]>;
  saveCvTemplate(data: Partial<CvFormData>): Promise<{ success: boolean; id: string }>;
}
