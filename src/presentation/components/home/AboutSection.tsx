'use client';

import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-linear-to-b from-blue-600 to-indigo-700 text-white relative overflow-hidden" id="about">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
              About JobHive
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              What is <br />
              <span className="text-yellow-300">JobHive</span>?
            </h2>
            <div className="pt-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <p className="text-sm font-semibold">AI Career Accelerator</p>
                <p className="text-xs text-blue-100">Trusted by over 1 Million job seekers</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 space-y-6">
            <p className="text-base sm:text-lg leading-relaxed text-blue-50">
              JobHive is your smart companion in job searching — connecting you to career opportunities that match your skills. With AI-powered job matching, real-time tracking, and an easy-to-use interface, we help you land jobs faster and grow confidently.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-blue-100">
              Whether you&apos;re a fresh graduate, an experienced professional, or ready for an exciting career shift, JobHive is here to support your next move with personalized readiness tools.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AI Job Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mock Interview</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real-time Scoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
