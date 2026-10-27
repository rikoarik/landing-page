'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface FnBProductModule {
  id: string;
  name: string;
  roleTitle: string;
  headline: string;
  narrative: string;
  verifiedFeatures: string[];
  imageSrc: string;
  imageAlt: string;
  operationalImpact: string;
}

const fnbModules: FnBProductModule[] = [
  {
    id: 'pos',
    name: 'Staff POS',
    roleTitle: 'Kasir Front-of-House',
    headline: 'Pencatatan Transaksi Tangkas',
    narrative:
      'Dirancang untuk staf pelayanan dan kasir gerai. Antarmuka sentuh memudahkan pemilihan menu teratur, pencatatan pesanan khusus, dan penyelesaian pembayaran via QRIS serta ragam metode transaksi langsung tanpa hambatan.',
    verifiedFeatures: [
      'Penyusunan menu terstruktur per kategori',
      'Pengelolaan keranjang belanja & kustomisasi pesanan',
      'Integrasi pembayaran digital QRIS & E-Wallet',
      'Penyimpanan lokal saat jaringan terputus',
    ],
    imageSrc: '/assets/closepay/05_fnb_staff_pos.webp',
    imageAlt: 'Tampilan Antarmuka Asli ClosePay Staff POS',
    operationalImpact:
      'Mengurangi antrean meja kasir dan meminimalisir salah input bon manual.',
  },
  {
    id: 'kiosk',
    name: 'Kiosk Mandiri',
    roleTitle: 'Self-Ordering Tamu',
    headline: 'Pemesanan Mandiri Intuitif',
    narrative:
      'Terminal pemesanan mandiri yang ditempatkan di depan gerai atau meja. Memberikan keleluasaan bagi tamu untuk menjelajahi visual menu, memilih opsi hidangan, lalu langsung memindai QRIS mandiri di layar.',
    verifiedFeatures: [
      'Navigasi menu visual yang mudah dipahami tanpa panduan staf',
      'Alur checkout mandiri terintegrasi layar pembayaran',
      'Sinkronisasi langsung ke antrean Kitchen Display dapur',
      'Dukungan dwibahasa Indonesia dan Inggris',
    ],
    imageSrc: '/assets/closepay/06_fnb_kiosk.webp',
    imageAlt: 'Tampilan Antarmuka Asli ClosePay Kiosk Pelanggan',
    operationalImpact:
      'Meningkatkan kenyamanan pesan mandiri dan rerata nilai transaksi tamu.',
  },
  {
    id: 'kitchen',
    name: 'Kitchen Display',
    roleTitle: 'Monitor Dapur KDS',
    headline: 'Jembatan Informasi Seketika',
    narrative:
      'Layar monitor dapur digital yang menampilkan tiket pesanan masuk secara real-time. Memastikan divisi juru masak atau barista mengetahui urutan pesanan dengan status terkelompok: baru, diproses, hingga siap saji.',
    verifiedFeatures: [
      'Penerimaan pesanan otomatis dari Staff POS maupun Kiosk',
      'Pengelompokan status tiket: Baru, Diproses, Selesai',
      'Visibilitas catatan pesanan khusus per pelanggan',
      'Eliminasi kehilangan bon kertas manual di meja racik',
    ],
    imageSrc: '/assets/closepay/07_fnb_kitchen.webp',
    imageAlt: 'Tampilan Antarmuka Asli ClosePay Kitchen Display System',
    operationalImpact:
      'Waktu penyajian lebih presisi dan konsistensi racikan hidangan terjaga.',
  },
  {
    id: 'purchaser',
    name: 'Purchaser',
    roleTitle: 'Pengadaan Bahan Baku',
    headline: 'Kendali Stok dan Pasokan',
    narrative:
      'Modul operasional pengadaan bahan baku yang membantu pengelola kafe atau restoran melacak persediaan yang menipis dan mengajukan permohonan pembelian bahan ke pihak pemasok secara teratur.',
    verifiedFeatures: [
      'Formulir pengajuan kebutuhan bahan baku berkala',
      'Pemantauan status barang belanjaan yang masuk',
      'Konektivitas langsung ke data menu gerai',
      'Rekapitulasi riwayat pengadaan untuk kalkulasi biaya',
    ],
    imageSrc: '/assets/closepay/08_fnb_purchaser.webp',
    imageAlt: 'Tampilan Antarmuka Asli ClosePay Purchaser Pengadaan',
    operationalImpact:
      'Mencegah kekosongan bahan favorit saat jam sibuk operasional resto.',
  },
];

export default function FnBShowcase() {
  const [activeTab, setActiveTab] = useState<string>('pos');
  const activeModule = fnbModules.find((m) => m.id === activeTab) || fnbModules[0];

  return (
    <section id="fnb-showcase" className="relative scroll-mt-28 py-28 md:py-36 bg-paper-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header: Headline 1 line */}
        <div className="max-w-3xl mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-ink leading-tight tracking-tight">
            Empat Pilar Operasional Restoran
          </h2>

          <p className="text-base sm:text-lg text-ink font-normal leading-relaxed">
            ClosePay mengintegrasikan seluruh titik sentuh layanan di restoran Anda — dari pesanan pertama tamu di depan hingga ketersediaan bahan baku di dapur.
          </p>
        </div>

        {/* Tab Switcher: Tone-based fill, no outline box */}
        <div className="mb-12 flex flex-wrap gap-3 p-2 rounded-2xl bg-stone max-w-2xl">
          {fnbModules.map((module) => {
            const isActive = activeTab === module.id;
            return (
              <button
                key={module.id}
                type="button"
                onClick={() => setActiveTab(module.id)}
                className={`relative flex-1 min-w-[130px] sm:min-w-[140px] px-5 py-3.5 rounded-xl text-left transition-colors duration-200 ${
                  isActive
                    ? 'text-ink font-semibold'
                    : 'text-ink-muted hover:text-ink font-medium'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-paper rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <div className="relative z-10">
                  <span className="block text-sm text-ink-muted font-sans font-medium">
                    {module.name}
                  </span>
                  <span className="text-sm block mt-0.5 font-sans font-semibold text-ink">
                    {module.roleTitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Product Display Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-stone-light rounded-3xl p-8 sm:p-12"
          >
            {/* Left Column: Product Story & Specifications */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-ink leading-snug">
                {activeModule.headline}
              </h3>

              <p className="text-base text-ink leading-relaxed">
                {activeModule.narrative}
              </p>

              {/* Verified Capabilities Checklist */}
              <div className="pt-4 space-y-3">
                <span className="text-sm text-ink-muted font-semibold block">
                  Kemampuan Terverifikasi
                </span>
                <ul className="space-y-3">
                  {activeModule.verifiedFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-ink font-medium">
                      <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Operational Value Box */}
              <div className="p-5 rounded-2xl bg-paper text-sm text-ink leading-relaxed">
                <span className="font-bold text-ink block mb-1">Dampak Operasional:</span>
                {activeModule.operationalImpact}
              </div>
            </div>

            {/* Right Column: Authentic UI Showcase Artwork */}
            <div className="lg:col-span-7 relative">
              <div className="relative rounded-2xl overflow-hidden bg-paper">
                {/* Minimalist Top Device Bar */}
                <div className="px-5 py-3 bg-stone flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-dark" />
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-dark/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-dark/60" />
                  </div>
                  <span className="text-xs font-mono text-ink font-medium">
                    closepay.id / {activeModule.id}
                  </span>
                  <div className="w-12" />
                </div>

                {/* The Authentic Product Screenshot */}
                <div className="relative w-full aspect-[16/10] bg-stone-light">
                  <Image
                    src={activeModule.imageSrc}
                    alt={activeModule.imageAlt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority
                  />
                </div>

                {/* Caption Bar */}
                <div className="px-5 py-3 bg-stone flex items-center justify-between text-sm text-ink font-medium">
                  <span>Antarmuka Asli ClosePay F&B Suite</span>
                  <span className="text-forest font-semibold">Resolusi Produksi</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Holistic Ecosystem Flow */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          <div className="space-y-2">
            <span className="text-sm text-forest font-semibold">Tahap satu</span>
            <h4 className="text-base font-semibold text-ink">Pesanan Masuk</h4>
            <p className="text-sm text-ink leading-relaxed">
              Tamu memesan langsung di Kiosk mandiri atau kasir mencatat via Staff POS.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-forest font-semibold">Tahap dua</span>
            <h4 className="text-base font-semibold text-ink">Pembayaran Berhasil</h4>
            <p className="text-sm text-ink leading-relaxed">
              Transaksi tercatat instan lewat QRIS atau dompet digital tanpa selip bon.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-forest font-semibold">Tahap tiga</span>
            <h4 className="text-base font-semibold text-ink">Tiket Dapur Aktif</h4>
            <p className="text-sm text-ink leading-relaxed">
              Kitchen Display menerima antrean urut sehingga juru masak langsung bekerja.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-sm text-forest font-semibold">Tahap empat</span>
            <h4 className="text-base font-semibold text-ink">Stok Terkonsolidasi</h4>
            <p className="text-sm text-ink leading-relaxed">
              Modul Purchaser mendata kebutuhan bahan habis untuk persiapan belanja berikutnya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
