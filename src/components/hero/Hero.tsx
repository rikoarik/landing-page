'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const midY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const foreY = useTransform(scrollYProgress, [0, 1], ['0%', '45%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 16,
      y: (clientY / innerHeight - 0.5) * 16,
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden bg-paper flex items-center"
    >
      {/* Background Archival Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/generated/editorial-texture.jpg')" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Expressive Editorial Copy */}
          <motion.div
            style={shouldReduceMotion ? {} : { y: textY, opacity: opacityFade }}
            className="lg:col-span-7 space-y-8 z-10"
          >
            {/* Headline: Clean, bold, fits in 2 lines */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-ink leading-tightest tracking-tight max-w-2xl"
            >
              Teknologi Transaksi Bernyawa
            </motion.h1>

            {/* Statement paragraph at full readable size */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="text-lg sm:text-xl text-ink font-normal leading-relaxed max-w-xl"
            >
              ClosePay mempertemukan kasir, kios mandiri, dapur, dan pengadaan dalam satu ekosistem operasional yang tenang, terarah, dan transparan.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#fnb-showcase"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-forest text-paper font-semibold text-base hover:bg-forest-hover transition-colors group"
              >
                <span>Eksplorasi F&B Suite</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#filosofi"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-stone text-ink font-semibold text-base hover:bg-stone-dark transition-colors"
              >
                <span>Arsitektur Ekosistem</span>
              </a>
            </motion.div>

            {/* Real Project Verification Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 text-sm text-ink-muted leading-relaxed"
            >
              Dikembangkan oleh <strong className="text-ink font-semibold">PT Teknologi Kartu Indonesia</strong> untuk lingkungan bisnis F&B, keanggotaan retail, dan institusi.
            </motion.div>
          </motion.div>

          {/* Right Column: Layered Artwork Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative w-full max-w-[580px] aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-stone-light p-3 sm:p-5"
            >
              {/* Layer 1: Background Plane */}
              <motion.div
                style={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: bgY,
                        x: mousePosition.x * -0.25,
                      }
                }
                className="absolute inset-3 sm:inset-5 rounded-2xl overflow-hidden pointer-events-none opacity-85"
              >
                <Image
                  src="/assets/closepay/02_hero_background.webp"
                  alt="ClosePay Visual Layer Background"
                  fill
                  className="object-cover scale-105"
                  priority
                />
              </motion.div>

              {/* Layer 2: Midground Plane */}
              <motion.div
                style={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: midY,
                        x: mousePosition.x * 0.35,
                      }
                }
                className="absolute inset-5 sm:inset-7 flex items-center justify-center pointer-events-none z-10"
              >
                <div className="relative w-full h-full max-w-[480px] max-h-[350px]">
                  <Image
                    src="/assets/closepay/03_hero_midground.webp"
                    alt="ClosePay Core Terminal Midground"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>

              {/* Layer 3: Foreground Plane */}
              <motion.div
                style={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: foreY,
                        x: mousePosition.x * 0.7,
                      }
                }
                className="absolute inset-0 flex items-end justify-between p-5 sm:p-7 pointer-events-none z-20"
              >
                <div className="bg-paper px-4 py-2.5 rounded-2xl text-sm font-semibold text-ink">
                  Alur Kasir ke Dapur
                </div>

                <div className="bg-paper px-4 py-2.5 rounded-2xl text-sm font-semibold text-forest">
                  POS Terintegrasi
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
