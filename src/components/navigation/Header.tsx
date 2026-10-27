'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-paper/95 backdrop-blur-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-stone p-1.5 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/assets/brand/closepay-symbol.png"
              alt="ClosePay Logo"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">
            Close<span className="text-forest">Pay</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#fnb-showcase"
            className="text-base font-semibold text-ink-muted hover:text-ink transition-colors"
          >
            F&B Suite
          </a>
          <a
            href="#member-section"
            className="text-base font-semibold text-ink-muted hover:text-ink transition-colors"
          >
            Keanggotaan
          </a>
          <a
            href="#institutional-section"
            className="text-base font-semibold text-ink-muted hover:text-ink transition-colors"
          >
            Institusi & PMB
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#kontak"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-full bg-forest text-paper hover:bg-forest-hover transition-colors"
          >
            <span>Jadwalkan Diskusi</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile / Tablet Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-ink bg-stone transition-colors"
          aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-paper px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            <a
              href="#fnb-showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-ink hover:text-forest py-2"
            >
              F&B Suite
            </a>
            <a
              href="#member-section"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-ink hover:text-forest py-2"
            >
              Keanggotaan
            </a>
            <a
              href="#institutional-section"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-ink hover:text-forest py-2"
            >
              Institusi & PMB
            </a>
          </nav>
          <div className="pt-4">
            <a
              href="#kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 text-base font-semibold px-4 py-3.5 rounded-full bg-forest text-paper hover:bg-forest-hover transition-colors"
            >
              <span>Jadwalkan Diskusi</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
