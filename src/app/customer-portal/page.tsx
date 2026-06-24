'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  TrendingUp, 
  FileText, 
  Bell, 
  Users, 
  Truck, 
  ShieldCheck, 
  ArrowUpRight, 
  Lock, 
  Key, 
  Database, 
  FileCheck 
} from 'lucide-react';

export default function CustomerPortal() {
  const features = [
    {
      title: '60-second intake',
      desc: 'Drag in your STLs from any major scanner. No couriers, no calls.',
      icon: Zap,
    },
    {
      title: 'Real-time tracking',
      desc: 'Watch every case move from design to mill to ship.',
      icon: TrendingUp,
    },
    {
      title: 'Digital Rx & invoices',
      desc: 'All paperwork stored, searchable, and downloadable.',
      icon: FileText,
    },
    {
      title: 'Smart notifications',
      desc: 'Status alerts via SMS or email. No more guessing.',
      icon: Bell,
    },
    {
      title: 'Multi-doctor practices',
      desc: 'Roles, permissions, and case routing for DSOs.',
      icon: Users,
    },
    {
      title: 'Shipping made easy',
      desc: 'Pre-printed labels and pickup scheduling built in.',
      icon: Truck,
    },
    {
      title: 'HIPAA-secure',
      desc: 'Bank-grade encryption and audit logs on every action.',
      icon: ShieldCheck,
    },
    {
      title: 'API & integrations',
      desc: 'Plug into iTero, 3Shape, Medit, Dexis natively.',
      icon: ArrowUpRight,
    },
  ];

  const securityItems = [
    {
      title: 'End-to-end encryption',
      desc: 'TLS 1.3 in flight, AES-256 at rest.',
      icon: Lock,
    },
    {
      title: 'MFA & SSO',
      desc: 'Optional MFA, SAML SSO available for DSOs.',
      icon: Key,
    },
    {
      title: 'Audit logs',
      desc: 'Every view, edit, and download is timestamped.',
      icon: Database,
    },
    {
      title: 'BAA available',
      desc: 'We sign Business Associate Agreements with every practice.',
      icon: FileCheck,
    },
  ];

  const trackerSteps = [
    { label: 'Received', status: 'completed' },
    { label: 'Designed', status: 'completed' },
    { label: 'Milled', status: 'completed' },
    { label: 'Finishing', status: 'active' },
    { label: 'Shipped', status: 'pending' },
  ];

  return (
    <div className="bg-[#f7f9ff] text-navy-text min-h-screen">
      {/* ── HERO SECTION ── */}
      <section className="relative bg-navy pt-24 md:pt-36 pb-16 md:pb-24 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none border-b border-white/6 text-white">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />
        
        {/* Glowing aura */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_85%_50%_at_50%_30%,rgba(30,86,217,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-8 md:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="inline-block text-[11px] font-bold tracking-[0.15em] uppercase text-blue-glow mb-5">
                — SYNERGY3D CUSTOMER PORTAL
              </span>
              
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
                One portal. <em className="font-serif italic text-blue-glow font-normal">Every case.</em>
                Total control.
              </h1>
              
              <p className="text-[15px] sm:text-base text-muted-dark max-w-[540px] leading-relaxed mb-9">
                Submit digital cases in under 60 seconds, watch production in real time, manage Rx forms and invoices, and run your entire lab relationship from one secure dashboard.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://synergy.greatlab.io/login" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-1.5 bg-blue-default hover:bg-blue-bright text-white font-bold py-3.5 px-6.5 rounded-lg text-[13px] shadow-[0_4px_14px_rgba(30,86,217,0.35)] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Create your account
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                
                <a 
                  href="https://synergy.greatlab.io/login" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-1.5 bg-transparent hover:bg-white/6 text-white font-semibold py-3.5 px-6.5 rounded-lg text-[13px] border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Log in
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
              
              <div className="flex items-center gap-2 text-[11px] text-white/40 mt-8">
                <Lock className="w-3.5 h-3.5" />
                <span>HIPAA-compliant • SOC 2 Type II infrastructure</span>
              </div>
            </div>
            
            {/* Right Column: Case Tracker Widget Mockup */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[380px] bg-navy-mid/60 border border-white/[0.08] backdrop-blur-md rounded-2xl p-6.5 md:p-8 text-white shadow-2xl relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-default/10 rounded-full blur-2xl -z-10 pointer-events-none" />
                
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-1">
                  Case #SY-24851 - In production
                </span>
                <h3 className="text-lg font-bold text-white mb-8">
                  Zirconia Crown - #14
                </h3>
                
                {/* Tracker Steps */}
                <div className="space-y-6 relative">
                  {trackerSteps.map((step, idx) => {
                    const isCompleted = step.status === 'completed';
                    const isActive = step.status === 'active';
                    const isPending = step.status === 'pending';
                    
                    return (
                      <div key={idx} className="flex items-center gap-4.5 relative">
                        {/* Connecting Line */}
                        {idx < trackerSteps.length - 1 && (
                          <div className={`absolute left-[7px] top-[14px] w-[1.5px] h-[34px] -z-10 ${
                            isCompleted && trackerSteps[idx + 1].status !== 'pending'
                              ? 'bg-blue-default' 
                              : 'bg-white/10'
                          }`} />
                        )}
                        
                        {/* Dot */}
                        <div className="relative flex items-center justify-center w-[15px] h-[15px]">
                          {isCompleted && (
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-glow shadow-[0_0_8px_rgba(91,154,255,0.7)]" />
                          )}
                          {isActive && (
                            <>
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-glow z-10" />
                              <span className="absolute w-[18px] h-[18px] rounded-full border border-blue-glow animate-pulse-custom opacity-75" />
                            </>
                          )}
                          {isPending && (
                            <span className="w-2 h-2 rounded-full border-1.5 border-white/20 bg-transparent" />
                          )}
                        </div>
                        
                        {/* Step Label */}
                        <span className={`text-[13px] font-medium tracking-wide ${
                          isCompleted ? 'text-blue-glow' : isActive ? 'text-white' : 'text-white/40'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── WORKFLOW / FEATURES SECTION ── */}
      <section className="bg-white text-navy-text py-16 md:py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14 md:mb-18">
            <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-blue-default mb-4">
              — A WORKFLOW BUILT FOR THE CHAIR
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-navy-text leading-tight">
              Digital from intake to delivery.
            </h2>
          </div>

          {/* Grid of 8 Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5.5 mb-14">
            {features.map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-[#dde4f5]/60 hover:border-blue-default/20 rounded-2xl p-6.5 transition-all duration-300 hover:shadow-premium hover:-translate-y-1 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-pale/50 flex items-center justify-center text-blue-default mb-5 group-hover:bg-blue-default group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="font-serif text-base sm:text-[17px] font-bold text-navy-text mb-2.5 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Centered CTA */}
          <div className="flex justify-center">
            <a 
              href="https://synergy.greatlab.io/login" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-1.5 bg-blue-default hover:bg-blue-bright text-white font-bold py-3.5 px-8 rounded-full text-[13px] shadow-[0_4px_14px_rgba(30,86,217,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Get started — it&apos;s free
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── DATA SECURITY SECTION ── */}
      <section className="bg-gray-50/50 border-t border-gray-100 py-16 md:py-24 px-8 md:px-16 text-navy-text">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Security Intro */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-blue-default mb-4">
                — DATA SECURITY
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-navy-text leading-tight mb-5">
                Your patient data, <br />
                locked down.
              </h2>
              <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed font-normal mb-8 max-w-[420px]">
                We treat every byte like it&apos;s a chart record — because it is. Synergy3D is HIPAA compliant by default and our infrastructure is audited to SOC 2 Type II standards.
              </p>
              
              <a 
                href="https://synergy.greatlab.io/login" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-fit inline-flex items-center justify-center gap-1.5 bg-blue-default hover:bg-blue-bright text-white font-bold py-3.5 px-6.5 rounded-lg text-[13px] shadow-[0_4px_14px_rgba(30,86,217,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Sign in to the portal
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Right Column: 4 Security Cards Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5.5">
                {securityItems.map((sec, idx) => {
                  const IconComponent = sec.icon;
                  return (
                    <div 
                      key={idx} 
                      className="bg-white border border-[#dde4f5]/60 hover:border-blue-default/20 rounded-2xl p-6.5 transition-all duration-300 hover:shadow-premium hover:-translate-y-1 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-pale/50 flex items-center justify-center text-blue-default mb-4.5 group-hover:bg-blue-default group-hover:text-white transition-all duration-300">
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>
                      <h3 className="font-serif text-[15px] sm:text-base font-bold text-navy-text mb-2 leading-snug">
                        {sec.title}
                      </h3>
                      <p className="text-[12.5px] sm:text-[13.5px] text-gray-500 leading-relaxed font-normal">
                        {sec.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-12 md:py-16 text-white text-center sm:text-left">
        <div className="max-w-6xl mx-auto px-8 md:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-10">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-2">
              Ready to send your <em>first case?</em>
            </h2>
            <p className="text-white/70 text-[0.95rem]">
              Let our expert team handle everything — scan to delivery in 5 days flat.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 shrink-0 justify-center">
            <a 
              href="https://synergy.greatlab.io/login" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-white hover:bg-gray-50 text-blue-700 font-bold py-3.5 px-8 rounded-lg text-sm shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
            >
              Send Digital Scan →
            </a>
            <Link 
              href="/products" 
              className="inline-block bg-transparent hover:bg-white/6 text-white font-medium py-3.5 px-6 rounded-lg text-sm border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
