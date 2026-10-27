'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useClosePayMotion() {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add({
      reduced: '(prefers-reduced-motion: reduce)',
      animated: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 1000px)',
      pointer: '(hover: hover) and (pointer: fine)',
    }, context => {
      let disposed = false;
      const { reduced, desktop, pointer } = context.conditions!;
      const html = document.documentElement;
      const header = document.querySelector<HTMLElement>('.site-header')!;
      const lenis = reduced ? null : new Lenis({
        autoRaf: false,
        lerp: 0.095,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
      });
      const tick = (seconds: number) => lenis?.raf(seconds * 1000);
      if (lenis) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }
      html.dataset.motionMode = reduced ? 'reduced' : 'lenis';
      const cleanups: Array<() => void> = [];
      const chapters = ['home', 'fnb', 'member', 'institutional', 'contact'];
      chapters.forEach(id => {
        ScrollTrigger.create({
          trigger: `#${id}`, start: 'top 30%', end: 'bottom 30%',
          onToggle: self => {
            if (!self.isActive) return;
            document.querySelectorAll<HTMLAnchorElement>('.desktop-nav a').forEach(link => {
              if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
              else link.removeAttribute('aria-current');
            });
          },
        });
      });

      const navigate = (event: MouseEvent) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!link?.hash) return;
        const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
        if (!target) return;
        event.preventDefault();
        history.pushState(null, '', link.hash);
        const focus = () => {
          const hadTabindex = target.hasAttribute('tabindex');
          if (!hadTabindex) target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
          if (!hadTabindex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
        };
        const offset = -(header.offsetHeight + 16);
        // Numeric targets avoid adding Lenis's CSS scroll-margin/padding offsets twice.
        const destination = target.getBoundingClientRect().top + window.scrollY + offset;
        if (lenis) lenis.scrollTo(destination, { duration: 1.05, easing: t => 1 - Math.pow(1 - t, 4), onComplete: focus });
        else { window.scrollTo({ top: destination, behavior: 'instant' }); focus(); }
      };
      document.addEventListener('click', navigate);

      if (!reduced) {
        // Entrance, scroll and pointer each own a separate nested layer.
        if (window.scrollY < 100 && !location.hash) {
          gsap.timeline({ defaults: { ease: 'power3.out' } })
            .from('.hero-title-word', { yPercent: 108, rotate: 3, stagger: 0.13, duration: 1.05 }, 0.05)
            .from('.hero-photo-frame', { clipPath: 'inset(0 0 100% 0)', duration: 1.15, ease: 'power3.inOut' }, 0.1)
            .from('.hero-cup img', { y: 65, rotate: 9, opacity: 0, duration: 1.15 }, 0.4)
            .from('.hero-copy p', { opacity: 0, duration: 0.6 }, 0.5)
            .from('.hero-copy .solid-button', { clipPath: 'inset(0 100% 0 0)', duration: 0.65 }, 0.65)
            .from('.hero-caption', { opacity: 0, duration: 0.5 }, 0.85);
        }
        gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.45 } })
          .to('.hero-photo', { y: desktop ? 65 : 24, ease: 'none' }, 0)
          .to('.hero-cup', { y: desktop ? -80 : -28, rotate: -3, ease: 'none' }, 0)
          .to('.hero-title', { y: desktop ? 22 : 8, ease: 'none' }, 0);

        // The camera settles within five seconds; no endless motion competes with reading.
        const breath = gsap.fromTo('.hero-photo img', { scale: 1.035 }, { scale: 1, duration: 4.5, ease: 'sine.inOut' });
        const heroWatch = ScrollTrigger.create({ trigger: '.hero', start: 'top bottom', end: 'bottom top', onToggle: self => {
          breath.paused(!self.isActive || document.hidden);
        } });
        const visibility = () => breath.paused(document.hidden || !heroWatch.isActive);
        visibility();
        document.addEventListener('visibilitychange', visibility);
        cleanups.push(() => document.removeEventListener('visibilitychange', visibility));

        gsap.fromTo('.intro-section h2 span', { color: '#52736d' }, {
          color: '#00343d', ease: 'none',
          scrollTrigger: { trigger: '.intro-section', start: 'top 72%', end: 'center 48%', scrub: 0.4 },
        });
        gsap.from('.member-reveal', {
          clipPath: 'inset(0 100% 0 0)', duration: 1.15, ease: 'power3.inOut',
          scrollTrigger: { trigger: '.member-photo-wrap', start: 'top 86%', once: true },
        });
        gsap.from('.member-photo-wrap img', {
          scale: 1.13, duration: 1.6, ease: 'power2.out',
          scrollTrigger: { trigger: '.member-photo-wrap', start: 'top 86%', once: true },
        });
        gsap.from('.member-emphasis', {
          yPercent: 105, rotate: -3, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.member-copy h2', start: 'top 82%', once: true },
        });
        gsap.from('.institution-image', {
          clipPath: 'inset(15% 10% 15% 10%)', ease: 'none',
          scrollTrigger: { trigger: '.institution-image', start: 'top 90%', end: 'top 35%', scrub: 0.55 },
        });
        gsap.fromTo('.institution-image > div', { yPercent: -3 }, {
          yPercent: 3, ease: 'none',
          scrollTrigger: { trigger: '.institution-image', start: 'top bottom', end: 'bottom top', scrub: 0.5 },
        });
        gsap.fromTo('.contact-section h2 em', { color: 'rgba(0,52,61,0)' }, {
          color: 'rgba(0,52,61,1)', ease: 'none',
          scrollTrigger: { trigger: '.contact-section', start: 'top 75%', end: 'top 30%', scrub: 0.5 },
        });
        if (pointer) {
          document.querySelectorAll<HTMLElement>('.solid-button, .contact-cta').forEach(link => {
            const icon = link.querySelector('.direction');
            const x = gsap.quickTo(icon, 'x', { duration: 0.45, ease: 'power3.out' });
            const y = gsap.quickTo(icon, 'y', { duration: 0.45, ease: 'power3.out' });
            const move = (event: PointerEvent) => {
              const box = link.getBoundingClientRect();
              x(((event.clientX - box.left) / box.width - 0.5) * 14);
              y(((event.clientY - box.top) / box.height - 0.5) * 10);
            };
            const leave = () => { x(0); y(0); };
            link.addEventListener('pointermove', move);
            link.addEventListener('pointerleave', leave);
            cleanups.push(() => { link.removeEventListener('pointermove', move); link.removeEventListener('pointerleave', leave); });
          });
        }
      }

      let refreshTimer: ReturnType<typeof setTimeout>;
      const refresh = () => {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => { lenis?.resize(); ScrollTrigger.refresh(); }, 120);
      };
      const resize = new ResizeObserver(refresh);
      document.querySelectorAll('main > section, footer').forEach(section => resize.observe(section));
      document.fonts.ready.then(() => { if (!disposed) refresh(); });
      html.classList.add('sc-ready');
      refresh();

      return () => {
        disposed = true;
        clearTimeout(refreshTimer);
        resize.disconnect();
        document.removeEventListener('click', navigate);
        cleanups.forEach(cleanup => cleanup());
        lenis?.off('scroll', ScrollTrigger.update);
        gsap.ticker.remove(tick);
        lenis?.destroy();
        gsap.ticker.lagSmoothing(500, 33);
        html.classList.remove('sc-ready');
        delete html.dataset.motionMode;
      };
    });
    return () => media.revert();
  }, []);
}

export { ScrollTrigger, gsap };
