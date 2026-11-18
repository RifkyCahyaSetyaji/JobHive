'use client';

import React from 'react';
import { Testimonial } from '@/core/domain/models/job';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  testimonials: Testimonial[];
}

export const TestimonialSection: React.FC<TestimonialProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full">
            User Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Testimonial from Satisfied Users
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            See how JobHive empowers job seekers and professionals to elevate their career success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md shadow-gray-200/50 flex flex-col justify-between relative hover:border-blue-200 hover:shadow-xl transition-all"
            >
              <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6" />

              <div className="space-y-4 relative z-10">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 text-white font-bold flex items-center justify-center text-base shadow-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500 capitalize">
                    {item.role} • {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
