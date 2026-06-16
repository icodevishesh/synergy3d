'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserRound } from 'lucide-react';

type PracticeType = 'all' | 'private' | 'group' | 'dso';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  practice: string;
  location: string;
  tag: string;
  tagColor: string;
  rawTagColor: string;
  stars: number;
  practiceType: PracticeType;
  youtubeId?: string;
  emoji: string;
}

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

export default function CustomerStoriesPage() {
  const [filter, setFilter] = useState<PracticeType>('all');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [textTestimonials, setTextTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storiesRes, testimonialsRes] = await Promise.all([
          fetch(`/api/customers?t=${Date.now()}`),
          fetch(`/api/partners/testimonials?t=${Date.now()}`),
        ]);
        if (storiesRes.ok) {
          const storiesData = await storiesRes.json();
          setTestimonials(storiesData);
        }
        if (testimonialsRes.ok) {
          const testimonialsData = await testimonialsRes.json();
          setTextTestimonials(testimonialsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const playVideo = (videoId: string, title: string, host: string) => {
    window.dispatchEvent(
      new CustomEvent('open-video-modal', {
        detail: { videoId, ep: 'Testimonial', title, guest: host },
      })
    );
  };

  const videoStories = testimonials;
  const textStories = textTestimonials;

  const filteredVideos = videoStories.filter(
    v => filter === 'all' || v.practiceType === filter
  );
  const filteredText = textStories.filter(
    t => filter === 'all' || t.practiceType === filter
  );

  const totalCount = filteredVideos.length + filteredText.length;

  const filters: { id: PracticeType; label: string }[] = [
    { id: 'all',     label: 'All Stories' },
    { id: 'private', label: 'Private Practice' },
    { id: 'group',   label: 'Group Practice' },
    { id: 'dso',     label: 'DSO' },
  ];

  return (
    <div>

      {/* Hero */}
      <section className="relative bg-navy pt-36 pb-20 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-[1140px] mx-auto px-6 md:px-16 relative z-10">
          {/* Breadcrumb */}
          <div className="flex gap-2 text-[0.78rem] text-white/40 mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span className="text-white/20">›</span>
            <span className="text-white/40">Learnings</span>
            <span className="text-white/20">›</span>
            <span className="text-white/70 font-medium">Customer Stories</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left */}
            <div>
              <span className="block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-blue-glow mb-5">
                Customer Stories
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl font-extrabold text-white leading-[1.04] mb-6">
                Real results<br />from<br />
                <em className="italic text-blue-glow font-extrabold">real practices.</em>
              </h1>
              <p className="text-[0.98rem] text-muted-dark leading-relaxed max-w-[400px] mb-10">
                Hear directly from the dentists, prosthodontists, and DSO groups who rely on Synergy 3D every day — and the outcomes they&apos;ve achieved for their patients.
              </p>
              {/* Stats */}
              <div className="flex flex-wrap gap-10">
                <div>
                  <span className="font-serif text-3xl font-extrabold text-white block leading-none">500<em className="not-italic text-blue-glow">+</em></span>
                  <span className="text-[0.68rem] text-muted-dark tracking-[0.14em] uppercase mt-1.5 block">Partner Practices</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-white block leading-none">4.9<em className="not-italic text-blue-glow">★</em></span>
                  <span className="text-[0.68rem] text-muted-dark tracking-[0.14em] uppercase mt-1.5 block">Average Rating</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-white block leading-none">&lt;1<em className="not-italic text-blue-glow">%</em></span>
                  <span className="text-[0.68rem] text-muted-dark tracking-[0.14em] uppercase mt-1.5 block">Remake Rate</span>
                </div>
              </div>
            </div>

            {/* Right: link cards */}
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none"/></svg>
                  ),
                  iconBg: 'bg-amber-500/20 border-amber-400/30 text-amber-400',
                  label: 'Leave a Review',
                  sub: 'Share your Synergy 3D experience',
                  href: 'https://synergy3d.net',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
                  ),
                  iconBg: 'bg-blue-default/20 border-blue-default/30 text-blue-glow',
                  label: 'SynergyTalks',
                  sub: 'In-depth clinician conversations',
                  href: '/talks',
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12h8M12 8v8" strokeLinecap="round"/></svg>
                  ),
                  iconBg: 'bg-blue-default/20 border-blue-default/30 text-blue-glow',
                  label: 'Our Products',
                  sub: 'See what practices are ordering',
                  href: '/products',
                },
              ].map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/18 rounded-xl px-5 py-4 transition-all group"
                >
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${item.iconBg}`}>
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
        <div className="max-w-[1140px] mx-auto px-4 md:px-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-nowrap pb-0.5 sm:pb-0">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full border font-semibold text-[0.75rem] cursor-pointer transition-all ${
                  filter === f.id
                    ? 'bg-blue-default border-blue-default text-white'
                    : 'bg-white border-border-light text-gray-500 hover:border-gray-300 hover:text-navy-text'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span className="text-[0.78rem] text-gray-400 font-semibold whitespace-nowrap hidden sm:block">
            {totalCount} stories
          </span>
        </div>
      </div>

      {/* Video Testimonials */}
      {filteredVideos.length > 0 && (
        <section className="bg-white pt-12 pb-4">
          <div className="max-w-[1140px] mx-auto px-4 md:px-16">
            <span className="block text-[0.68rem] font-extrabold tracking-[0.18em] uppercase text-blue-600 mb-3">Video Testimonials</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-navy-text mb-2 leading-snug">
              Hear it directly from <em className="italic text-blue-600 font-extrabold">our partners.</em>
            </h2>
            <p className="text-[0.88rem] text-gray-500 mb-8">
              Watch real dentists share their experience with Synergy 3D — in their own words.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredVideos.map(v => (
                <div
                  key={v.id}
                  onClick={() => playVideo(v.youtubeId || '', v.title, v.name)}
                  className="reveal bg-white border border-border-light rounded-2xl overflow-hidden hover:shadow-premium hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  {/* YouTube thumbnail */}
                  <div className="aspect-video relative flex items-center justify-center overflow-hidden bg-[#080f35]">
                    {v.youtubeId ? (
                      <img
                        src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                        alt={v.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="w-12 h-12 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/25 group-hover:scale-105 transition-all z-10">
                      <svg className="ml-0.5 text-white" width="16" height="18" viewBox="0 0 16 18" fill="none">
                        <path d="M1 1.5L15 9L1 16.5V1.5Z" fill="currentColor"/>
                      </svg>
                    </div>
                    {/* Stars */}
                    <div className="absolute top-3 left-3 flex gap-0.5 z-10">
                      {Array.from({ length: v.stars || 5 }).map((_, i) => (
                        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      ))}
                    </div>
                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 z-10 bg-black/60 text-white text-[0.65rem] font-semibold px-2 py-0.5 rounded">1:30</div>
                    <span className="absolute bottom-3 left-3 z-10 text-[0.7rem] text-white/70 font-medium">Watch on YouTube</span>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <p className="text-[0.85rem] text-gray-700 leading-relaxed italic mb-4 line-clamp-3">{v.quote}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-default/10 border border-blue-100 flex items-center justify-center text-sm shrink-0">
                          <UserRound className='w-4 h-4 text-blue-default' />
                        </div>
                        <div>
                          <span className="block text-[0.82rem] font-bold text-navy-text leading-tight">{v.name}</span>
                          <span className="block text-[0.72rem] text-gray-400">{v.location}</span>
                        </div>
                      </div>
                      <span className={`text-[0.65rem] font-bold px-2 py-1 rounded-full ${v.tagColor}`}>{v.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More from our parners */}
      {filteredText.length > 0 && (
        <section className="bg-white py-10 pb-8">
          <div className="max-w-[1140px] mx-auto px-4 md:px-16">
            <h2 className="font-serif text-2xl font-bold text-navy-text mb-6">
              More from our <em className="italic text-blue-600 font-bold">partners</em>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredText.map(t => (
                <div
                  key={t.id}
                  className="reveal bg-white border border-border-light rounded-2xl p-5 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                >
                  <span className={`text-[0.7rem] font-semibold mb-3 block text-${t.rawTagColor || 'blue'}-500`}>
                    {t.tag}
                  </span>
                  <p className="text-md text-gray-900 leading-relaxed font-serif italic flex-1 mb-5 line-clamp-4">"{t.quote}"</p>
                  <div className="flex items-center gap-2.5 mt-auto pt-3 border-t border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-blue-default/10 border border-blue-100 flex items-center justify-center text-sm shrink-0">
                      <UserRound className='w-4 h-4 text-blue-default' />
                    </div>
                    <div>
                      <span className="block text-[0.82rem] font-bold text-navy-text leading-tight">{t.name}</span>
                      <span className="block text-[0.7rem] text-gray-400 leading-tight">{t.practice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats ribbon */}
      <section className="bg-white py-20 px-4">
        <div className="bg-navy-mid border-t border-border-dark py-12 text-white max-w-5xl mx-auto rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: '500+',  l: 'Partner Practices' },
            { n: '4.9★',  l: 'Average Rating' },
            { n: '<1%',   l: 'Remake Rate' },
            { n: '98%',   l: 'Digital Production' },
          ].map((s, i) => (
            <div key={i} className="md:border-r border-border-dark last:border-none">
              <span className="font-serif text-3xl font-extrabold text-white block leading-none">{s.n}</span>
              <span className="text-[0.68rem] text-muted-dark tracking-[0.12em] uppercase mt-2 block">{s.l}</span>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-14 text-white text-center sm:text-left">
        <div className="max-w-[1140px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight mb-2">
              Ready to become a <em className="italic font-normal">success story?</em>
            </h2>
            <p className="text-white/70 text-sm">
              Join 500+ practices who trust Synergy 3D for their restorative work every day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0 justify-center">
            <a
              href="https://synergy.greatlab.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white hover:bg-gray-50 text-blue-700 font-bold py-3 px-7 rounded-lg text-sm shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
            >
              Send Digital Scan →
            </a>
            <Link
              href="/products"
              className="inline-block bg-transparent hover:bg-white/8 text-white font-medium py-3 px-6 rounded-lg text-[0.92rem] border border-white/25 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
