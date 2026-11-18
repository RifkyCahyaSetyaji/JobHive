'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Video, FileCheck } from 'lucide-react';

interface AiTrainingHeroProps {
  onStartSimulation?: () => void;
  onViewLatestFeedback?: () => void;
}

export const AiTrainingHero: React.FC<AiTrainingHeroProps> = ({
  onStartSimulation,
  onViewLatestFeedback,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 bg-linear-to-b from-blue-600 via-blue-500 to-indigo-600 text-white">
      {/* Decorative glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>AI-Driven Job Interview Readiness</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Master Every Job Interview with Instant AI Feedback
          </h1>

          <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Experience realistic mock interview simulations with video and audio tracking. Get detailed scoring on your speaking fluency, answer relevance, and structured STAR delivery.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/interview"
              className="px-7 py-3.5 rounded-full bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-blue-600" />
              <span>Launch Mock Interview</span>
            </Link>

            <Link
              href="/interview/report"
              className="px-7 py-3.5 rounded-full bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-sm border border-white/20 backdrop-blur-md active:scale-95 transition-all flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4 text-yellow-300" />
              <span>View Latest Assessment</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
