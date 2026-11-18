'use client';

import React from 'react';
import Link from 'next/link';
import { TrainingModule } from '@/core/domain/models/training';
import { MessageSquare, Code, Mic, FileText, Clock, ArrowRight } from 'lucide-react';

interface TrainingModuleProps {
  modules: TrainingModule[];
  onSelectModule?: (module: TrainingModule) => void;
}

export const TrainingModuleList: React.FC<TrainingModuleProps> = ({
  modules,
  onSelectModule,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return MessageSquare;
      case 'Code':
        return Code;
      case 'Mic':
        return Mic;
      case 'FileText':
        return FileText;
      default:
        return MessageSquare;
    }
  };

  return (
    <section className="py-16 bg-gray-50/60 border-t border-gray-100" id="modules">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/60 px-3 py-1 rounded-full">
              Structured Curriculum
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              AI Training Modules
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Select an interview track or speaking module tailored to your target job profile.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod) => {
            const Icon = getIcon(mod.iconName);
            return (
              <Link
                key={mod.id}
                href={`/interview?module=${mod.id}`}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    {mod.badge && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                        {mod.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{mod.duration}</span>
                  </span>
                  <span className="font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Start <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
