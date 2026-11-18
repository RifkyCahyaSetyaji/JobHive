'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-blue-500/40">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo/Property 1=white.png"
                alt="JobHive Logo"
                width={140}
                height={44}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-blue-100 text-sm leading-relaxed max-w-sm">
              Powered by AI, JobHive helps you enhance your skills, craft the perfect CV, and get ready to face today’s competitive job market.
            </p>
          </div>

          {/* AI Training Links */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">AI Training</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <Link href="/ai-training" className="hover:text-white transition-colors">
                  About Interview
                </Link>
              </li>
              <li>
                <Link href="/ai-training" className="hover:text-white transition-colors">
                  Speaking
                </Link>
              </li>
              <li>
                <Link href="/ai-training" className="hover:text-white transition-colors">
                  Demo Interview
                </Link>
              </li>
            </ul>
          </div>

          {/* CV Scan Links */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">CV Scan</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <Link href="/cv-scan" className="hover:text-white transition-colors">
                  CV Template
                </Link>
              </li>
              <li>
                <Link href="/cv-scan" className="hover:text-white transition-colors">
                  CV Check
                </Link>
              </li>
              <li>
                <Link href="/cv-scan" className="hover:text-white transition-colors">
                  JobMatch
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Path Links */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">Learning Path</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <Link href="/learning-path" className="hover:text-white transition-colors">
                  Task
                </Link>
              </li>
              <li>
                <Link href="/learning-path" className="hover:text-white transition-colors">
                  Skill Trainer
                </Link>
              </li>
              <li>
                <Link href="/learning-path" className="hover:text-white transition-colors">
                  Examination
                </Link>
              </li>
              <li>
                <Link href="/learning-path" className="hover:text-white transition-colors">
                  Task Report
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-200 gap-4">
          <p>© 2025 JobHive. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
