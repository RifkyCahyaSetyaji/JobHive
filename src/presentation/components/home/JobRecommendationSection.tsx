'use client';

import React from 'react';
import { Job } from '@/core/domain/models/job';
import { MapPin, Briefcase, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface JobRecommendationProps {
  jobs: Job[];
  onSelectJob?: (job: Job) => void;
}

export const JobRecommendationSection: React.FC<JobRecommendationProps> = ({ jobs, onSelectJob }) => {
  return (
    <section className="py-20 bg-gray-50/70 border-y border-gray-100" id="jobs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/60 px-3 py-1 rounded-full">
              Matched for You
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Trusted Job Recommendation
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We provide accurate, relevant, and verified job recommendations personalized by an AI system based on your skills, experience, location, and career goals.
            </p>
          </div>

          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-500/20 shrink-0 self-start md:self-auto">
            <span>Explore All Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => onSelectJob && onSelectJob(job)}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mt-0.5">{job.company}</p>
                  </div>

                  {job.matchScore && (
                    <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-100">
                      <Zap className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                      <span>{job.matchScore}% Match</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                    <span>{job.type}</span>
                  </div>
                  {job.salaryRange && (
                    <div className="font-semibold text-blue-600">
                      {job.salaryRange}
                    </div>
                  )}
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-gray-100 text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Diposting {job.postedAt}</span>
                <span className="font-semibold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Apply with AI CV <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
