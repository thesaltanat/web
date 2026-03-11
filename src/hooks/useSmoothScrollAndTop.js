'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getLenis } from '@/src/animations/getLenis';

export default function SmoothScrollAndTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Always scroll to top on route change
    setTimeout(() => {
      const lenis = getLenis && getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    }, 0);

    // If hash exists in URL, scroll to section smoothly after a short delay
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.substring(1));
        if (el) {
          const lenis = getLenis && getLenis();
          if (lenis) {
            lenis.scrollTo(el, { immediate: false });
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
    }
  }, [pathname]);

  useEffect(() => {
    // Intercept anchor clicks for hash links
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const hash = anchor.getAttribute('href');
        if (hash && hash.startsWith('#')) {
          const el = document.getElementById(hash.substring(1));
          if (el) {
            e.preventDefault();
            const lenis = getLenis && getLenis();
            if (lenis) {
              lenis.scrollTo(el, { immediate: false });
            } else {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            window.history.replaceState(null, '', hash);
          }
        }
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
