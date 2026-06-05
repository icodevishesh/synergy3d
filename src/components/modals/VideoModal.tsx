'use client';

import React, { useState, useEffect } from 'react';

interface VideoDetail {
  videoId: string;
  ep: string;
  title: string;
  guest: string;
}

export const VideoModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [video, setVideo] = useState<VideoDetail | null>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<VideoDetail>;
      if (customEvent.detail) {
        setVideo(customEvent.detail);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
      }
    };
    window.addEventListener('open-video-modal', handleOpen);
    return () => window.removeEventListener('open-video-modal', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    setVideo(null);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !video) return null;

  return (
    <div 
      className="fixed inset-0 z-[3000] bg-black/45 backdrop-blur-[6px] flex items-center justify-center p-6 transition-opacity duration-250"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl max-w-[800px] w-full overflow-hidden shadow-modal relative transition-transform duration-250 text-navy-text">
        <button 
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 border-none cursor-pointer flex items-center justify-center text-[1rem] text-gray-500 hover:bg-gray-200 transition-colors z-[10]"
          onClick={handleClose}
        >
          ✕
        </button>

        <div className="relative aspect-video w-full bg-black">
          <iframe 
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
            allowFullScreen 
            allow="autoplay; encrypted-media"
            className="absolute inset-0 w-full h-full border-none"
            title={video.title}
          />
        </div>

        <div className="p-6 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-default/10 text-blue-default text-[0.7rem] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {video.ep || 'Testimonial'}
            </span>
          </div>
          <h3 className="text-xl font-bold text-navy-text mb-1 leading-snug">{video.title}</h3>
          {video.guest && (
            <p className="text-[0.88rem] text-gray-500 flex items-center gap-1.5 mt-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              {video.guest}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default VideoModal;
