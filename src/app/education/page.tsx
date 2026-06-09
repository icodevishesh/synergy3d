'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

/* ─── Data ─────────────────────────────────────────────────────────────── */

type Topic = 'all' | 'scanning' | 'materials' | 'implants' | 'workflow';

const TOPIC_COLORS: Record<Topic | string, string> = {
  scanning:  'bg-blue-500/15 text-blue-400',
  materials: 'bg-emerald-500/15 text-emerald-400',
  implants:  'bg-violet-500/15 text-violet-400',
  workflow:  'bg-amber-500/15 text-amber-400',
};

const TOPIC_COLORS_LIGHT: Record<Topic | string, string> = {
  scanning:  'bg-blue-50 text-blue-600',
  materials: 'bg-emerald-50 text-emerald-600',
  implants:  'bg-violet-50 text-violet-700',
  workflow:  'bg-amber-50 text-amber-600',
};

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function EducationPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Topic>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch('/api/education?sort=latest');
        if (!res.ok) throw new Error('Failed to load resources');
        const data = await res.json();
        setResources(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResources();
  }, []);

  const topics = [
    { id: 'all',       label: 'All Topics' },
    { id: 'scanning',  label: 'Scanning' },
    { id: 'materials', label: 'Materials' },
    { id: 'implants',  label: 'Imports' }, // wait, Implants
    { id: 'workflow',  label: 'Workflow' },
  ];

  // Map to adjust correct label for implants
  topics[3].label = 'Implants';

  const featured = resources.find(r => r.featured);
  const sidebar   = resources.filter(r => !r.featured).slice(0, 3);

  const filtered = resources.filter(r => {
    const matchTopic = filter === 'all' || r.topic === filter;
    const matchSearch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase());
    return matchTopic && matchSearch && !r.featured;
  });

  const resourceCount = filter === 'all' && !search ? resources.length : filtered.length + (featured && (filter === 'all' || filter === featured.topic) ? 1 : 0);


  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-36 pb-20 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-[1140px] mx-auto px-6 md:px-16 relative z-10">
          {/* Breadcrumb */}
          <div className="flex gap-2 text-[0.78rem] text-white/40 mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span className="text-white/20">›</span>
            <span className="text-white/40">Learnings</span>
            <span className="text-white/20">›</span>
            <span className="text-white/70 font-medium">Education</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left */}
            <div>
              <span className="block text-[11px] font-bold tracking-[0.2em] uppercase text-blue-glow mb-5">
                Education
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl font-extrabold text-white leading-[1.04] mb-6">
                Hands-on<br />learning<br />
                <em className="italic text-blue-glow font-extrabold">for every<br />clinician.</em>
              </h1>
              <p className="text-[15px] text-muted-dark leading-relaxed max-w-[400px] mb-10">
                Deepen your clinical knowledge with in-depth courses, technique guides, and scanner training resources developed by Synergy 3D&apos;s expert technicians.
              </p>
              {/* Stats */}
              <div className="flex flex-wrap gap-10">
                <div>
                  <span className="font-serif text-3xl font-extrabold text-white block leading-none">60<em className="not-italic text-blue-glow">+</em></span>
                  <span className="text-[0.68rem] text-muted-dark tracking-[0.14em] uppercase mt-1.5 block">Resources</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-white block leading-none">12<em className="not-italic text-blue-glow">k</em></span>
                  <span className="text-[0.68rem] text-muted-dark tracking-[0.14em] uppercase mt-1.5 block">Learners</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-white block leading-none">Free</span>
                  <span className="text-[0.68rem] text-muted-dark tracking-[0.14em] uppercase mt-1.5 block">Always</span>
                </div>
              </div>
            </div>

            {/* Right: resource type links */}
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
                  ),
                  label: 'SynergyTalks Podcast',
                  sub: 'Video episodes with experts',
                  href: '/talks',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  ),
                  label: 'Live Webinars',
                  sub: 'Register for upcoming sessions',
                  href: '#',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  ),
                  label: 'Articles & Guides',
                  sub: 'Deep-dive written resources',
                  href: '#',
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/18 rounded-xl px-5 py-4 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-default/20 border border-blue-default/30 flex items-center justify-center text-blue-glow shrink-0 group-hover:bg-blue-default/30 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[0.92rem] font-bold text-white leading-snug">{item.label}</span>
                    <span className="block text-[0.78rem] text-muted-dark mt-0.5">{item.sub}</span>
                  </div>
                  <svg className="text-white/30 group-hover:text-white/60 transition-colors shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Filter bar ───────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-border-light py-3 md:py-4 text-navy-text md:sticky md:top-[60px] z-[20]">
        <div className="max-w-[1140px] mx-auto px-4 md:px-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-nowrap sm:flex-wrap pb-0.5 sm:pb-0">
            {topics.map(t => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id as Topic)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full border font-semibold text-[0.75rem] cursor-pointer transition-all ${
                  filter === t.id
                    ? 'bg-blue-default border-blue-default text-white'
                    : 'bg-white border-border-light text-gray-500 hover:border-gray-300 hover:text-navy-text'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {/* Search + count */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 border border-border-light rounded-lg px-3.5 py-2 focus-within:border-blue-default transition-colors w-full sm:w-[200px]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-400 shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="text"
                placeholder="Search resources..."
                className="bg-transparent border-none outline-none text-[0.82rem] text-navy-text placeholder-[#aab4ce] w-full"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <span className="text-[0.78rem] text-gray-400 font-semibold whitespace-nowrap hidden sm:block">
              {resourceCount} resources
            </span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-24 bg-white text-navy-text">
          <span className="w-10 h-10 border-4 border-blue-default border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {featured && (filter === 'all' || filter === featured.topic) && !search && (
            <section className="bg-white pt-10 pb-6">

          <div className="max-w-[1140px] mx-auto px-4 md:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Featured card */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden relative group cursor-pointer bg-[radial-gradient(ellipse_at_40%_40%,#1e3a8a_0%,#0a1045_100%)] min-h-[340px] flex flex-col justify-end">
                {/* Emoji illustration */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <span className="text-[6rem] opacity-60">{featured.emoji}</span>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Content */}
                <div className="relative z-10 p-7">
                  <span className={`inline-block text-[0.65rem] font-extrabold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full mb-3 ${TOPIC_COLORS[featured.topic]}`}>
                    {featured.topicLabel}
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">{featured.title}</h2>
                  <p className="text-[0.82rem] text-white/65 leading-relaxed mb-4 max-w-[480px] line-clamp-2">{featured.desc}</p>
                  <div className="flex items-center gap-4 text-[0.75rem] text-white/50">
                    <span className="flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {featured.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/></svg>
                      {featured.level}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      {featured.views} views
                    </span>
                  </div>
                </div>
              </div>

              {/* Sidebar cards */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {sidebar.map(r => (
                  <div key={r.id} className="bg-white border border-border-light hover:border-blue-200 rounded-xl p-4 flex items-start gap-4 cursor-pointer hover:shadow-md transition-all group">
                    <div className="w-12 h-12 rounded-lg bg-gray-50 border border-border-light flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                      {r.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`inline-block text-[0.62rem] font-extrabold tracking-[0.14em] uppercase px-2 py-0.5 rounded-full mb-1.5 ${TOPIC_COLORS_LIGHT[r.topic]}`}>
                        {r.topicLabel}
                      </span>
                      <h3 className="font-serif text-[0.92rem] font-bold text-navy-text leading-snug mb-1 line-clamp-2">{r.title}</h3>
                      <div className="flex items-center gap-3 text-[0.72rem] text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {r.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                          {r.views}
                        </span>
                      </div>
                    </div>
                    <svg className="text-gray-300 group-hover:text-blue-default transition-colors shrink-0 mt-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ── All Resources grid ───────────────────────────────────────────── */}
      <section className="bg-white py-8 pb-20">
        <div className="max-w-[1140px] mx-auto px-4 md:px-16">
          <h2 className="font-serif text-2xl font-bold text-navy-text mb-7">
            {filter === 'all' && !search ? 'All Resources' : `${resourceCount} result${resourceCount !== 1 ? 's' : ''}`}
          </h2>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-semibold text-[1rem]">
              No resources matched your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filtered.map(r => (
                <div
                  key={r.id}
                  className="reveal bg-white border border-border-light rounded-2xl overflow-hidden hover:shadow-premium hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer group"
                >
                  {/* Thumbnail */}
                  <div className="aspect-[16/9] bg-[radial-gradient(ellipse_at_50%_40%,#1e3a8a_0%,#080f35_100%)] flex items-center justify-center relative overflow-hidden">
                    <span className="text-5xl select-none group-hover:scale-110 transition-transform duration-300">{r.emoji}</span>
                  </div>
                  {/* Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <span className={`inline-block text-[0.62rem] font-extrabold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full mb-2.5 w-fit ${TOPIC_COLORS_LIGHT[r.topic]}`}>
                      {r.topicLabel}
                    </span>
                    <h3 className="font-serif text-[0.98rem] font-bold text-navy-text mb-2 leading-snug line-clamp-2">{r.title}</h3>
                    <p className="text-[0.78rem] text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-grow">{r.desc}</p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-[0.72rem] text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {r.duration}
                        </span>
                      </div>
                      <span className="text-[0.78rem] font-bold text-blue-600 group-hover:gap-1.5 inline-flex items-center gap-1 transition-all">
                        Start <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
        </>
      )}

      {/* ── CTA strip ───────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-16 text-white text-center sm:text-left">
        <div className="max-w-[1140px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-10">
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
