'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="kontak" className="bg-stone-light py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Brand & Corporate Entity */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-stone p-1.5">
                <Image
                  src="/assets/brand/closepay-symbol.png"
                  alt="ClosePay Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="font-display text-2xl font-semibold tracking-tight text-ink">
                Close<span className="text-forest">Pay</span>
              </span>
            </div>

            <p className="text-base text-ink leading-relaxed max-w-sm">
              Produk teknologi transaksi dan layanan ekosistem yang dikembangkan oleh{' '}
              <strong className="text-ink font-semibold">PT Teknologi Kartu Indonesia</strong> untuk
              mendukung pertumbuhan bisnis dan mitra institusi.
            </p>

            <div className="text-sm font-mono text-ink">
              Semarang & Jakarta, Indonesia
            </div>
          </div>

          {/* Quick Editorial Navigation */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-sm font-semibold text-ink block">
              Ekosistem Produk
            </span>
            <ul className="space-y-3 text-base text-ink">
              <li>
                <a href="#fnb-showcase" className="hover:text-forest transition-colors">
                  Staff POS & Kiosk
                </a>
              </li>
              <li>
                <a href="#fnb-showcase" className="hover:text-forest transition-colors">
                  Kitchen Display
                </a>
              </li>
              <li>
                <a href="#fnb-showcase" className="hover:text-forest transition-colors">
                  Purchaser & Pasokan
                </a>
              </li>
              <li>
                <a href="#member-section" className="hover:text-forest transition-colors">
                  ClosePay Member
                </a>
              </li>
              <li>
                <a href="#institutional-section" className="hover:text-forest transition-colors">
                  Institusi & PMB
                </a>
              </li>
            </ul>
          </div>

          {/* Consultation CTA Block */}
          <div className="md:col-span-4 space-y-5 bg-stone p-8 rounded-3xl">
            <span className="text-sm text-forest font-semibold block">
              Konsultasi Ekosistem
            </span>
            <h4 className="text-xl font-display font-medium text-ink">
              Mulai diskusikan alur transaksi gerai atau institusi Anda.
            </h4>
            <p className="text-sm text-ink leading-relaxed">
              Tim spesialis kami siap membantu memetakan kebutuhan POS, integrasi dapur, atau sistem
              keanggotaan digital.
            </p>
            <a
              href="mailto:contact@closepay.id"
              className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-full bg-forest text-paper hover:bg-forest-hover transition-colors"
            >
              <span>Hubungi Tim ClosePay</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-ink gap-4 font-mono">
          <div>
            &copy; {new Date().getFullYear()} PT Teknologi Kartu Indonesia. Seluruh hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-6">
            <span>Contemporary Editorial Edition</span>
            <span>Awwwards-Target Craft</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
