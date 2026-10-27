'use client';

import React from 'react';
import Image from 'next/image';
import { Users, GraduationCap } from 'lucide-react';

export default function EcosystemOverview() {
  return (
    <section id="filosofi" className="py-28 md:py-36 bg-paper">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        {/* Section Intro */}
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-ink leading-tight">
            Menjangkau Anggota dan Institusi
          </h2>
          <p className="text-base sm:text-lg text-ink leading-relaxed font-normal">
            ClosePay dirancang fleksibel untuk menghubungkan ekosistem komunitas bisnis retail hingga lingkungan pendidikan formal.
          </p>
        </div>

        {/* Two-Column Editorial Spread */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {/* Column 1: Member Experience */}
          <div id="member-section" className="bg-stone-light rounded-3xl p-8 sm:p-12 space-y-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-stone flex items-center justify-center text-forest">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-ink">
                ClosePay Member
              </h3>
              <p className="text-base text-ink leading-relaxed">
                Aplikasi manajemen keanggotaan bisnis yang memungkinkan pelanggan mendaftar, mengakses kartu identitas digital dengan kode QR unik, serta mempercepat proses verifikasi di meja kasir.
              </p>
            </div>

            {/* Authentic Visual Framing */}
            <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-paper">
              <Image
                src="/assets/closepay/09_member_experience.webp"
                alt="Antarmuka ClosePay Member Experience"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="pt-2 flex items-center justify-between text-sm text-ink font-medium">
              <span>Pendaftaran Akun & Kartu QR Digital</span>
              <span className="text-forest-hover font-bold">Tersedia</span>
            </div>
          </div>

          {/* Column 2: Institutional / PMB Suite */}
          <div id="institutional-section" className="bg-stone-light rounded-3xl p-8 sm:p-12 space-y-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-stone flex items-center justify-center text-forest">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-ink">
                Institutional / PMB
              </h3>
              <p className="text-base text-ink leading-relaxed">
                Portal digital untuk institusi pendidikan: mempermudah calon siswa atau mahasiswa mengisi formulir pendaftaran daring dan mengunggah berkas, dengan dasbor admin terpusat.
              </p>
            </div>

            {/* Authentic Visual Framing */}
            <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-paper">
              <Image
                src="/assets/closepay/10_institutional_pmb.webp"
                alt="Antarmuka ClosePay Institutional PMB"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="pt-2 flex items-center justify-between text-sm text-ink font-medium">
              <span>Registrasi Daring & Verifikasi Berkas</span>
              <span className="text-forest-hover font-bold">Tersedia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
