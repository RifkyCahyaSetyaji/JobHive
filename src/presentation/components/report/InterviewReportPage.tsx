'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InterviewResult } from '@/core/domain/models/training';
import { Navbar } from '@/presentation/components/common/Navbar';
import { Footer } from '@/presentation/components/common/Footer';
import {
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Award,
  ArrowLeft,
  Share2,
  Sparkles,
  TrendingUp,
  Brain,
  Video,
} from 'lucide-react';

interface InterviewReportProps {
  result: InterviewResult;
}

export const InterviewReportPage: React.FC<InterviewReportProps> = ({ result }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="grow py-10 sm:py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Back Navigation Bar */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/ai-training"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke AI Training</span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Hasil Interview AI JobHive',
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Tautan laporan berhasil disalin!');
                  }
                }}
                className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bagikan</span>
              </button>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh PDF</span>
              </button>
            </div>
          </div>

          {/* Main Hero Header Card */}
          <div className="bg-linear-to-r from-blue-900 via-indigo-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>AI Interview Assessment Report</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{result.interviewType} Feedback</h1>
              <div className="text-xs sm:text-sm text-blue-200 flex flex-wrap gap-x-6 gap-y-1.5 pt-1">
                <span>Kandidat: <strong className="text-white">{result.candidateName}</strong></span>
                <span>Tanggal Sesi: <strong className="text-white">{result.date}</strong></span>
                <span>Target Posisi: <strong className="text-white">{result.roleTargeted}</strong></span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
              <Link
                href="/interview"
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Simulasi</span>
              </Link>
            </div>
          </div>

          {/* 3 Main Metric Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-blue-100/80 rounded-3xl p-6 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                  Speaking Fluency
                </span>
                <div className="text-4xl font-black text-gray-900 mt-1">{result.speakingScore}</div>
              </div>
              <div className="w-full bg-blue-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.speakingScore}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">Pacing wpm, filler words & kestabilan vokal suara</p>
            </div>

            <div className="bg-white border border-indigo-100/80 rounded-3xl p-6 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex p-3 rounded-2xl bg-indigo-50 text-indigo-600">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">
                  Content & Structure
                </span>
                <div className="text-4xl font-black text-gray-900 mt-1">{result.contentScore}</div>
              </div>
              <div className="w-full bg-indigo-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.contentScore}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">Penerapan metode STAR & relevansi jawaban</p>
            </div>

            <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 text-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
                  Readiness & Confidence
                </span>
                <div className="text-4xl font-black text-gray-900 mt-1">{result.readinessScore}</div>
              </div>
              <div className="w-full bg-emerald-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${result.readinessScore}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">Kontak mata, postur gestur & ketenangan emosional</p>
            </div>
          </div>

          {/* Detailed Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Overall & Improvements */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-xs space-y-3">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span>Overall Performance</span>
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {result.overallPerformance}
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span>Areas for Improvement</span>
                </h2>
                <ul className="space-y-3.5">
                  {result.areasForImprovement.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed bg-amber-50/50 p-3 rounded-2xl border border-amber-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: AI Micro Rubric Metrics */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-xs space-y-6">
              <div>
                <h2 className="text-base font-bold text-gray-900">AI Micro Rubric Scores</h2>
                <p className="text-xs text-gray-500 mt-0.5">Penilaian per dimensi kompetensi teknis & non-teknis</p>
              </div>

              <div className="space-y-3.5">
                {result.detailedMetrics.map((metric, idx) => (
                  <div key={idx} className="bg-blue-50/40 p-3.5 rounded-2xl border border-blue-100/60 space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-gray-800">
                      <span className="flex items-center gap-2">
                        <span>{metric.icon}</span>
                        <span>{metric.name}</span>
                      </span>
                      <span className="text-blue-600 font-bold">
                        {metric.score} <span className="text-gray-400 font-normal text-xs">/ {metric.maxScore}</span>
                      </span>
                    </div>
                    <div className="w-full bg-blue-100/70 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${(metric.score / metric.maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                <strong>Rekomendasi AI JobHive:</strong> {result.summaryNote}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
