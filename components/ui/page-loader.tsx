'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loader from './loader-15';

type LoadState = 'visible' | 'fading' | 'hidden';

export function PageLoader() {
  const [state, setState] = useState<LoadState>('visible');
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const fadeTimer = useRef<ReturnType<typeof setTimeout>>();

  const startHide = () => {
    setState('fading');
    fadeTimer.current = setTimeout(() => setState('hidden'), 400);
  };

  const startShow = () => {
    clearTimeout(fadeTimer.current);
    setState('visible');
  };

  // Hide loader once the initial page has fully loaded
  useEffect(() => {
    const handleLoad = () => setTimeout(startHide, 300);

    if (document.readyState === 'complete') {
      setTimeout(startHide, 300);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Show loader on in-site navigation (route changes)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    startShow();
    const hideTimer = setTimeout(startHide, 800);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(fadeTimer.current);
    };
  }, [pathname]);

  if (state === 'hidden') return null;

  return (
    <div
      aria-hidden="true"
      style={{ transition: 'opacity 0.4s ease' }}
      className={`fixed inset-0 z-[9999] bg-background ${
        state === 'fading' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Loader />
    </div>
  );
}
