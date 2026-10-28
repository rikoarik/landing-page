# ClosePay: product presentation refinement

Preview lokal: http://localhost:4501. Refinement meneruskan halaman yang sama, termasuk hero, identitas, alur tiket F&B, Lenis, GSAP dan Motion. Tidak ada deployment, commit, push atau email terkirim. Creative direction mengikuti delegasi pengguna; antislop DURING, ENERGY 3 / RHYTHM 3 / MOTION 3.

## Hasil visual dan cerita produk

- F&B: potongan menu asli menjadi konteks bagi detail varian dan jenis pesanan. Checkout, Kitchen dan transaksi mendapat bidang baca lebar. Kontrol pemeriksaan gambar dipindah ke bawah agar tidak menyerupai bingkai aplikasi tambahan.
- Member: pengalaman pelanggan F&B, dari restoran/menu ke varian, checkout dan QRIS. Komposisi menghubungkan menu/minuman dengan detail pilihan. Pengunjung bisa membandingkan antarmuka varian pelanggan dengan kasir, serta membuka halaman masuk.
- SIAKAD: indeks kegiatan KRS, jadwal, tagihan dan ringkasan akademik. Lembar informasi diperluas, dengan crop mobile khusus untuk detail sumber yang relevan.
- PMB: tiga folio editorial memperlihatkan data pendaftar, dokumen pendukung dan administrasi. Ini berlabel ilustrasi alur dari riset, bukan screenshot atau formulir aplikasi. Tidak ada status kelulusan, field, transaksi atau fitur otomatis yang dikarang.
- Semua screenshot bersumber dari `public/assets/closepay/`, tanpa mengganti warna atau isi UI. Gambar utuh tersedia melalui dialog, dengan pilihan ukuran asli dan sesuaikan layar.

Batas fakta dan alasan setiap komposisi ada di [PRODUCT-STORY.md](PRODUCT-STORY.md). Riset (8) menyebut source aplikasi yang tidak tersedia di checkout; PMB mengikuti temuan terbatas dari riset tersebut, bukan verifikasi backend baru. Bukti screenshot dan koreksi pengguna mengungguli copy Member lama.

## React Bits dan kepemilikan motion

[React Bits](https://reactbits.dev/) dipelajari melalui dokumentasi resmi SplitText, ScrollExpand dan AccordionGallery. Pola word-mask dan ekspansi bidang diimplementasikan khusus dalam sistem animasi yang ada, bukan mengimpor komponen atau menambah dependency. Image Trail tidak digunakan karena tidak membantu membaca alur produk.

GSAP mengatur masuknya kata, konteks visual, dan ekspansi lembar SIAKAD. Motion mengatur pergantian screenshot, kamera crop, penjelasan, dan susunan folio PMB. Keduanya memiliki elemen berbeda. Lenis tetap memakai satu GSAP ticker dengan ScrollTrigger update; tidak ada clock scroll kedua. Dialog menghentikan Lenis, menjaga scrolling gambar tetap native, dan memulihkan fokus saat ditutup. Reduced motion menghilangkan perpindahan spasial dan menampilkan pilihan langsung.

## Bukti validasi

| Pemeriksaan | Hasil dan bukti |
| --- | --- |
| Production build + TypeScript | PASS, halaman utama 187 kB first-load JS; `npm run build`, exit 0 |
| Desktop 1440×900 | PASS, 0 error runtime, 0 pelanggaran Axe, tanpa overflow atau target di bawah 44 px |
| Mobile 390×844 dan 360×640 | PASS, hasil yang sama, semua jalur produk dan kontrol asli diperiksa |
| Tablet 768×1024 | PASS, hasil yang sama |
| Reduced motion 1440×900 | PASS, seluruh pilihan tetap bekerja tanpa Lenis |
| Interaksi produk | 45 kelompok pemeriksaan pada lima konfigurasi; [verification.json](lab/product-final/verification.json) |
| Gagal gambar + retry | PASS, source gambar diblokir lalu dipulihkan; retry memuat screenshot asli |
| Sampling scroll | 37 frame per mode desktop/mobile/reduced, 111 frame; tidak ada dead-scroll flag, request gagal atau console error |
| Visual produk | 48 frame yang posisi viewport-nya diperiksa pada desktop/mobile/compact; [frame evidence](lab/product-frames/verification.json) |
| Inertia dan sinkronisasi | Satu input wheel bergerak menuju target tanpa overshoot; empat posisi tiket sesuai empat tahap; pilihan manual bertahan |
| Lifecycle | Tiga siklus preferensi motion tidak menambah listener scroll/wheel/touch/resize |
| Keyboard dan dialog | Pilihan bekerja dengan Enter/Space; outline terlihat; Escape menutup dialog dan fokus kembali; background native modal tidak menerima tab |
| Touch | Swipe native diuji melalui emulasi Chrome; tanpa overflow atau sticky scene pada mobile |
| Tanpa JavaScript | Headline, gambar hero, teks server dan anchor tersedia; eksplorasi produk tetap memerlukan JavaScript |
| Diff | `git diff --check` PASS |

Bukti motion: [verification.json](lab/product-motion/verification.json). Pemeriksaan keyboard/dialog dan HTTP 200 kedua link legal: [keyboard.json](lab/product-final/keyboard.json). Frame median 16,7 ms dan p95 16,8 ms; normal-motion CLS 0,000048 pada run Chrome lokal ini. Pengukuran lokal bukan benchmark perangkat fisik. Normal-motion CLS dipisahkan dari perubahan layout saat preferensi OS menghapus sticky scene. Harness tidak mengukur kontras setiap frame karena halaman tidak memakai cue teks engine; Axe menguji kelima konfigurasi, disertai pemeriksaan piksel terhadap bidang baca solid.

Contact sheets: [desktop](lab/refined-desktop/sheet.png), [mobile](lab/refined-mobile/sheet.png), [reduced](lab/refined-reduced/sheet.png). Frame per pilihan ada di `lab/product-frames/`; screenshot yang menyertai click-through ada di `lab/product-final/`. Frame visual terpisah dipakai agar momentum navigasi CTA tidak menggeser screenshot ke bab lain.

## Click-through

Navigasi seluruh bab, menu mobile/Escape, asal pesanan Staff POS/Kiosk, empat tahap tiket, lanjut/ulang, Purchaser, lima pilihan F&B, empat pilihan Member, perbandingan pelanggan/kasir, login/kembali, empat pilihan SIAKAD, tiga tahap PMB, fokus/konteks gambar, buka gambar utuh, ukuran asli/sesuaikan, Escape/tutup, dan keempat konteks kontak diperiksa. Klik mailto diintersepsi; tidak ada pesan dikirim atau pembayaran dibuat.

## Feel check dan score

Urutan rasa setelah meninjau frame: penasaran → dekat → terlibat → memilih → terarah → bersiap → menghubungi. Ini sesuai kurva dasar yang disepakati; PMB menambah jeda persiapan sebelum penutup. F&B tetap satu-satunya held scene dan perubahan alur terbesar. Member dan SIAKAD kini memberi bukti konkret setelah pengalaman tiket; PMB tidak menyamar sebagai produk yang sudah memiliki screenshot.

| Bab | Perangkat visual/motion | Fungsi |
| --- | --- | --- |
| Cover | Tipografi mask, foto dan cup berlapis | Identitas dan konteks manusia; dipertahankan |
| Intro | Alur baca tenang | Jeda sebelum interaksi utama |
| F&B | Tiket interaktif + komposisi menu/detail | Hubungkan aktivitas tim dengan UI asli |
| Member | Sumber menu dan detail pilihan, perpindahan sudut pandang | Jelaskan sisi pelanggan dari F&B |
| SIAKAD | Lembar yang mengembang dan indeks kegiatan | Membaca kegiatan akademik secara bertahap |
| PMB | Folio berpindah menurut peran/tahap | Jelaskan proses tanpa menciptakan antarmuka palsu |
| Contact | Tipografi statis dan konteks tersimpan | Tutup dengan tindakan yang relevan |

Grammar tetap editorial field journal dengan interactive foldout. Penolakan delapan grammar stock ada pada BRIEF. Ini refinement build yang sama, sehingga tidak membuat baris fingerprint baru atau memaksakan perubahan 4/6 dimensi. Tidak ada aset generatif baru; foto editorial yang ada dipertahankan.

## Koreksi selama pemeriksaan dan batas

Label ARIA pada span teks animasi diganti dengan teks utuh untuk pembaca layar; target PMB diperluas menjadi 44 px; jarak folio mobile diperbesar; crop KRS dan tagihan mobile dipusatkan pada detail sumber. Screenshot visual kini diambil terpisah dari navigasi CTA yang masih memiliki momentum.

Belum diperiksa pada perangkat iPhone/Android fisik atau Safari. PMB belum memiliki screenshot asli. Tidak ada perubahan dependency; catatan audit Next/PostCSS dari pekerjaan sebelumnya tetap menjadi urusan pemeliharaan dependency terpisah. Versi lama hasil uji di `lab/final/` dan `lab/motion-*` bukan bukti perubahan ini.

Gate per item: [DELIVERY-GATE.md](DELIVERY-GATE.md).
