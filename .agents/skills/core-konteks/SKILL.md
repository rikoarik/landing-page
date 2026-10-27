---
name: core-konteks
description: Use when building, designing, styling, or writing copy for the ClosePay landing page and web application.
---

# Core Konteks: ClosePay Web & Landing Page

Panduan acuan baku untuk pengembangan antarmuka, tata letak, styling, animasi, dan copywriting landing page **ClosePay**.

---

## 1. Ringkasan & Karakter Produk
ClosePay adalah platform ekosistem digital untuk tiga sektor:
- **F&B Suite**: Kasir (POS), Kios mandiri, Kitchen Display (KDS), dan Pengadaan (Purchaser).
- **Member Suite**: Aplikasi keanggotaan dan verifikasi QR member.
- **PMB Suite**: Portal pendaftaran digital dan administrasi penerimaan institusi.

> **Pendekatan Utama**: *Product-first showcase*. Tampilkan antarmuka produk nyata secara transparan dan berstandar visual tinggi, bukan ilustrasi generik tanpa konteks.

---

## 2. Tech Stack Proyek
- **Framework**: Next.js (App Router) + React (TypeScript).
- **Styling**: Tailwind CSS (Utility-first, responsive grid, fluid typography).
- **Animasi & Motion**:
  - **GSAP (ScrollTrigger)**: Timeline scroll, pinned sections, dan koreografi berjenjang.
  - **Framer Motion**: Micro-interactions, magnetic hover buttons, dan transisi komponen.
- **Ikonografi**: Lucide React + SVG teroptimasi.

---

## 3. Brand & Art Direction ("Kolase Dinamis")
Mengadopsi konsep visual **Kolase Dinamis** berstandar Awwwards: energetik, modern, namun tetap profesional dan kredibel untuk B2B.

### Design Tokens
- **Primary Teal**: `#00D19F` (Aksen dinamis, tombol aksi utama, badge aktif).
- **Secondary Blue**: `#1AA7EC` (Highlight sekunder, status online).
- **Dark Navy**: `#012D3F` (Latar gelap hero/footer, teks kontras tinggi).
- **Neutral White**: `#FFFFFF` / Slate `#F8FAFC` (Latar bersih).
- **Aksen**: Coral `#FF6B4A` & Amber `#FFB800`.

### Tipografi
- **Headings / Display**: `Poppins` atau `Montserrat` (Bold / Semi-bold, kontras skala tegas).
- **Body Text**: `Inter` (Regular / Medium, line-height lega 1.6).

### Interaktivitas & Aksesibilitas
- **Magnetic Buttons**: Efek kursor magnetik pada CTA utama.
- **Hover Lift**: Kartu produk terangkat halus (`translateY(-4px)` + shadow) saat di-hover.
- **Aksesibilitas**: Kontras teks memenuhi WCAG AA. Wajib mendukung `@media (prefers-reduced-motion: reduce)` tanpa memutus navigasi.

---

## 4. Tone of Voice & Copywriting
- **Gaya Bahasa**: Bahasa Indonesia alami, percaya diri, ringkas, dan solutif.
- **Pantangan**: Jangan gunakan jargon korporat klise atau klaim berlebihan tanpa bukti.
- **Contoh Copy Baku**:
  - *Headline Hero*: “Jualan Pintar, Gaya Baru”
  - *Subheadline Hero*: “ClosePay menghubungkan kasir, kios, dan dapur Anda dalam satu platform digital interaktif.”
  - *CTA Utama*: “Coba Demo Sekarang” | “Jadwalkan Konsultasi”
  - *F&B Section*: “Platform All-in-One untuk Restoran Anda”

---

## 5. Aturan Koding Frontend
1. **Strict TypeScript**: Semua props dan state wajib memiliki tipe yang jelas. Hindari `any`.
2. **Responsif Multi-Layar**: Wajib teruji dan nyaman di Mobile (375px), Tablet (768px), dan Desktop (1440px).
3. **Pemisahan Logika UI**: Komponen presentasional terpisah dari custom hooks atau state helper.
4. **Performa Aset**: Gunakan format WebP atau SVG terkompresi. Aset visual ditempatkan di `/public/assets/closepay/`.

---

## 6. Referensi Riset
Jika membutuhkan data pendukung, persona lengkap, atau benchmark kompetitor, buka dokumen terkait di `docs/riset/`:
- `docs/riset/deep-research-report (9).md` (Product Intelligence)
- `docs/riset/deep-research-report (7).md` (Brand Communication)
- `docs/riset/deep-research-report (5).md` (Kajian Art Direction)
- `docs/riset/deep-research-report (6).md` (Benchmark Visual Awwwards)
