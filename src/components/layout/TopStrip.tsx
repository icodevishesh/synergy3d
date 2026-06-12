'use client';

import React, { useState, useEffect } from 'react';

export const TopStrip: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerShipping = () => {
    window.dispatchEvent(new Event('open-shipping-modal'));
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-[301] bg-[#0a0a0a] border-b border-white/8 h-9 hidden lg:flex items-center justify-between px-6 lg:px-17 transition-transform duration-350 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`} id="top-strip">
      <div className="flex items-center gap-0">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/50 pr-4">
          <svg className="text-white/30" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          5-Day Turnaround
          <span className="text-white/20 px-1.5">·</span>
          <svg className="text-white/30" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Made in USA
          <span className="text-white/20 px-1.5">·</span>
          <svg className="text-white/30" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          New York, NY
        </div>
      </div>
      <div className="flex items-center gap-0">
        <a href='https://synergy3d.net/wp-content/uploads/2025/03/synegy-script.pdf' target='_blank' rel='noopener noreferrer' className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/65 hover:text-white px-4.5 transition-colors duration-200 cursor-pointer">
          <span className="flex items-center text-white/40 group-hover:text-white/80">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </span>
          Download Rx Form
        </a>
        <div className="w-px h-3.5 bg-white/15 shrink-0" />
        <button
          onClick={triggerShipping}
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/65 hover:text-white pl-4.5 pr-0 transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none"
        >
          <span className="flex items-center text-white/40 group-hover:text-white/80">
            <svg width="14" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" rx="1" />
              <path d="M16 8h4l3 5v3h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </span>
          Shipping Label
        </button>
        {/* <div className="w-px h-3.5 bg-white/15 shrink-0" /> */}
        {/* <a className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/65 hover:text-white px-4.5 transition-colors duration-200 cursor-pointer">
          Track Case
        </a> */}
      </div>
    </div>
  );
};
