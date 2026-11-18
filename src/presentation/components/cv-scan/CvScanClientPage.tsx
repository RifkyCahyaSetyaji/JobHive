'use client';

import React, { useState } from 'react';
import { CvCheckAnalysis, JobMatchDetail } from '@/core/domain/models/cvScan';
import {
  FileSearch,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Briefcase,
  MapPin,
  Sparkles,
  Zap,
  ArrowRight,
  FileText,
  DollarSign,
  Globe,
  Share2,
  Bookmark,
} from 'lucide-react';

interface CvScanClientProps {
  initialAnalysis: CvCheckAnalysis;
  initialJobMatches: JobMatchDetail[];
}

export const CvScanClientPage: React.FC<CvScanClientProps> = ({
  initialAnalysis,
  initialJobMatches,
}) => {
  const [activeTab, setActiveTab] = useState<'check' | 'jobmatch' | 'template'>('check');
  const [analysis, setAnalysis] = useState<CvCheckAnalysis>(initialAnalysis);
  const [jobMatches] = useState<JobMatchDetail[]>(initialJobMatches);
  const [selectedJob, setSelectedJob] = useState<JobMatchDetail>(initialJobMatches[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-linear-to-b from-blue-50/70 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Resume & Job Matcher</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Optimize Your CV & Match with Top Industry Roles
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Scan your resume against ATS algorithms, fix common formatting mistakes, and find jobs tailored to your skills.
            </p>

            {/* Navigation Tabs (Figma: CV Check, JobMatch, CV Template) */}
            <div className="flex items-center justify-center p-1.5 bg-gray-100 rounded-2xl max-w-md mx-auto">
              <button
                onClick={() => setActiveTab('check')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'check'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                1. CV Check
              </button>
              <button
                onClick={() => setActiveTab('jobmatch')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'jobmatch'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                2. JobMatch
              </button>
              <button
                onClick={() => setActiveTab('template')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'template'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                3. CV Template
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area based on Tab */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TAB 1: CV CHECK */}
          {activeTab === 'check' && (
            <div className="space-y-12">
              {/* Upload Card */}
              <div className="max-w-2xl mx-auto border-2 border-dashed border-blue-200 rounded-3xl p-8 text-center bg-blue-50/30 hover:bg-blue-50/60 transition-colors">
                <input
                  type="file"
                  id="cv-upload"
                  accept=".pdf,.docx"
                  onChange={handleSimulateUpload}
                  className="hidden"
                />
                <label htmlFor="cv-upload" className="cursor-pointer block space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-base font-bold text-gray-900 block">
                      {fileName ? `Uploaded: ${fileName}` : 'Upload your CV (PDF or DOCX)'}
                    </span>
                    <span className="text-xs text-gray-500">
                      Our AI will automatically detect keyword issues, ATS formatting, and readability
                    </span>
                  </div>
                  {isScanning && (
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full animate-pulse">
                      Analyzing resume with AI algorithms...
                    </div>
                  )}
                </label>
              </div>

              {/* Analysis Results Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Score Summary Box */}
                <div className="lg:col-span-4 bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-6">
                  <h3 className="text-lg font-extrabold text-gray-900">CV Readiness Score</h3>

                  <div className="flex items-center justify-center">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-5xl font-black text-blue-600">{analysis.overallScore}</span>
                        <span className="text-xs text-gray-400 block font-bold">/ 100</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 text-xs">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">ATS Pass Likelihood</span>
                      <span className="font-bold text-emerald-600">{analysis.atsPassRate}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Total Action Items</span>
                      <span className="font-bold text-amber-600">{analysis.totalIssuesCount} items</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('jobmatch')}
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Proceed to JobMatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Issues Table (Figma: Issue, Description, Action Needed) */}
                <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">Detected Formatting & Content Issues</h4>
                      <p className="text-xs text-gray-500">Review your CV to avoid common mistakes before applying</p>
                    </div>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      Live AI Audit
                    </span>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {analysis.issues.map((item) => (
                      <div key={item.id} className="p-6 space-y-2 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-center gap-2">
                          {item.type === 'critical' ? (
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                          )}
                          <span className="text-sm font-bold text-gray-900">{item.title}</span>
                        </div>
                        <p className="text-xs text-gray-600 pl-6">{item.description}</p>
                        <div className="pl-6 pt-1 flex items-center gap-2 text-xs text-blue-600 font-semibold">
                          <span>Action Needed:</span>
                          <span className="text-gray-700 font-normal">{item.actionNeeded}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: JOBMATCH (Figma: Google Inc UX Designer 87% Match) */}
          {activeTab === 'jobmatch' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Job List Column */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-600 fill-blue-600 shrink-0" />
                  <p className="text-xs text-blue-800 font-medium">
                    Found <strong>{jobMatches.length} roles</strong> closely aligned with your uploaded resume skills.
                  </p>
                </div>

                {jobMatches.map((job) => {
                  const isSelected = selectedJob.id === job.id;
                  return (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/50 border-blue-500 shadow-md'
                          : 'bg-white border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <h4 className="font-bold text-gray-900 text-base">{job.jobTitle}</h4>
                          <p className="text-xs text-gray-600 font-medium">{job.companyName}</p>
                        </div>
                        <span className="shrink-0 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-black text-xs border border-emerald-100">
                          {job.matchScore}% Match
                        </span>
                      </div>

                      <div className="pt-4 flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> {job.hourlyRateOrSalary}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Detailed Selected Job Description (Figma spec: Requirements, Culture, etc.) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
                <div className="flex items-start justify-between border-b border-gray-100 pb-6 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {selectedJob.industry}
                    </span>
                    <h3 className="text-2xl font-black text-gray-900">{selectedJob.jobTitle}</h3>
                    <p className="text-sm font-semibold text-gray-700">{selectedJob.companyName}</p>
                    <p className="text-xs text-gray-400">{selectedJob.location} • Posted {selectedJob.postedTime}</p>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="inline-block px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-sm border border-emerald-200">
                      This job matches {selectedJob.matchScore}% of your CV!
                    </div>
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-900">🎓 Requirements:</h4>
                  <ul className="space-y-2 text-xs text-gray-600 pl-4 list-disc">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx} className="leading-relaxed">{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Responsibilities */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-gray-900">💼 Responsibilities:</h4>
                  <ul className="space-y-2 text-xs text-gray-600 pl-4 list-disc">
                    {selectedJob.responsibilities.map((resp, idx) => (
                      <li key={idx} className="leading-relaxed">{resp}</li>
                    ))}
                  </ul>
                </div>

                {/* About Company & Culture */}
                <div className="space-y-3 bg-gray-50 p-5 rounded-2xl text-xs text-gray-600 leading-relaxed border border-gray-100">
                  <h4 className="font-bold text-gray-900 text-sm">📃 About Us:</h4>
                  <p>{selectedJob.aboutCompany}</p>
                  <div className="pt-2">
                    <strong className="text-gray-800 block mb-1">🧠 Work Culture:</strong>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.workCulture.map((culture, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-700 font-medium">
                          • {culture}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CV TEMPLATE BUILDER */}
          {activeTab === 'template' && (
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-8">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-900">CV Template Generator</h3>
                <p className="text-xs text-gray-500">Fill in your professional milestones and export to standard ATS formatting</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 block">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Riyan Pangestu"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 block">Target Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Junior UI/UX Designer"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-blue-500"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-700 block">Professional Summary (0/500)</label>
                  <textarea
                    rows={3}
                    placeholder="Brief 3-sentence summary of your career focus and value proposition..."
                    className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 block">Portfolio / GitHub Link</label>
                  <input
                    type="url"
                    placeholder="https://behance.net/username"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 block">Organizations / Volunteering (Optional)</label>
                  <input
                    type="text"
                    placeholder="Organization Name & Active Years"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                  Save Draft
                </button>
                <button className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20">
                  Generate ATS PDF
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
