'use client';

import React from 'react';
import Link from 'next/link';
import { FileSearch, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';

export const AiFeatureSection: React.FC = () => {
  const features = [
    {
      id: 'cv-scan',
      title: 'CV Scan',
      tag: 'Resume ATS',
      description:
        'Let our AI scan and analyze your resume to highlight strengths, fix gaps, and match you with the right opportunities.',
      icon: FileSearch,
      color: 'blue',
      href: '#cv-scan',
      buttonText: 'Analyze CV',
    },
    {
      id: 'ai-training',
      title: 'AI Training',
      tag: 'Mock Interview',
      description:
        'Get personalized training suggestions to enhance your skills and stay ahead in a fast-changing job market.',
      icon: Sparkles,
      color: 'indigo',
      href: '/ai-training',
      buttonText: 'Start Training',
    },
    {
      id: 'learning-tasks',
      title: 'Learning Tasks',
      tag: 'Skill Path',
      description:
        'Complete interactive tasks designed by AI to help you learn faster, smarter, and in a more engaging way.',
      icon: GraduationCap,
      color: 'sky',
      href: '#learning-path',
      buttonText: 'View Tasks',
    },
  ];

  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            AI Feature
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Discover smart tools powered by AI to help you boost your job search, sharpen your skills, and personalize your career journey with ease.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-8">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group-hover:gap-3 transition-all"
                  >
                    <span>{item.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
