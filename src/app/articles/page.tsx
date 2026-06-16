'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Category = 'all' | 'clinical' | 'materials' | 'technology' | 'business';

interface Article {
  _id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  readDuration: string;
  writer: string;
  category: string;
  imageUrl: string;
  published: boolean;
  views: number;
}

const CAT_COLORS: Record<string, string> = {
  clinical:   'bg-blue-50 text-blue-600',
  materials:  'bg-emerald-50 text-emerald-600',
  technology: 'bg-violet-50 text-violet-700',
  business:   'bg-amber-50 text-amber-600',
};

const CAT_LABELS: Record<string, string> = {
  clinical:   'Clinical',
  materials:  'Materials',
  technology: 'Technology',
  business:   'Business',
};

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Category>('all');
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = [
    { id: 'all',        label: 'All' },
    { id: 'clinical',   label: 'Clinical' },
    { id: 'materials',  label: 'Materials' },
    { id: 'technology', label: 'Technology' },
    { id: 'business',   label: 'Business' },
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles');
        if (!res.ok) throw new Error('Failed to fetch articles');
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filtered = articles.filter(a => {
    const matchCat    = filter === 'all' || a.category === filter;
    const matchSearch = !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase()) ||
      a.writer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const popular = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-36 pb-20 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-[1140px] mx-auto px-8 md:px-16 relative z-10">
          {/* Breadcrumb */}
          <div className="flex gap-2 text-[0.78rem] text-white/40 mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span className="text-white/20">›</span>
            <span className="text-white/40">Learnings</span>
            <span className="text-white/20">›</span>
            <span className="text-white/70 font-medium">Articles</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div>
              <span className="block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-blue-glow mb-5">
                Articles
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl font-extrabold text-white leading-[1.04] mb-6">
                Insights from<br />
                <em className="italic text-blue-glow font-extrabold">the bench.</em>
              </h1>
              <p className="text-[0.98rem] text-muted-dark leading-relaxed max-w-[420px] mb-10">
                Written by Synergy 3D&apos;s technicians and clinical partners — evidence-based articles on materials, workflows, and the business of digital dentistry.
              </p>
              {/* Stats */}
              <div className="flex flex-wrap gap-10 text-center">
                <div>
                  <span className="font-serif text-3xl font-extrabold text-white block leading-none">45<em className="not-italic text-blue-glow">+</em></span>
                  <span className="text-[0.68rem] text-muted-dark tracking-[0.14em] uppercase mt-1.5 block">Articles</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-white block leading-none">8<em className="not-italic text-blue-glow">k</em></span>
                  <span className="text-[0.68rem] text-muted-dark tracking-[0.14em] uppercase mt-1.5 block">Monthly Readers</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-white block leading-none">5<em className="not-italic text-blue-glow"> min</em></span>
                  <span className="text-[0.68rem] text-muted-dark tracking-[0.14em] uppercase mt-1.5 block">Avg. Read Time</span>
                </div>
              </div>
            </div>

            {/* Right: related-section links */}
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  ),
                  label: 'Education Resources',
                  sub: 'Courses & technique guides',
                  href: '/education',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  ),
                  label: 'Webinars',
                  sub: 'Live & on-demand sessions',
                  href: '#',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ),
                  label: 'Customer Stories',
                  sub: 'Real results from real practices',
                  href: '#',
                },
              ].map(item => (
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

      {/* Filter bar */}
      <div className="bg-white border-b border-border-light py-3 md:py-4 text-navy-text md:sticky md:top-[60px] z-[20]">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-nowrap sm:flex-wrap pb-0.5 sm:pb-0">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id as Category)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full border font-semibold text-[0.75rem] cursor-pointer transition-all ${
                  filter === c.id
                    ? 'bg-blue-default border-blue-default text-white'
                    : 'bg-white border-border-light text-gray-500 hover:border-gray-300 hover:text-navy-text'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 border border-border-light rounded-lg px-3.5 py-2 focus-within:border-blue-default transition-colors w-full sm:w-[200px]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-400 shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="text"
                placeholder="Search articles..."
                className="bg-transparent border-none outline-none text-[0.82rem] text-navy-text placeholder-[#aab4ce] w-full"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <span className="text-[0.78rem] text-gray-400 font-semibold whitespace-nowrap hidden sm:block">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="bg-white py-10 pb-20">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Article list */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <span className="w-8 h-8 border-3 border-blue-default border-t-transparent rounded-full animate-spin" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-semibold text-[1rem]">
                  No articles matched your search.
                </div>
              ) : (
                filtered.map(a => (
                  <Link
                    key={a._id}
                    href={`/articles/${a.slug}`}
                    className="reveal bg-white border border-border-light hover:border-blue-200 rounded-2xl p-5 sm:p-6 flex gap-5 cursor-pointer hover:shadow-md transition-all group block"
                  >
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <span className={`inline-block text-[10px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full mb-3 ${CAT_COLORS[a.category] || 'bg-gray-100 text-gray-600'}`}>
                        {CAT_LABELS[a.category] || a.category}
                      </span>
                      <h2 className="font-serif text-[1.05rem] sm:text-[1.1rem] font-bold text-navy-text mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                        {a.title}
                      </h2>
                      <p className="text-[0.82rem] text-gray-500 leading-relaxed mb-4 line-clamp-2">
                        {a.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-[0.72rem] text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                          {a.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {a.readDuration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                          {a.writer}
                        </span>
                      </div>
                    </div>
                    {/* Thumbnail Image (Replacing Emoji) */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform self-start relative bg-navy-light/10">
                      {a.imageUrl && (
                        <Image
                          src={a.imageUrl}
                          alt={a.title}
                          fill
                          className="object-cover"
                          sizes="(max-w-768px) 80px, 96px"
                        />
                      )}
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-4 flex flex-col gap-5">
              {/* Browse by topic */}
              <div className="bg-gray-50 border border-border-light rounded-2xl p-5">
                <span className="block text-[10px] font-medium tracking-[0.18em] uppercase text-gray-400 mb-3">Browse by Topic</span>
                <div className="flex flex-wrap gap-2">
                  {categories.filter(c => c.id !== 'all').map(c => (
                    <button
                      key={c.id}
                      onClick={() => setFilter(c.id as Category)}
                      className={`px-3 py-1.5 rounded-full border text-[0.75rem] font-semibold cursor-pointer transition-all ${
                        filter === c.id
                          ? 'bg-blue-default border-blue-default text-white'
                          : 'bg-white border-border-light text-gray-600 hover:border-blue-300 hover:text-blue-600'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1.5 rounded-full border text-[0.75rem] font-semibold cursor-pointer transition-all ${
                      filter === 'all'
                        ? 'bg-blue-default border-blue-default text-white'
                        : 'bg-white border-border-light text-gray-600 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    All Articles
                  </button>
                </div>
              </div>

              {/* Most popular */}
              <div className="bg-gray-50 border border-border-light rounded-2xl p-5">
                <span className="block text-[10px] font-medium tracking-[0.18em] uppercase text-gray-400 mb-3">Most Popular</span>
                <div className="flex flex-col gap-3">
                  {popular.map((a, i) => (
                    <Link
                      key={a._id}
                      href={`/articles/${a.slug}`}
                      className="flex items-start gap-3 cursor-pointer group"
                    >
                      <span className="font-serif text-xl font-medium text-gray-300 w-4 shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.8rem] font-semibold text-navy-text leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">{a.title}</p>
                        <span className="text-[0.7rem] text-gray-400 mt-0.5 block">{a.readDuration} · {a.views || 0} views</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-linear-to-r from-black/80 via-blue-900 to-blue-800 rounded-2xl p-5 text-white">
                <span className="block text-[10px] font-meduim tracking-[0.18em] uppercase text-gray-200 mb-2">New Articles Weekly</span>
                <p className="text-[0.82rem] text-gray-300 leading-relaxed mb-4">
                  Get the latest insights from our lab delivered to your inbox every Tuesday.
                </p>
                {!subscribed ? (
                  <form
                    onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }}
                    className="flex flex-col gap-2"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Your work email"
                      className="bg-white border border-white/80 rounded-lg px-3.5 py-2.5 text-[0.85rem] text-black placeholder-gray-400 outline-none focus:border-blue-glow transition-colors w-full"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-blue-default hover:bg-blue-bright text-white font-bold py-2.5 rounded-lg text-[0.85rem] transition-all cursor-pointer border-none w-full"
                    >
                      Subscribe →
                    </button>
                  </form>
                ) : (
                  <p className="text-[0.82rem] text-blue-glow font-semibold">✓ You&apos;re subscribed!</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-14 text-white text-center sm:text-left">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight mb-2">
              Want to contribute <em className="italic font-normal">an article?</em>
            </h2>
            <p className="text-white/70 text-[0.92rem]">
              We welcome clinical perspectives from dental professionals. Get in touch with our editorial team.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0 justify-center">
            <Link
              href="/callback"
              className="inline-block bg-white hover:bg-gray-50 text-blue-700 font-bold py-3 px-7 rounded-lg text-sm shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Submit an Article →
            </Link>
            <Link
              href="/education"
              className="inline-block bg-transparent hover:bg-white/8 text-white font-medium py-3 px-6 rounded-lg text-sm border border-white/25 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Browse Education
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
