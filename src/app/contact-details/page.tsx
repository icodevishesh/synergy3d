'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import JsonLd from "@/components/JsonLd";
import { contacts } from "@/lib/schema/contacts";

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
];

const HELP_OPTIONS = [
  'Product & pricing questions',
  'Scanner training & workflow setup',
  'Help with a specific case',
  'Getting started / onboarding',
  'DSO / Group practice partnership',
  'Other',
];

export default function CallbackPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    practice: '',
    phone: '',
    email: '',
    state: '',
    callTime: '',
    notes: '',
  });
  const [helpWith, setHelpWith] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const toggleHelp = (opt: string) =>
    setHelpWith(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          helpWith,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit request');
      }

      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <JsonLd data={contacts} />
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-22 md:pt-36 pb-10 md:pb-20 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none text-center">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 relative z-10">
          {/* Breadcrumb */}
          <div className="flex gap-2 text-[0.78rem] text-white/40 mb-6 justify-center">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span className="text-white/20">›</span>
            <span className="text-white/70 font-medium">Request a Call Back</span>
          </div>
          <span className="block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-blue-glow mb-5">
            Get in Touch
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl font-extrabold text-white leading-[1.06] mb-5">
            We&apos;ll call <em className="italic text-blue-glow">you<br />back.</em>
          </h1>
          <p className="text-[0.98rem] text-muted-dark leading-relaxed max-w-[480px] mx-auto">
            Fill out the form below and one of our team members will call you within 1 business hour — Mon–Fri, 9am–6pm EST.
          </p>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <section className="bg-white py-10 pb-10 md:py-14 md:pb-20">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* ── Form ── */}
            <div className="lg:col-span-7">
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-text mb-2 leading-snug">
                Tell us about <em className="italic text-blue-600">your practice.</em>
              </h2>
              <p className="text-[0.88rem] text-gray-500 leading-relaxed mb-8 max-w-[420px]">
                We&apos;ll match you with the right team member to answer your questions about products, workflow, scanner training, or anything else.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                  {/* Row 1: First / Last */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.78rem] font-semibold text-navy-text">First Name <span className="text-blue-600">*</span></label>
                      <input
                        required
                        type="text"
                        placeholder="Dr. First"
                        className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full text-navy-text placeholder-gray-400"
                        value={form.firstName}
                        onChange={e => set('firstName', e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.78rem] font-semibold text-navy-text">Last Name <span className="text-blue-600">*</span></label>
                      <input
                        required
                        type="text"
                        placeholder="Last Name"
                        className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full text-navy-text placeholder-gray-400"
                        value={form.lastName}
                        onChange={e => set('lastName', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Row 2: Practice / Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.78rem] font-semibold text-navy-text">Practice Name <span className="text-blue-600">*</span></label>
                      <input
                        required
                        type="text"
                        placeholder="Your Practice Name"
                        className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full text-navy-text placeholder-gray-400"
                        value={form.practice}
                        onChange={e => set('practice', e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.78rem] font-semibold text-navy-text">Phone Number <span className="text-blue-600">*</span></label>
                      <input
                        required
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full text-navy-text placeholder-gray-400"
                        value={form.phone}
                        onChange={e => set('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Row 3: Email / State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.78rem] font-semibold text-navy-text">Email Address</label>
                      <input
                        type="email"
                        placeholder="you@practice.com"
                        className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full text-navy-text placeholder-gray-400"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[0.78rem] font-semibold text-navy-text">State</label>
                      <div className="relative">
                        <select
                          className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full text-navy-text appearance-none cursor-pointer"
                          value={form.state}
                          onChange={e => set('state', e.target.value)}
                        >
                          <option value="">Select your state</option>
                          {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* Preferred call time */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.78rem] font-semibold text-navy-text">What&apos;s your preferred call time?</label>
                    <div className="relative">
                      <select
                        className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full text-navy-text appearance-none cursor-pointer"
                        value={form.callTime}
                        onChange={e => set('callTime', e.target.value)}
                      >
                        <option value="">Select a time window</option>
                        <option>9am – 11am EST</option>
                        <option>11am – 1pm EST</option>
                        <option>1pm – 3pm EST</option>
                        <option>3pm – 6pm EST</option>
                        <option>Anytime</option>
                      </select>
                      <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[0.78rem] font-semibold text-navy-text">What can we help you with?</label>
                    {HELP_OPTIONS.map(opt => (
                      <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
                        <div
                          onClick={() => toggleHelp(opt)}
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                            helpWith.includes(opt)
                              ? 'bg-blue-default border-blue-default'
                              : 'bg-white border-gray-300 group-hover:border-blue-300'
                          }`}
                        >
                          {helpWith.includes(opt) && (
                            <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                              <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span className="text-[0.85rem] text-gray-700 select-none" onClick={() => toggleHelp(opt)}>{opt}</span>
                      </label>
                    ))}
                  </div>

                  {/* Notes */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.78rem] font-semibold text-navy-text">Anything else you&apos;d like us to know?</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us more about your practice or the questions you have..."
                      className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full text-navy-text placeholder-gray-400 resize-y"
                      value={form.notes}
                      onChange={e => set('notes', e.target.value)}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-default hover:bg-blue-bright disabled:bg-blue-default/60 text-white font-bold py-3.5 px-6 rounded-lg text-[0.95rem] transition-all hover:-translate-y-0.5 active:translate-y-0 w-full cursor-pointer border-none shadow-lg flex items-center justify-center gap-2 mt-1"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
                        Request My Call Back
                      </>
                    )}
                  </button>
                  <p className="text-[0.72rem] text-gray-400 text-center">
                    We respect your privacy. Your information is never shared with third parties.
                  </p>

                </form>
              ) : (
                /* Success state */
                <div className="text-center py-16 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-3xl mb-2">✅</div>
                  <h3 className="font-serif text-2xl font-bold text-navy-text">You&apos;re all set!</h3>
                  <p className="text-[0.9rem] text-gray-500 max-w-[320px] leading-relaxed">
                    We received your request. A team member will call you within 1 business hour during business hours.
                  </p>
                  <Link
                    href="/"
                    className="mt-4 inline-block bg-blue-default hover:bg-blue-bright text-white font-bold py-3 px-8 rounded-lg text-[0.9rem] transition-all"
                  >
                    Back to Home
                  </Link>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-5 flex flex-col gap-4">

              {/* Contact directly */}
              <div className="bg-gray-50 border border-border-light rounded-2xl py-8 px-6">
                <span className="block text-xs font-extrabold tracking-wider uppercase text-gray-400 mb-4">Contact Us Directly</span>
                <div className="flex flex-col divide-y divide-border-light">
                  {[
                    {
                      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>,
                      label: '+1 8454471807',
                      sub: 'Call us directly anytime during hours',
                    },
                    {
                      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                      label: 'info@synergy3d.net',
                      sub: 'Email us any time — we respond same day',
                    },
                    {
                      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                      label: 'Wappingers Falls, NY',
                      sub: 'Headquarters & main lab',
                    },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                      <div className="w-7 h-7 rounded-md bg-blue-default/10 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <span className="block text-[0.85rem] font-bold text-navy-text leading-tight">{item.label}</span>
                        <span className="block text-[0.72rem] text-gray-400 mt-0.5">{item.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business hours */}
              <div className="bg-gradient-to-br from-black/80 via-blue-900 to-blue-800 rounded-2xl py-8 px-6 text-white">
                <span className="block text-xs font-extrabold tracking-wider uppercase text-gray-300 mb-4">Business Hours</span>
                <div className="flex flex-col gap-2.5">
                  {[
                    { day: 'Monday – Friday', hours: '8am – 6pm EST' },
                    { day: 'Saturday - Sunday',          hours: 'Closed' },
                  ].map(row => (
                    <div key={row.day} className="flex items-center justify-between">
                      <span className="text-[0.82rem] text-muted-dark">{row.day}</span>
                      <span className="text-[0.82rem] font-bold text-white">{row.hours}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[0.72rem] text-gray-400 mt-4 pt-3 border-t border-white/8">
                  Lab technician support available 7 days/week
                </p>
              </div>

              {/* Prefer not to wait */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl py-8 px-6">
                <span className="block text-xs font-extrabold tracking-wider uppercase text-blue-500 mb-2">Prefer Not to Wait?</span>
                <p className="text-[0.82rem] text-gray-600 leading-relaxed mb-4">
                  Send us a digital scan right now — our portal is open 24/7 and we begin processing same day.
                </p>
                <a
                  href="https://synergy.greatlab.io/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-blue-default hover:bg-blue-bright text-white font-bold py-2.5 px-5 rounded-lg text-[0.88rem] transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  Send Digital Scan →
                </a>
              </div>

            </aside>
          </div>
        </div>
      </section>

      <Toaster position="top-right" />
    </div>
  );
}
