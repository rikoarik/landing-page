---
name: core-konteks
description: Use when developing, designing, modifying, or querying code, architecture, UI components, copy, or animations for the ClosePay platform (F&B POS, Kiosk, Kitchen, Purchaser, Member, and PMB).
---

# Core Konteks Proyek ClosePay

Pedoman acuan baku (single source of truth) untuk seluruh proses perancangan, pengembangan kode, penulisan antarmuka, dan integrasi animasi pada proyek **ClosePay**. Disusun berdasarkan kajian riset komprehensif, arsitektur monorepo, audit kode aktual (ground truth), serta standar art direction berkelas Awwwards.

---

## 1. Identitas & Visi Produk

**ClosePay** adalah platform ekosistem digital terpadu (*all-in-one platform*) yang menyasar tiga vertikal strategis:
1. **F&B Suite**: Ekosistem operasional menyeluruh untuk kafe, resto, dan gerai cepat saji (Staff POS, Kiosk Mandiri, Kitchen Display System/KDS, dan Purchaser/Pengadaan).
2. **Member Suite**: Aplikasi konfigurasi keanggotaan, profil digital, dan kartu identitas QR member.
3. **Institutional/PMB Suite**: Portal pendaftaran digital bagi calon mahasiswa/siswa serta dasbor administrasi penerimaan institusi pendidikan.

### Prinsip Utama Produk
- **Product-First Showcase**: Menampilkan kemampuan dan antarmuka produk riil secara transparan, bukan sekadar ilustrasi abstrak atau janji pemasaran kosong.
- **Reliabilitas Operasional**: Alur kasir cepat, pesanan dapur tersinkronisasi real-time, dan kemampuan bertahan dalam mode offline (*graceful degradation*).
- **Kejelasan Komunikasi**: Bahasa lugas, solutif, berbasis masalah nyata pemilik bisnis (efisiensi kasir, minimnya human error, pembukuan rapi).

---

## 2. Tech Stack Baku Proyek

| Lapisan / Kebutuhan | Teknologi Standar | Catatan & Peruntukan |
| :--- | :--- | :--- |
| **Language** | **TypeScript 5.x** (Strict Mode) | Wajib tipe eksplisit, larangan mutlak penggunaan `any`. |
| **Framework Web** | **Next.js (App Router) / React 18+** | Rendering performan tinggi, SSR/SSG, modular components. |
| **Styling** | **Tailwind CSS + CSS Modules** | Utility-first, strict spacing, fluid typography, dark/light contrast. |
| **Animasi & Motion** | **GSAP (ScrollTrigger)** & **Framer Motion** | GSAP untuk timeline scroll & pinned sections; Framer Motion untuk micro-interactions, magnet hover, & layout transition. |
| **State Management** | **Redux Toolkit** / **Zustand** | Slice per modul (`orderSlice`, `authSlice`, `cartSlice`). |
| **Form Management** | **React Hook Form + Zod** | Validasi skema ketat untuk PMB, checkout, dan pendaftaran. |
| **Ikon & Aset Visual** | **Lucide React** + WebP / SVG murni | Ikon semantik tajam, aset nyata di `/public/assets/closepay/`. |
| **Testing** | **Vitest / Jest** + **RTL** | Coverage target > 70% pada service pembayaran & order. |

---

## 3. Arsitektur Monorepo & Alur Komponen

Struktur repositori terbagi ke dalam arsitektur modular:

```text
root/
├── apps/
│   ├── fnb/                   # Modul Ekosistem F&B
│   │   └── src/
│   │       ├── features/
│   │       │   ├── pos/       # PosScreen.tsx, orderSlice.ts (Antarmuka Kasir)
│   │       │   ├── kiosk/     # KioskScreen.tsx (Self-order pelanggan)
│   │       │   ├── kitchen/   # KitchenScreen.tsx (KDS pesanan baru/proses/selesai)
│   │       │   ├── purchaser/ # PurchaserScreen.tsx (Permintaan bahan baku)
│   │       │   └── payment/   # PaymentService.ts, qrService.ts (QRIS/E-Wallet)
│   │       ├── services/      # offlineSync.ts (Queue & retry mekanisme pesanan)
│   │       ├── config/        # outletConfig.ts (Multi-outlet mapping)
│   │       └── i18n/          # Kamus bahasa (id, en)
│   │
│   ├── member/                # Modul Keanggotaan Bisnis
│   │   └── src/
│   │       └── features/
│   │           ├── auth/      # RegisterForm.tsx, login
│   │           ├── profile/   # ProfilePage.tsx (Data akun member)
│   │           └── memberCard/# CardScreen.tsx (Kartu digital & kode QR)
│   │
│   ├── pmb/                   # Modul Penerimaan Mahasiswa/Siswa Baru
│   │   └── src/
│   │       ├── features/
│   │       │   ├── registration/ # RegistrationForm.tsx (Multi-step form & berkas)
│   │       │   └── admin/        # ApplicantList.tsx (Verifikasi berkas institusi)
│   │       └── utils/            # idGenerator.ts (Nomor unik pendaftar)
│   │
│   └── landing/               # Showcase Landing Page (Awwwards-quality)
│       └── src/
│           ├── components/    # Hero, Showcase, Specs, Interactive Demos
│           └── styles/        # Design tokens & animasi
└── public/
    └── assets/
        └── closepay/          # Screenshot UI asli, mockup produk, visual aset
```

### Endpoint API Utama (Ground Truth)
- `POST /api/payments/qris`: Pembuatan dan verifikasi status pembayaran QRIS statis/dinamis.
- `GET /api/kitchen/orders`: Pengambilan antrean pesanan dapur aktif.
- `POST /api/pmb/register`: Penerimaan data formulir dan payload unggahan berkas PMB.
- `GET /api/pmb/applicants`: Daftar pelamar untuk dasbor admin institusi.

---

## 4. Ground Truth: Fakta vs Klaim (Aturan Anti-Halusinasi)

> [!IMPORTANT]
> Jangan pernah mengasumsikan atau mengklaim fitur yang belum tersedia pada basis kode aktual. Selalu bedakan antara **Fakta Terverifikasi** dan **Fitur Dalam Pengembangan**.

| Fitur / Area | Fakta Kode Saat Ini | Aturan Implementasi & Copy |
| :--- | :--- | :--- |
| **F&B: Loyalty Points** | Belum ada kode modul poin/tier di `apps/fnb`. | Jangan buat UI fiktif penukaran poin di checkout tanpa konfirmasi; fokus pada kecepatan POS & integrasi dapur. |
| **Member: Reward Engine** | Hanya profil dasar dan QR card (`member` table: `id, name, email`). | Jangan janjikan kalkulasi cashback otomatis; arahkan ke verifikasi keanggotaan via QR. |
| **PMB: Pembayaran UKT** | Belum ada integrasi payment gateway di `apps/pmb`. | Jangan janjikan transaksi UKT instan di landing page; sorot proses registrasi berkas online. |
| **PMB: Verifikasi Dokumen** | Form upload file biasa (PDF/JPG), belum ada OCR/AI KYC. | Komunikasikan sebagai sistem upload dokumen terpusat yang diverifikasi tim admin institusi. |
| **F&B: Multi-Outlet** | Terdapat `outletConfig.ts`, UI pemilihan outlet spesifik belum matang. | Desain arsitektur harus tetap memperhitungkan parameter `outletId`. |
| **F&B: Offline Mode** | Mekanisme queue sederhana di `offlineSync.ts`. | Implementasikan penanganan error lokal (*graceful degradation*) dan sinkronisasi retry otomatis. |

---

## 5. Standar Desain & Art Direction ("Kolase Dinamis")

Landing page dan komponen promosi ClosePay mengadopsi konsep terpilih: **“Kolase Dinamis” (Dynamic Collage)**, menggabungkan energi modern kasual dengan kredibilitas B2B berstandar Awwwards.

### Design Tokens & Warna
- **Primary Teal**: `#00D19F` (Aksen dinamis, tombol konversi utama, badge aktif).
- **Secondary Blue / Cyan**: `#1AA7EC` (Highlight sekunder, status online, aksen hover).
- **Dark Navy**: `#012D3F` (Latar gelap hero/footer, teks kontras tinggi).
- **Neutral White & Off-White**: `#FFFFFF`, `#F8FAFC` (Latar bersih untuk kontras teks).
- **Aksen Komplementer**: Coral/Orange `#FF6B4A`, Soft Amber `#FFB800` (Notifikasi order masuk & tag urgensi).
- **Aksesibilitas**: Kontras teks memenuhi standar **WCAG AA** minimum 4.5:1.

### Tipografi
- **Headings (Display)**: `Poppins` atau `Montserrat` (Bold / Semi-bold, scale 48px - 72px pada desktop) dengan leading proporsional.
- **Body & Data**: `Inter` atau `Roboto` (Medium / Regular, 16px - 18px, relaxed line-height 1.6) untuk kenyamanan baca data transaksi.
- **Monospace (Data / ID)**: `JetBrains Mono` atau `Fira Code` untuk ID pendaftaran, kode transaksi, dan payload nominal.

### Bahasa Motion & Interaktivitas
1. **Layered Hero**: Teks headline kiri dengan tombol magnetik; sisi kanan kolase berlapis (mockup tablet POS + elemen foto menu + SVG garis melengkung) dengan efek parallax berkecepatan berbeda.
2. **Scroll Choreography (GSAP)**:
   - Pinning pada seksi perbandingan produk saat pengguna menggulir.
   - Kolom showcase F&B (Staff POS, Kiosk, Kitchen, Purchaser) masuk secara berjenjang (*staggered slide-in*).
3. **Micro-Interactions (Framer Motion)**:
   - Tombol CTA utama memiliki efek tarik magnetik saat kursor mendekat.
   - Kartu produk terangkat lembut (*lift effect* - `translateY(-6px)` + bayangan lembut) saat di-hover.
4. **Reduced Motion Fallback**:
   - Wajib menyertakan query `@media (prefers-reduced-motion: reduce)`.
   - Nonaktifkan perpindahan posisi agresif dan gantikan dengan transisi opacity instan.

---

## 6. Pedoman Tone of Voice & Cuplikan Copy Baku (Bahasa Indonesia)

Komunikasi ClosePay mengutamakan bahasa Indonesia yang **percaya diri, lugas, ramah, dan solutif**. Hindari kalimat bertele-tele dan istilah teknis berlebihan.

### Copy Baku Terverifikasi
- **Hero Headline**: *“Jualan Pintar, Gaya Baru”*
- **Hero Subtitle**: *“ClosePay menghubungkan kasir, kios, dan dapur Anda dalam satu platform digital interaktif. Buat pelanggan bahagia dan operasikan bisnis Anda lebih mudah.”*
- **Hero CTA**: *“Coba Demo Sekarang”* (Utama) | *“Jadwalkan Konsultasi”* (Sekunder)
- **F&B Section Headline**: *“Platform All-in-One untuk Restoran Anda”*
  - **Kasir (POS)**: *“Kasir Pintar: Proses transaksi cepat dan rekap otomatis.”*
  - **Kios (Self-Order)**: *“Self-Order Kios: Pelanggan bebas memilih dan pesan sendiri.”*
  - **Dapur (KDS)**: *“Manajemen Dapur: Staf dapur tahu antrean pesanan tanpa salah komunikasi.”*
  - **Purchaser**: *“Pengadaan Otomatis: Pantau persediaan dan ajukan stok bahan dengan mudah.”*
- **PMB Section Headline**: *“Penerimaan Siswa & Mahasiswa Baru Jadi Sederhana”*
  - Subtitle: *“Formulir digital instan, verifikasi berkas terpusat, dan nomor identitas otomatis dalam satu portal.”*

---

## 7. Aturan Koding & Rekayasa Perangkat Lunak

### 1. TypeScript & Type Safety
- Wajib mendeklarasikan interface lengkap untuk setiap entitas:
  ```typescript
  export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    notes?: string;
  }

  export type OrderStatus = 'pending' | 'in_kitchen' | 'ready' | 'completed' | 'cancelled';

  export interface Order {
    orderId: string;
    outletId: string;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    paymentStatus: 'unpaid' | 'paid';
    paymentMethod?: 'qris' | 'gopay' | 'ovo' | 'cash';
    createdAt: string;
  }
  ```

### 2. Penanganan State & Offline Resiliency
- Setiap pemanggilan network harus memiliki penanganan 3 status: `loading`, `error`, dan `success`.
- Transaksi offline pada POS harus disimpan ke antrean lokal dan disinkronkan kembali via `offlineSync.ts` saat event `window.addEventListener('online', ...)` terpanggil.
- Berikan indikator visual yang jelas pada UI kasir ketika aplikasi berjalan dalam mode offline (*badge offline warna amber*).

### 3. Komponen Bersih & Modular
- Pisahkan Presentational Component (UI murni) dari Container/Hook Logic:
  - `PosScreen.tsx` hanya mengatur tata letak dan delegasi aksi.
  - Alur kalkulasi diskon, pajak, dan manipulasi cart berada di custom hooks (mis. `useCart.ts`, `useOrderCheckout.ts`).
- Manfaatkan Tailwind class yang terorganisir: letakkan layout (`flex`, `grid`, `relative`) di depan, diikuti spacing (`p-4`, `m-2`), styling visual (`bg-navy`, `rounded-xl`), dan diakhiri state hover/focus (`hover:scale-105 transition-all`).

---

## 8. Checklist Verifikasi Sebelum Menyelesaikan Tugas

Setiap penambahan fitur, halaman, atau komponen di ClosePay wajib memenuhi:
- [ ] **Type Checked**: `tsc --noEmit` lolos tanpa error dan tanpa `any`.
- [ ] **Ground Truth Compliance**: Tidak menyertakan klaim palsu (misal poin loyalitas atau KYC OCR) tanpa kode pendukung nyata.
- [ ] **Design Alignment**: Memakai palet brand resmi (Teal `#00D19F`, Navy `#012D3F`, dsb.) dan font yang disepakati.
- [ ] **Responsive**: Tampil sempurna di Mobile (375px), Tablet (768px), dan Desktop (1440px).
- [ ] **A11y**: Label tombol jelas, kontras warna terbaca, dan `prefers-reduced-motion` didukung.
- [ ] **Copy Baku**: Menggunakan bahasa Indonesia yang telah disetujui sesuai panduan brand communication.
