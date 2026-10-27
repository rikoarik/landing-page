# Dokumentasi Proyek ClosePay

Direktori ini berisi seluruh dokumen riset, acuan arsitektur, komunikasi merek, ground truth teknis, dan eksplorasi art direction untuk platform **ClosePay**.

---

## Indeks Dokumen Riset (`docs/riset/`)

Setiap dokumen riset mendalam telah dipetakan fungsinya sebagai acuan baku proyek:

| File Acuan | Topik & Peruntukan | Ringkasan Konten |
| :--- | :--- | :--- |
| [**deep-research-report (9).md**](file:///Users/macbookm2/Documents/antigravity/noble-mendel/docs/riset/deep-research-report%20(9).md) | **01: Product & Brand Intelligence** | Portofolio produk ClosePay (F&B POS, Kiosk, Kitchen, Purchaser, Member, PMB), persona target (Budi, Sari, Ayu), alur pengguna, fitur utama & diferensiasi, serta strategi konversi. |
| [**deep-research-report (7).md**](file:///Users/macbookm2/Documents/antigravity/noble-mendel/docs/riset/deep-research-report%20(7).md) | **02: Brand Communication & Copywriting** | Posisi produk terverifikasi, pedoman nada suara (*tone of voice*), hierarki pesan, dan cuplikan copy baku siap pakai (Bahasa Indonesia) untuk hero, fitur F&B, dan PMB. |
| [**deep-research-report (8).md**](file:///Users/macbookm2/Documents/antigravity/noble-mendel/docs/riset/deep-research-report%20(8).md) | **03: Ground Truth (Facts, Evidence & Open Issues)** | Audit implementasi kode aktual vs klaim pemasaran. Bukti file komponen (`PosScreen`, `KitchenScreen`, `RegisterForm`, `RegistrationForm`), endpoint API aktif, skema DB, dan daftar fitur yang belum diimplementasikan (anti-halusinasi). |
| [**deep-research-report (5).md**](file:///Users/macbookm2/Documents/antigravity/noble-mendel/docs/riset/deep-research-report%20(5).md) | **04: Kajian Art Direction Kreatif** | Evaluasi 3 konsep visual (*Kolase Dinamis*, *Laboratorium Digital*, *Narasi Editorial*). Spesifikasi konsep terpilih (*Kolase Dinamis*), hero visual, showcase F&B 4-kolom, timeline animasi Mermaid, dan koreografi scroll. |
| [**deep-research-report (6).md**](file:///Users/macbookm2/Documents/antigravity/noble-mendel/docs/riset/deep-research-report%20(6).md) | **05: Visual Reference Research (Awwwards-Quality)** | Studi komparatif 10 website kelas dunia (Cerebrium, Illoca, Forge, dsb.), 12 pola interaksi/desain modern (*fixed-scroll demo*, *magnetic cursor*, *split-screen*, *lift cards*), dan panduan implementasi teknis. |

---

## Hubungan dengan Antigravity Skill (`.agents/skills/core-konteks/`)

Seluruh pedoman operasional dan ringkasan teknis dari kelima dokumen di atas telah dikunci ke dalam skill otomatis Antigravity di:
👉 [**`.agents/skills/core-konteks/SKILL.md`**](file:///Users/macbookm2/Documents/antigravity/noble-mendel/.agents/skills/core-konteks/SKILL.md)

Skill tersebut menjadi rujukan utama AI saat:
- Merancang dan memodifikasi komponen UI (F&B POS, Kiosk, Kitchen, Member, PMB).
- Menulis dan menata copy landing page sesuai brand communication.
- Mengimplementasikan animasi GSAP ScrollTrigger dan Framer Motion berstandar Awwwards.
- Menjaga keakuratan implementasi kode agar selaras dengan basis data dan API yang sudah ada (*ground truth*).
