'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mic } from 'lucide-react';

export default function TalksPage() {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featured, setFeatured] = useState<{
    youtubeId: string; episodeNumber: number; title: string; guest: string; duration: string;
  } | null>(null);
  const [filter, setFilter] = useState<'all' | 'clinical' | 'technology' | 'materials' | 'business'>('all');
  const [search, setSearch] = useState('');
  const [optinUnlocked, setOptinUnlocked] = useState(false);

  useEffect(() => {
    const handleUnlock = () => { setOptinUnlocked(true); };
    window.addEventListener('optin-unlocked', handleUnlock);

    // Auto-unlock if user already submitted their details in a previous visit
    const savedEmail = localStorage.getItem('synergy_talks_email');
    if (savedEmail) setOptinUnlocked(true);

    const fetchData = async () => {
      try {
        const [epsRes, featRes] = await Promise.all([
          fetch(`/api/talks?t=${Date.now()}`),
          fetch(`/api/talks/featured?t=${Date.now()}`),
        ]);
        if (epsRes.ok) setEpisodes(await epsRes.json());
        if (featRes.ok) {
          const f = await featRes.json();
          if (f) setFeatured(f);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => window.removeEventListener('optin-unlocked', handleUnlock);
  }, []);

  const openUnlockModal = () => {
    window.dispatchEvent(new Event('open-optin-modal'));
  };

  const playVideo = (videoId: string, ep: string, title: string, guest: string) => {
    window.dispatchEvent(
      new CustomEvent('open-video-modal', {
        detail: { videoId, ep, title, guest },
      })
    );
  };

  const categories = [
    { id: 'all', label: 'All Episodes' },
    { id: 'clinical', label: 'Clinical' },
    { id: 'technology', label: 'Technology' },
    { id: 'materials', label: 'Materials' },
    { id: 'business', label: 'Business' }
  ];

  const filteredEps = episodes.filter(ep => {
    const mc = filter === 'all' || ep.cat === filter;
    const ms = !search || 
      ep.title.toLowerCase().includes(search.toLowerCase()) || 
      ep.guest.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  });


  return (
    <div>
      {/* Podcast Hero */}
      <section className="relative bg-navy pt-22 md:pt-32 pb-10 md:pb-16 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none border-b border-white/6">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:48px_48px] pointer-events-none" />
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 bg-cyan-300/12 border border-cyan-400/30 text-[#00B4D8] text-[10px] md:text-[11px] font-bold tracking-[0.13em] uppercase px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse-custom" />
              New episodes weekly
            </div>
            <h1 className="font-serif text-4xl sm:text-7xl font-extrabold tracking-tight text-white mb-5 leading-[1.06]">
              Synergy<em className="italic text-cyan-500">Talks.</em>
            </h1>
            <p className="text-sm md:text-[16px] text-muted-dark leading-relaxed max-w-[450px] mb-9">
              Short & long-form conversations with dentists, lab technicians, and industry leaders — exploring the future of digital dentistry.
            </p>

          <div className="flex md:flex-wrap gap-3.5 shrink-0 justify-start mb-8">
            <Link href="#talks" className="inline-block bg-cyan-500 hover:bg-cyan-500/80 text-white font-bold py-3 px-6 rounded-md text-xs md:text-sm shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              Browse All Episodes
            </Link>
            <Link href="https://www.youtube.com/@Synergy_Talks" target="_blank" rel="noopener noreferrer" className="inline-block bg-transparent hover:bg-white/6 text-white font-medium py-3 px-6 rounded-lg text-xs md:text-sm border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              Listen on Podcast →
            </Link>
          </div>

            {/* Featured ep */}
            <div className="flex md:flex-wrap gap-8">
              <div className="text-center md:text-left">
                <span className="font-serif text-3xl md:text-4xl font-extrabold text-white block leading-none">40<em className="not-italic text-cyan-500">+</em></span>
                <span className="text-[10px] md:text-xs text-muted-dark tracking-wider uppercase mt-1.5 block">Episodes</span>
              </div>
              <div className="text-left">
                <span className="font-serif text-3xl md:text-4xl font-extrabold text-white block leading-none">15<em className="not-italic text-cyan-500">k</em></span>
                <span className="text-[10px] md:text-xs text-muted-dark tracking-wider uppercase mt-1.5 block">Monthly listeners</span>
              </div>
              <div className="text-left">
                <span className="font-serif text-3xl md:text-4xl font-extrabold text-white block leading-none">4.9<em className="not-italic text-cyan-500">★</em></span>
                <span className="text-[10px] md:text-xs text-muted-dark tracking-wider uppercase mt-1.5 block">Average rating</span>
              </div>
            </div>
          </div>

          {/* Featured Video Component */}
          <div className="lg:col-span-6">
            {featured ? (
              <div
                className="bg-[#0f1e5a] rounded-2xl overflow-hidden shadow-2xl cursor-pointer w-full max-w-[480px] mx-auto lg:mx-0 lg:ml-auto"
                onClick={() => playVideo(featured.youtubeId, `Ep. ${featured.episodeNumber}`, featured.title, featured.guest)}
              >
                {/* Real YouTube thumbnail */}
                <div className="aspect-video relative overflow-hidden group">
                  <img
                    src={`https://img.youtube.com/vi/${featured.youtubeId}/maxresdefault.jpg`}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // fallback to hqdefault if maxres not available
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${featured.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center group-hover:bg-white/25 group-hover:scale-105 transition-all">
                      <svg className="ml-1 text-white" width="20" height="22" viewBox="0 0 16 18" fill="none">
                        <path d="M1 1.5L15 9L1 16.5V1.5Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <span className="absolute bottom-4 left-5 z-10 text-[0.78rem] text-white/60 font-semibold">
                    Featured Episode — Ep. {featured.episodeNumber}
                  </span>
                </div>
                {/* Card info */}
                <div className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[0.68rem] font-bold tracking-widest text-cyan-400 uppercase">Episode {featured.episodeNumber}</span>
                    <span className="text-white/20">·</span>
                    <span className="text-[0.68rem] font-bold tracking-widest text-cyan-400 uppercase">Latest</span>
                  </div>
                  <h3 className="font-serif text-[1.1rem] font-bold text-white mb-1 leading-snug">{featured.title}</h3>
                  <p className="text-[0.8rem] text-muted-dark">
                    {featured.guest}{featured.duration ? ` · ${featured.duration}` : ''}
                  </p>
                </div>
              </div>
            ) : (
              /* Skeleton while loading */
              <div className="bg-[#0f1e5a] rounded-t-2xl overflow-hidden shadow-2xl w-full max-w-[480px] mx-auto lg:ml-auto animate-pulse">
                <div className="aspect-video bg-white/5" />
                <div className="px-5 py-4 space-y-2">
                  <div className="h-3 bg-white/10 rounded w-1/3" />
                  <div className="h-5 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/10 rounded w-1/2" />
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Filter and Search sticky bar */}
      <div className="bg-white border-b border-border-light py-3 md:py-5 text-navy-text md:sticky md:top-[60px] z-[20]">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Category filters — scrollable on mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-nowrap sm:flex-wrap pb-0.5 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full border font-semibold text-[0.75rem] cursor-pointer transition-all ${
                  filter === cat.id
                    ? 'bg-blue-default border-blue-default text-white'
                    : 'bg-white border-border-light text-gray-500 hover:border-gray-300 hover:text-navy-text'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2.5 bg-gray-50 border border-border-light rounded-lg px-3.5 py-2 focus-within:border-blue-default transition-colors w-full sm:w-[220px] shrink-0">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-400 shrink-0"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              type="text" 
              placeholder="Search episodes..." 
              className="bg-transparent border-none outline-none text-[0.82rem] text-navy-text placeholder-[#aab4ce] w-full"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Episodes Grid Section */}
      <section id='talks' className="bg-white text-navy-text py-14">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <span className="w-10 h-10 border-4 border-blue-default border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredEps.length === 0 ? (
            <section className="bg-white py-20 text-center">
              <div className="max-w-md mx-auto px-6 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 text-gray-400 border border-gray-100">
                  <Mic  size={32}/>
                </div>
                <h3 className="font-serif text-xl font-bold text-navy-text mb-2">no episodes yet!</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Check back soon
                </p>
              </div>
            </section>
          ) : (

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {filteredEps.map((ep, i) => {
                const locked = ep.locked && !optinUnlocked;
                return (
                  <div 
                    key={ep.id} 
                    className={`reveal bg-white border border-border-light rounded-2xl overflow-hidden hover:shadow-premium hover:-translate-y-1.5 transition-all duration-300 flex flex-col relative ${
                      locked ? 'group' : ''
                    }`}
                  >
                    {locked && (
                      <>
                        <div className="absolute top-3 left-3 z-[15] bg-blue-default/85 text-white text-[0.64rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-[4px] select-none">
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                          Members Only
                        </div>
                        <div 
                          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-navy/88 backdrop-blur-[4px] rounded-2xl p-6 text-center cursor-pointer hover:bg-navy/78 transition-colors duration-250 text-white"
                          onClick={openUnlockModal}
                        >
                          <div className="w-12 h-12 rounded-full bg-blue-default/20 border border-blue-glow/35 flex items-center justify-center text-white mb-3 shadow-lg select-none">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                          </div>
                          <h4 className="font-serif text-[1.05rem] font-bold text-white mb-1.5 leading-snug">Members Only Episode</h4>
                          <p className="text-[0.78rem] text-white/60 leading-relaxed mb-4 line-clamp-2 max-w-[200px]">{ep.title}</p>
                          <button className="bg-blue-default hover:bg-blue-bright text-white font-semibold py-2 px-5 rounded-lg text-[0.8rem] transition-colors cursor-pointer border-none shadow">
                            Unlock Free Access →
                          </button>
                        </div>
                      </>
                    )}

                    <div className="aspect-video bg-navy-mid relative overflow-hidden flex items-center justify-center shrink-0">
                      {/* YouTube thumbnail for unlocked episodes */}
                      {!locked && ep.videoId && (
                        <img
                          src={`https://img.youtube.com/vi/${ep.videoId}/hqdefault.jpg`}
                          alt={ep.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                      )}
                      <div className="absolute inset-0 bg-navy/30 z-[1] pointer-events-none" />
                      <div className="absolute bottom-2 right-2 z-[3] bg-black/65 px-2 py-0.5 rounded text-[0.68rem] font-semibold text-white">
                        {ep.duration}
                      </div>
                      {!locked && (
                        <div className="absolute inset-0 flex items-center justify-center z-[2] group hover:bg-navy/10 transition-colors cursor-pointer"
                             onClick={() => playVideo(ep.videoId, ep.ep, ep.title, ep.guest)}>
                          <div className="w-11 h-11 rounded-full bg-white/12 border border-white/25 backdrop-blur-md flex items-center justify-center hover:bg-blue-default/70 hover:scale-105 transition-all">
                            <svg className="ml-0.5 text-white" width="14" height="16" viewBox="0 0 16 18" fill="none"><path d="M1 1.5L15 9L1 16.5V1.5Z" fill="currentColor"/></svg>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-5.5 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-default/10 text-blue-default text-[0.65rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{ep.ep}</span>
                        <span className="bg-gray-100 text-gray-500 text-[0.65rem] font-bold px-2 py-0.5 rounded-full">{ep.catLabel}</span>
                      </div>
                      <h3 className="font-serif text-[1.12rem] font-bold text-navy-text mb-2.5 leading-snug line-clamp-2">{ep.title}</h3>
                      <p className="text-[0.8rem] text-gray-500 flex items-center gap-1.5 mb-4 shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                        {ep.guest}
                      </p>
                      <p className="text-[0.83rem] text-gray-500 leading-relaxed mb-5 line-clamp-3">{ep.desc}</p>
                      
                      <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center text-xs shrink-0 font-medium text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {ep.duration}
                        </span>
                        {!locked ? (
                          <button 
                            onClick={() => playVideo(ep.videoId, ep.ep, ep.title, ep.guest)}
                            className="bg-transparent border-none text-blue-600 hover:text-blue-bright font-semibold cursor-pointer text-xs"
                          >
                            Watch now →
                          </button>
                        ) : (
                          <button 
                            onClick={openUnlockModal}
                            className="bg-transparent border-none text-blue hover:text-blue-bright font-bold cursor-pointer text-[0.83rem]"
                          >
                            🔒 Unlock →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-12 md:py-16 text-white text-center sm:text-left">
        <div className="max-w-[1140px] mx-auto px-8 md:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-10">
          <div>
            <h2 className="font-serif text-4xl font-bold leading-tight mb-2">
              Ready to send your<em> first case?</em>
            </h2>
            <p className="text-white/70 text-md">
              Put what you've learned into practice — precision restorations in 5 days.
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 shrink-0 justify-center">
            <a href="https://synergy.greatlab.io/login" target="_blank" rel="noopener noreferrer" className="inline-block bg-white hover:bg-gray-50 text-blue-700 font-bold py-3.5 px-8 rounded-lg text-sm shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center">
              Start a Case →
            </a>
            <Link href="/products" className="inline-block bg-transparent hover:bg-white/6 text-white font-medium py-3.5 px-6 rounded-lg text-sm border border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
