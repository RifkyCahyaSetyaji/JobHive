'use client';

import React from 'react';
import Link from 'next/link';
import { TrainingModule } from '@/core/domain/models/training';
import { Navbar } from '@/presentation/components/common/Navbar';
import { Footer } from '@/presentation/components/common/Footer';
import { AiTrainingHero } from '@/presentation/components/ai-training/AiTrainingHero';
import { TrainingModuleList } from '@/presentation/components/ai-training/TrainingModuleList';
import { FileCheck, ArrowRight, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface AiTrainingClientProps {
  initialModules: TrainingModule[];
}

export const AiTrainingClientPage: React.FC<AiTrainingClientProps> = ({
  initialModules,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="grow">
        <AiTrainingHero />

        <TrainingModuleList modules={initialModules} />

        {/* Banner Quick Link to Assessment Report */}
        <section className="py-14 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Comprehensive Analysis</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  Lihat Riwayat & Laporan Evaluasi Wawancara Anda
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Dapatkan visualisasi metrik STAR, kelancaran vokal (WPM), kontak mata, serta feedback poin perbaikan langsung dari model AI JobHive pada halaman laporan khusus.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <Link
                  href="/interview/report"
                  className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Buka Halaman Report</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

