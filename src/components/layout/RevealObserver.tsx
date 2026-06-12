'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const RevealObserver: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
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

    const observeElements = () => {
      const els = document.querySelectorAll('.reveal:not(.in), .reveal-left:not(.in), .reveal-right:not(.in)');
      els.forEach((el) => {
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.bottom < 0) {
          // Already scrolled past — make visible immediately, no animation
          (el as HTMLElement).style.transition = 'none';
          el.classList.add('in');
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial scan
    observeElements();

    // Setup MutationObserver to watch for dynamically loaded nodes
    const mutationObserver = new MutationObserver((mutations) => {
      let hasNewNodes = false;
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
          hasNewNodes = true;
          break;
        }
      }
      if (hasNewNodes) {
        observeElements();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Run extra delayed scans for safety in case mutations happen very fast
    const timers = [
      setTimeout(observeElements, 100),
      setTimeout(observeElements, 300),
      setTimeout(observeElements, 600),
      setTimeout(observeElements, 1200),
    ];

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
};
export default RevealObserver;
