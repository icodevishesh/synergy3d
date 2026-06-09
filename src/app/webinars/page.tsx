'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

type Status = 'upcoming' | 'recorded';
type Filter = 'all' | 'upcoming' | 'recorded';

interface Webinar {
  id: string;
  status: Status;
  title: string;
  desc: string;
  duration: string;
  date: string;
  rawDate: string;
  rawTime: string;
  host: string;
  hostRole: string;
  hostEmoji: string;
  hostImage: string;
  views?: string;
  featured?: boolean;
  registered: number;
  youtubeUrl: string;
  videoId: string;
}

interface WebinarSettings {
  id?: string;
  _id?: string;
  bannerTitle: string;
  bannerSubtitle: string;
  date: string;
  time: string;
  duration: number;
  name: string;
  totalRegistrations: number;
}

export default function WebinarsPage() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [settings, setSettings] = useState<WebinarSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');

  // Registration modal states
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const fetchData = async () => {
    try {
      const [webinarsRes, settingsRes] = await Promise.all([
        fetch('/api/webinars'),
        fetch('/api/admin/webinars/settings'),
      ]);
      if (!webinarsRes.ok) throw new Error('Failed to load webinars');
      if (!settingsRes.ok) throw new Error('Failed to load settings');
      
      const webinarsData = await webinarsRes.json();
      const settingsData = await settingsRes.json();

      setWebinars(webinarsData);
      setSettings(settingsData);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openRegisterModal = (webinar: Webinar) => {
    setSelectedWebinar(webinar);
    setRegName('');
    setRegEmail('');
    setRegPhone('');
    setIsRegisterModalOpen(true);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWebinar) return;
    if (!regName || !regEmail || !regPhone) {
      toast.error('All registration fields are required');
      return;
    }

    setIsRegistering(true);
    try {
      const res = await fetch(`/api/webinars/${selectedWebinar.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          whatsAppNumber: regPhone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      toast.success('Successfully registered for webinar!');
      setIsRegisterModalOpen(false);
      fetchData(); // Refresh list to increment registration counter
    } catch (err: any) {
      toast.error(err.message || 'Error registering');
    } finally {
      setIsRegistering(false);
    }
  };

  const playVideo = (videoId: string, title: string, host: string) => {
    window.dispatchEvent(
      new CustomEvent('open-video-modal', {
        detail: { videoId, ep: 'Webinar', title, guest: host },
      })
    );
  };

  const sessions  = webinars;

  const filtered = sessions.filter(w =>
    filter === 'all' || w.status === filter
  );

  const bannerWebinarObject = settings ? {
    id: settings._id || settings.id || '',
    status: 'upcoming' as Status,
    title: settings.bannerTitle,
    desc: settings.bannerSubtitle,
    duration: 'CE Credit Pending',
    date: settings.date,
    rawDate: settings.date,
    rawTime: settings.time,
    host: settings.name,
    hostRole: '',
    hostEmoji: '🔬',
    hostImage: '',
    registered: settings.totalRegistrations,
    youtubeUrl: '',
    videoId: '',
  } : null;

  const total = filtered.length;

  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy pt-36 pb-20 overflow-hidden before:absolute before:inset-0 before:bg-radial-glow before:pointer-events-none">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:50px_50px] pointer-events-none" />

        <div className="max-w-[1140px] mx-auto px-6 md:px-16 relative z-10">
          {/* Breadcrumb */}
          <div className="flex gap-2 text-[0.78rem] text-white/40 mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span className="text-white/20">›</span>
            <span className="text-white/40">Learnings</span>
            <span className="text-white/20">›</span>
            <span className="text-white/70 font-medium">Webinars</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left */}
            <div>
              <span className="block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-blue-glow mb-5">
                Webinars
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl font-extrabold text-white leading-[1.04] mb-6">
                Live & on-demand <br /> <em className="text-blue-glow">expert<br/>sessions.</em>
              </h1>
              <p className="text-[0.98rem] text-muted-dark leading-relaxed max-w-[400px] mb-10">
                Join Synergy 3D&apos;s clinical team for interactive webinars on digital dentistry, materials, workflows, and the future of restorative practice.
              </p>
              {/* Stats */}
              <div className="flex flex-wrap gap-10">
                <div>
                  <span className="font-serif text-3xl font-extrabold text-white block leading-none">
                    30<em className="not-italic text-blue-glow">+</em>
                  </span>
                  <span className="text-[0.68rem] text-muted-dark tracking-[0.14em] uppercase mt-1.5 block">Sessions</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-white block leading-none">
                    5k<em className="not-italic text-blue-glow">+</em>
                  </span>
                  <span className="text-[0.68rem] text-muted-dark tracking-[0.14em] uppercase mt-1.5 block">Registered</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-extrabold text-white block leading-none">Free</span>
                  <span className="text-[0.68rem] text-muted-dark tracking-[0.14em] uppercase mt-1.5 block">Always</span>
                </div>
              </div>
            </div>

            {/* Right: quick-link cards */}
            <div className="flex flex-col gap-3">
              {/* Next live session highlight */}
              <Link
                href={settings ? "#featured" : "#"}
                className="flex items-center gap-4 bg-emerald-900/30 hover:bg-emerald-900/45 border border-emerald-500/30 hover:border-emerald-400/50 rounded-xl px-5 py-4 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                  <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[0.92rem] font-bold text-white leading-snug">Next Live Session</span>
                  <span className="block text-[0.78rem] text-emerald-300/70 mt-0.5">
                    {settings ? `${settings.date} · ${settings.bannerTitle}` : 'No upcoming sessions'}
                  </span>
                </div>
                <svg className="text-white/30 group-hover:text-white/60 transition-colors shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </Link>

              {[
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>,
                  label: 'SynergyTalks Videos',
                  sub: 'Short & long-form podcast episodes',
                  href: '/talks',
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
                  label: 'Education Resources',
                  sub: 'Self-paced guides & courses',
                  href: '/education',
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

      {/* ── Filter bar ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-border-light py-3 md:py-4 text-navy-text md:sticky md:top-[60px] z-[20]">
        <div className="max-w-[1140px] mx-auto px-4 md:px-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {([
              { id: 'all',      label: 'All Webinars' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'recorded', label: 'Recorded' },
            ] as { id: Filter; label: string }[]).map(f => (
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
            {total + (filter === 'all' || filter === 'upcoming' ? 1 : 0)} sessions
          </span>
        </div>
      </div>

      {/* ── Featured webinar banner ─────────────────────────────────────── */}
      {settings && (filter === 'all' || filter === 'upcoming') && (
        <section className="bg-white pt-8 pb-4" id="featured">
          <div className="max-w-[1140px] mx-auto px-4 md:px-16">
            <div className="bg-[radial-gradient(ellipse_at_60%_40%,#1e40af_0%,#0a1045_100%)] rounded-2xl p-7 sm:p-9 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Left content */}
              <div className="sm:col-span-8">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[0.68rem] font-bold tracking-[0.14em] uppercase px-3 py-1.5 rounded-full mb-5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Next Up · {settings.date}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-snug">
                  {settings.bannerTitle ? (
                    settings.bannerTitle.includes('Masterclass') ? (
                      <>
                        {settings.bannerTitle.substring(0, settings.bannerTitle.indexOf('Masterclass'))}
                        <em className="italic text-blue-300 font-extrabold">Masterclass</em>
                        {settings.bannerTitle.substring(settings.bannerTitle.indexOf('Masterclass') + 'Masterclass'.length)}
                      </>
                    ) : settings.bannerTitle
                  ) : (
                    <>
                      Digital Denture <em className="italic text-blue-300 font-extrabold">Masterclass</em>
                    </>
                  )}
                </h2>
                <p className="text-md text-white/65 leading-relaxed mb-5 max-w-[520px]">
                  {settings.bannerSubtitle}
                </p>
                <div className="flex flex-wrap items-center gap-5 text-[0.75rem] text-white/50 mb-6">
                  <span className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {settings.duration ? `${settings.duration} min` : ''}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {settings.date} {settings.time ? `· ${settings.time}` : ''}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    {settings.name}
                  </span>
                </div>
                <button 
                  onClick={() => bannerWebinarObject && openRegisterModal(bannerWebinarObject)}
                  className="bg-blue-default hover:bg-blue-bright text-white font-bold py-2.5 px-7 rounded-lg text-[0.9rem] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-none shadow-lg"
                >
                  Register Free →
                </button>
              </div>

              {/* Right stats */}
              <div className="sm:col-span-4 flex flex-row sm:flex-col gap-3">
                <div className="flex-1 bg-white/8 border border-white/12 rounded-xl p-5 text-center">
                  <span className="font-serif text-4xl font-extrabold text-white block leading-none mb-1">{settings.totalRegistrations}</span>
                  <span className="text-[0.66rem] font-bold tracking-[0.14em] uppercase text-white/40">Registered So Far</span>
                </div>
                <div className="flex-1 bg-white/8 border border-white/12 rounded-xl p-5 text-center">
                  <span className="font-serif text-4xl font-extrabold text-white block leading-none mb-1">Free</span>
                  <span className="text-[0.66rem] font-bold tracking-[0.14em] uppercase text-white/40">No Cost · CE Credit Pending</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── All sessions grid ───────────────────────────────────────────── */}
      <section className="bg-white py-8 pb-20">
        <div className="max-w-[1140px] mx-auto px-4 md:px-16">
          <h2 className="font-serif text-2xl font-bold text-navy-text mb-6">All Sessions</h2>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-semibold">No sessions found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filtered.map(w => (
                <div
                  key={w.id}
                  onClick={() => {
                    if (w.status === 'recorded') {
                      playVideo(w.videoId, w.title, w.host);
                    } else {
                      openRegisterModal(w);
                    }
                  }}
                  className="reveal bg-white border border-border-light rounded-2xl p-5 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                >
                  {/* Status badge */}
                  <div className="flex items-center gap-1.5 mb-3">
                    {w.status === 'upcoming' ? (
                      <div className='flex gap-1 items-center bg-emerald-200/20 py-1 px-2 rounded-full'>
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse mb-0.5" />
                        <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-emerald-500">Upcoming</span>
                      </div>
                    ) : (
                      <div className='flex gap-1 items-center bg-blue-200/20 py-1 px-2 rounded-full'>
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mb-0.5" />
                        <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-blue-500">Recorded</span>
                      </div>
                    )}
                  </div>

                  {/* Title & desc */}
                  <h3 className="font-serif text-[1rem] font-bold text-navy-text mb-2 leading-snug group-hover:text-blue-600 transition-colors flex-1">
                    {w.title}
                  </h3>
                  <p className="text-[0.78rem] text-gray-500 leading-relaxed mb-4 line-clamp-3">{w.desc}</p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-[0.72rem] text-gray-400 mb-5">
                    <span className="flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {w.duration}
                    </span>
                    {w.date && (
                      <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        {w.date}
                      </span>
                    )}
                    {/* {w.views && (
                      <span className="flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        {w.views} views
                      </span>
                    )} */}
                  </div>

                  {/* Footer: host + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-default/10 border border-blue-100 flex items-center justify-center text-sm shrink-0">
                        {w.hostEmoji}
                      </div>
                      <span className="text-[0.75rem] font-semibold text-navy-text">{w.host}</span>
                    </div>
                    {w.status === 'upcoming' ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openRegisterModal(w);
                        }}
                        className="bg-blue-default hover:bg-blue-bright text-white font-bold py-1.5 px-4 rounded-lg text-[0.75rem] transition-all cursor-pointer border-none"
                      >
                        Register →
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          playVideo(w.videoId, w.title, w.host);
                        }}
                        className="bg-transparent border border-border-light hover:border-blue-300 text-navy-text hover:text-blue-600 font-bold py-1.5 px-4 rounded-lg text-[0.75rem] transition-all cursor-pointer"
                      >
                        Watch Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA strip ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1344c4] to-[#0d2e9e] py-14 text-white text-center sm:text-left">
        <div className="max-w-[1140px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight mb-2">
              Suggest a <em className="italic font-normal">webinar topic.</em>
            </h2>
            <p className="text-white/70 text-md">
              Tell us what you want to learn — we build our schedule around practitioner requests.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0 justify-center">
            <Link
              href="/callback"
              className="inline-block bg-white hover:bg-gray-50 text-blue-700 font-bold py-3 px-7 rounded-lg text-sm shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Submit a Topic →
            </Link>
            <Link
              href="/talks"
              className="inline-block bg-transparent hover:bg-white/8 text-white font-medium py-3 px-6 rounded-lg text-sm border border-white/25 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Watch SynergyTalks
            </Link>
          </div>
        </div>
      </section>

      {/* ── Registration Modal ───────────────────────────────────────────── */}
      {isRegisterModalOpen && selectedWebinar && (
        <div 
          className="fixed inset-0 z-[3000] bg-navy/80 backdrop-blur-[8px] flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsRegisterModalOpen(false);
            }
          }}
        >
          <div className="bg-white rounded-2xl w-full max-w-[460px] overflow-hidden shadow-2xl relative transition-transform duration-300 text-navy-text">
            <button 
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 border-none cursor-pointer flex items-center justify-center text-[1rem] text-gray-500 transition-colors z-[10]"
              onClick={() => setIsRegisterModalOpen(false)}
            >
              ✕
            </button>

            <div className="bg-gradient-to-br from-navy-mid to-blue-default px-8 pt-8 pb-6 text-center relative text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:32px_32px] pointer-events-none" />
              <div className="w-12 h-12 rounded-full bg-white/12 border border-white/22 flex items-center justify-center mx-auto mb-3.5 relative z-[1]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold mb-1.5 relative z-[1]">Webinar Registration</h3>
              <p className="text-[0.82rem] text-white/68 leading-relaxed relative z-[1] max-w-[320px] mx-auto">
                Secure your spot for <span className="font-semibold text-white">{selectedWebinar.title}</span>.
              </p>
            </div>

            <div className="px-7 py-6">
              <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[0.72rem] font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Dr. Jane Doe" 
                    className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full text-navy-text"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[0.72rem] font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="jane.doe@example.com" 
                    className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full text-navy-text"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[0.72rem] font-bold text-gray-500 uppercase tracking-wider mb-1">WhatsApp Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+1 (555) 000-0000" 
                    className="bg-gray-50 border border-border-light rounded-lg px-3.5 py-2.5 text-[0.88rem] outline-none focus:border-blue-default transition-colors w-full text-navy-text"
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isRegistering}
                  className="bg-blue-default hover:bg-blue-bright disabled:bg-blue-default/60 text-white font-bold py-3 px-5 rounded-lg text-[0.9rem] transition-all hover:-translate-y-0.5 w-full cursor-pointer mt-2 shadow-md flex items-center justify-center gap-2"
                >
                  {isRegistering ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Registering...
                    </>
                  ) : (
                    'Register for Free Session →'
                  )}
                </button>
                <p className="text-[0.72rem] text-[#aab4ce] text-center">
                  We will send a reminder and link via Email and WhatsApp before the session.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      <Toaster position="bottom-right" />

    </div>
  );
}
