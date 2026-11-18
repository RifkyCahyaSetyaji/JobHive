'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Briefcase, Users, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
  onSearch?: (query: string, tag?: string) => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const tags = ['UI/UX', 'Machine Learning', 'Business Analyst', 'Frontend Developer', 'Data Science'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
    if (onSearch) onSearch(tag, tag);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 bg-linear-to-b from-blue-50/50 via-white to-white">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Helpful job preparation platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              Step into your future with{' '}
              <span className="text-blue-600 bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600">
                AI-powered
              </span>{' '}
              job support.
            </h1>

            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Boost your readiness with smart training, tailored job matches, and the tools to stand out in a competitive market.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSubmit} className="relative max-w-xl">
              <div className="flex items-center bg-white border border-gray-200 rounded-2xl shadow-lg shadow-gray-200/50 p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Job Title, Keyword (e.g. Frontend Engineer)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden bg-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-md shadow-blue-500/25 shrink-0 active:scale-95"
                >
                  Find Job
                </button>
              </div>
            </form>

            {/* Popular Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-gray-500 font-medium mr-1">Popular:</span>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Feature Highlights / Stats Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xl shadow-blue-500/10 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">AI Complete Feature</h3>
                    <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Detected & Ready to Use
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md">
                  v2.5 AI
                </span>
              </div>

              {/* Quick interactive links to AI sections */}
              <div className="space-y-3">
                <Link
                  href="/ai-training"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
                >
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600">
                      AI Mock Interview Simulation
                    </h4>
                    <p className="text-xs text-gray-500">Camera, mic, real-time rubric feedback</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </Link>

                <div className="p-3.5 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600">
                        CV Scan & Keyword Checker
                      </h4>
                      <p className="text-xs text-gray-500">Benchmark your CV against ATS filters</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>

              {/* Live Platform Stats */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 rounded-2xl bg-gray-50">
                  <div className="flex items-center justify-center text-blue-600 mb-1">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-black text-gray-900">18K+</div>
                  <div className="text-[11px] text-gray-500 font-medium">Job Vacancies</div>
                </div>

                <div className="p-3 rounded-2xl bg-gray-50">
                  <div className="flex items-center justify-center text-blue-600 mb-1">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-black text-gray-900">1M+</div>
                  <div className="text-[11px] text-gray-500 font-medium">Candidates</div>
                </div>

                <div className="p-3 rounded-2xl bg-gray-50">
                  <div className="flex items-center justify-center text-blue-600 mb-1">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="text-lg font-black text-gray-900">2K+</div>
                  <div className="text-[11px] text-gray-500 font-medium">Companies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
