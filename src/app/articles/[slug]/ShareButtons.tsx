'use client';

import React, { useState, useEffect } from 'react';

interface ShareButtonsProps {
  title: string;
  catColor: string;
  catLabel: string;
}

export default function ShareButtons({ title, catColor, catLabel }: ShareButtonsProps) {
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  return (
    <div className="border-t border-gray-100 mt-10 pt-8 flex flex-row justify-between gap-4">
      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-[0.72rem] font-bold px-2.5 py-1 rounded-full ${catColor}`}>{catLabel}</span>
      </div>

      {/* Share buttons */}
      <div className="flex items-center gap-2">
        <span className="text-[0.72rem] text-gray-400 font-semibold mr-1">Share:</span>

        {/* Email */}
        <a
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Check out this article: ' + pageUrl)}`}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-blue-300 hover:text-blue-600 transition-all text-gray-400"
          title="Share via Email"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>

        {/* Twitter/X */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 hover:text-gray-700 transition-all text-gray-400"
          title="Share on X"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>

        {/* Copy link */}
        <button
          onClick={() => { if (pageUrl) navigator.clipboard.writeText(pageUrl); }}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 hover:text-gray-700 transition-all text-gray-400 cursor-pointer"
          title="Copy link"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </button>
      </div>
    </div>
  );
}
