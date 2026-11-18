'use client';

import React, { useState } from 'react';
import { LearningPathTrack, LearningReview } from '@/core/domain/models/learningPath';
import {
  GraduationCap,
  Clock,
  BookOpen,
  Star,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Quote,
} from 'lucide-react';

interface LearningPathClientProps {
  categories: string[];
  track: LearningPathTrack;
  reviews: LearningReview[];
}

export const LearningPathClientPage: React.FC<LearningPathClientProps> = ({
  categories,
  track,
  reviews,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[1] || 'UI/UX Designer');
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-linear-to-b from-blue-50/70 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>JobHive Structured Academy</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Master the Exact Skills Employers Are Hiring For
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {track.curriculumSummary}
            </p>

            {/* Category / Role Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Steps Section (Figma Step 1, 2, 3, 4) */}
      <section className="py-16 bg-white" id="curriculum">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              4-Step Learning Roadmap
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              From Beginner to Industry-Ready {track.roleName}
            </h2>
            <p className="text-sm text-gray-500">
              Each step is built with interactive tasks, video lectures, and hands-on portfolio milestones.
            </p>
          </div>

          <div className="space-y-8">
            {track.steps.map((step) => {
              const isActive = activeStep === step.stepNumber;
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setActiveStep(step.stepNumber)}
                  className={`rounded-3xl p-8 border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-linear-to-r from-blue-50/70 to-indigo-50/40 border-blue-300 shadow-xl shadow-blue-500/5'
                      : 'bg-white border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Step indicator & main details */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-2xl bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-blue-500/20">
                          {step.stepNumber}
                        </span>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                            Step {step.stepNumber} • {step.level}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-gray-800">
                        {step.subtitle}
                      </p>

                      <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                        {step.description}
                      </p>

                      {/* Topic Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {step.topics.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 font-medium"
                          >
                            ✓ {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Step Stats & Action */}
                    <div className="lg:col-span-4 bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center justify-center text-blue-600 mb-1">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div className="text-base font-bold text-gray-900">{step.hours} Hours</div>
                          <div className="text-[11px] text-gray-500">Estimated</div>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center justify-center text-blue-600 mb-1">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div className="text-base font-bold text-gray-900">{step.modulesCount} Modules</div>
                          <div className="text-[11px] text-gray-500">Hands-on</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-gray-900">4.9</span>
                          <span>({step.reviewsCount.toLocaleString()} reviews)</span>
                        </div>
                      </div>

                      <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                        <span>Enroll in Step {step.stepNumber}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Reviews Section (What do they say?) */}
      <section className="py-16 bg-gray-50/70 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/60 px-3 py-1 rounded-full">
              Success Stories
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              What Do They Say?
            </h2>
            <p className="text-sm text-gray-500">
              Hear from graduates who landed high-impact jobs through JobHive&apos;s Learning Paths.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md shadow-gray-200/50 flex flex-col justify-between relative hover:border-blue-200 hover:shadow-xl transition-all"
              >
                <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6" />

                <div className="space-y-4 relative z-10">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold text-xs">
                    {rev.courseTaken}
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 text-white font-bold flex items-center justify-center text-base">
                      {rev.authorName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{rev.authorName}</h4>
                      <p className="text-xs text-gray-500">{rev.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
