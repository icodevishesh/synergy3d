'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Scanner {
  id: string;
  name: string;
  steps: string[];
  requirements: string;
}

const scanners: Scanner[] = [
  {
    id: 'itero',
    name: 'iTero',
    steps: [
      'Open Rx form in MyiTero portal',
      'Add Synergy3D as recipient lab',
      'Send the case — we receive it instantly'
    ],
    requirements: '.STL or .DCM exported via MyiTero cloud.'
  },
  {
    id: '3shape',
    name: '3Shape',
    steps: [
      'Open 3Shape Communicate',
      'Add Synergy3D Lab connection ID',
      'Submit case directly from TRIOS'
    ],
    requirements: '.3OXZ or .STL via 3Shape Communicate.'
  },
  {
    id: 'medit',
    name: 'Medit',
    steps: [
      'Open Medit Link',
      'Invite Synergy3D as your partner lab',
      'Send scan via Medit Link'
    ],
    requirements: '.STL or .PLY uploaded via Medit Link.'
  },
  {
    id: 'carestream',
    name: 'Carestream',
    steps: [
      'Export STL from CS ScanFlow',
      'Upload via our secure portal',
      'Receive instant confirmation'
    ],
    requirements: '.STL exported from CS ScanFlow.'
  }
];

export default function DigitalWorkflow() {
  const [activeScannerId, setActiveScannerId] = useState<string>('itero');

  const activeScanner = scanners.find((s) => s.id === activeScannerId) || scanners[0];

  const triggerShipping = () => {
    window.dispatchEvent(new Event('open-shipping-modal'));
  };

  return (
    <div className="bg-[#f8faff] min-h-screen text-navy-text">
      {/* Page Hero */}
      <section className="relative bg-navy pt-22 md:pt-36 pb-10 md:pb-20 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 relative z-10">
          <div className="flex gap-2 text-[0.78rem] text-white/40 mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span className="text-white/20">›</span>
            <span className="text-white/70 font-medium">Digital Workflow</span>
          </div>
          <span className="block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-blue-glow mb-5">
            DIGITAL ECOSYSTEM
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-white leading-[1.04] mb-6">
            One lab. Every scanner.<br />
            <em className="italic text-blue-glow font-extrabold">Zero friction.</em>
          </h1>
          <p className="text-[0.98rem] text-muted-dark leading-relaxed max-w-[500px]">
            Pick your scanner — we'll handle the rest. Cases sync to our floor in seconds.
          </p>
        </div>
      </section>

      {/* ── INTERACTIVE WORKFLOW SECTION ── */}
      <section className="py-12 md:py-24 px-8 md:px-16">
        <div className="max-w-[1000px] mx-auto">
          {/* Section Header */}
          <div className="mb-10 text-left">
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a1530] mb-2.5">
              Choose your scanner
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Select your intraoral scanner for tailored setup instructions.
            </p>
          </div>

          {/* Scanner Selector Pills */}
          <div className="flex flex-wrap gap-3 mb-10 md:mb-12">
            {scanners.map((scanner) => {
              const isActive = scanner.id === activeScannerId;
              return (
                <button
                  key={scanner.id}
                  onClick={() => setActiveScannerId(scanner.id)}
                  className={`px-6 py-3 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-default text-white border border-transparent shadow-[0_4px_14px_rgba(30,86,217,0.35)] cursor-pointer'
                      : 'bg-white text-navy-text border border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 cursor-pointer'
                  }`}
                >
                  {scanner.name}
                </button>
              );
            })}
          </div>

          {/* Setup Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Card: 3-Step Setup */}
            <div className="bg-white border border-[#dde4f5] rounded-3xl p-8 md:p-12 shadow-xs flex flex-col justify-start">
              <h3 className="font-sans text-xl md:text-2xl font-bold text-[#0a1530] mb-10">
                3-Step Setup for {activeScanner.name}
              </h3>
              
              <div className="flex flex-col gap-8 flex-grow justify-center">
                {activeScanner.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-full bg-blue-default text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 shadow-xs">
                      {idx + 1}
                    </div>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium pt-1.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: File Requirements & Video */}
            <div className="bg-[#071125] border border-white/5 rounded-3xl p-8 md:p-12 shadow-lg flex flex-col justify-between text-white">
              <div>
                <h3 className="font-sans text-xl md:text-2xl font-bold text-white mb-4">
                  File Requirements
                </h3>
                <p className="text-white/70 text-sm md:text-[15px] leading-relaxed mb-8">
                  {activeScanner.requirements}
                </p>

                {/* Video Placeholder Box */}
                <div className="aspect-[1.75/1] w-full rounded-2xl border border-white/10 bg-[#0c1829] flex items-center justify-center text-white/50 text-sm cursor-pointer hover:border-white/20 transition-all mb-8 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-[#071125]/20 group-hover:bg-[#071125]/10 transition-colors" />
                  <span className="text-white/40 flex items-center gap-2 group-hover:text-white/60 transition-colors z-10 font-medium text-xs md:text-sm">
                    <span className="text-[10px] md:text-xs">▶</span> Setup video coming soon
                  </span>
                </div>
              </div>

              {/* Bottom confirmation footer row */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/5 mt-auto">
                <svg className="w-5 h-5 text-blue-glow shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs md:text-sm font-semibold text-blue-glow">
                  Receipt confirmation in under 30 seconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-12 md:py-16 text-white text-center sm:text-left">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-10">
          <div>
            <h2 className="font-serif text-4xl font-bold leading-tight mb-2">
              Have a clinical question? <em className="italic font-normal">Ask us.</em>
            </h2>
            <p className="text-white/70 text-sm">
              Our senior technicians are available 7 days a week to support case-planning.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 shrink-0 justify-center">
            <Link href="/callback" className="inline-block bg-white hover:bg-gray-50 text-blue-700 font-bold py-3.5 px-8 rounded-lg text-sm shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              Request a Callback →
            </Link>
            <Link href="/talks" className="inline-block bg-transparent hover:bg-white/6 text-white font-medium py-3.5 px-6 rounded-lg text-sm border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              Browse SynergyTalks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
