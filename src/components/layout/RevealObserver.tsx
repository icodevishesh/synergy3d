'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const RevealObserver: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Slight delay to allow DOM generation to finish
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal:not(.in), .reveal-left:not(.in), .reveal-right:not(.in)');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      );

      els.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};
export default RevealObserver;
