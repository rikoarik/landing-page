# Antislop delivery gate

PASS untuk lingkup UI dan motion yang diperiksa pada 2026-10-27. Ini bukan sertifikasi aksesibilitas lintas browser atau persetujuan keamanan deployment. Bukti runtime, click-through, visual dan batas pengujian ada di [REPORT.md](REPORT.md). Alasan keputusan ada di [BRIEF.md](BRIEF.md) dan [MOTION.md](MOTION.md).

## Hard gate

- R-02 PASS: tidak ada em dash dalam copy halaman; pemeriksaan source dan teks hasil render.
- R-03 PASS: overflow false di 360, 390, 768 dan 1440 px; contact sheet mobile ditinjau.
- R-17 PASS: tidak ada angka pengguna, transaksi, uptime atau hasil bisnis tanpa sumber.
- R-18 PASS: tidak ada testimoni, nama pelanggan atau jabatan fiktif.
- R-23 PASS: pengguna mengizinkan aset generatif; foto berlabel ilustrasi; logo asli tetap digunakan; refinement tidak menambah aset.
- R-24 PASS: seluruh href anchor memiliki target dan seluruh navigasi diklik; dua link legal HTTP 200.
- R-25 PASS dalam konfigurasi teruji: Axe melaporkan 0 pelanggaran di kelima mode; teks utama berada pada bidang solid; keterbatasan sampling dijelaskan dalam REPORT.
- R-26 PASS: seluruh tombol, select dan link mempunyai perilaku teruji; CTA email membentuk alamat/subjek/body yang benar.
- R-27 PASS: pemuatan foto, gagal, retry dan berhasil diuji; tidak ada dataset yang memerlukan empty state.
- R-28 PASS: tidak ada FAQ generik atau bagian FAQ kosong.
- R-32 PASS: Enter, Space, Tab dan Escape diuji; fokus terlihat; tujuan anchor menerima fokus; menu mengembalikan fokus.
- R-33 PASS: implementasi ditulis langsung pada source TSX/TS/CSS; tidak ada script eksternal yang memodifikasi source saat runtime.
- R-34 PASS: satu tema editorial yang disengaja; tidak ada toggle tema yang tidak berfungsi.
- R-35 PASS: production build exit 0, 45 kelompok pemeriksaan produk, retry gambar, motion verification, dan 111 sampel scroll; click-through dicatat di REPORT.
- R-36 PASS: tidak ada klaim keamanan, compliance, pelanggan atau hasil performa produk yang dibuat-buat.
- R-37 PASS: Design Read, tiga dials, audience, journey dan delegated decisions tercatat sebelum implementasi di BRIEF.
- R-38 PASS: screenshot asli menjadi bukti F&B/Member/SIAKAD; PMB hanya mengikuti temuan terbatas laporan (8) dan berlabel ilustrasi; data contoh berasal dari gambar sumber.

## Purpose gate

- R-01 PASS: tidak ada glow atau gradient dekoratif; fill headline kini warna solid. Pola dua warna pada tepi tiket hanya membentuk sobekan kertas.
- R-04 PASS: SVG panah menjelaskan navigasi/aksi; plus, close dan centang menunjukkan state; tidak ada icon set dekoratif.
- R-06 PASS: Archivo untuk karakter cetak komersial, Plus Jakarta Sans untuk keterbacaan; alasan ada di BRIEF; tidak ada label monospace besar.
- R-07 PASS: tidak ada grid, blueprint atau pola titik latar.
- R-08 PASS: panah dipakai untuk perpindahan, kelanjutan alur dan kontak; indikator arah pada indeks mengarahkan pembacaan ke detail produk terpilih; PMB memakai plus/minus, Member memakai penanda posisi.
- R-09 PASS: tidak ada badge klaim atau pill di atas headline.
- R-10 PASS: tidak ada glassmorphism.
- R-12 PASS: bayangan hanya menjelaskan elevasi cup/tiket dan lapisan folio PMB; screenshot tidak memakai bayangan kartu berulang.
- R-13 PASS: tidak ada glow tersebar pada elemen.
- R-14 PASS: fitur berupa pilihan terbuka dan alur, bukan kartu identik berulang.
- R-19 PASS: entrance, tiket, kamera crop, word-mask, ekspansi SIAKAD dan folio PMB mempunyai fungsi terpisah; ownership tercatat di PRODUCT-STORY; reduced motion lulus.
- R-22 PASS: empat aset spesifik keseharian kafe/anggota/pendaftaran dengan grading bersama; tidak ada blob, stock icon illustration atau filler.

## Liveliness

- Dials PASS: ENERGY 3 / RHYTHM 3 / MOTION 3 tercatat di BRIEF dan MOTION.
- Consistency PASS: cover ekspresif, intro tenang, alur interaktif sebagai puncak, bab faktual lebih tenang; tiga contact sheet ditinjau.
- Focal point PASS: headline/cup, pernyataan manusia, tiket, detail menu Member, lembar akademik SIAKAD, folio PMB dan ajakan kontak menjadi fokus masing-masing bab.
- Whitespace PASS: jarak memisahkan bab dan menjaga area baca; tidak ada viewport kosong yang ditambahkan.
- Accent PASS: jade menandai pilihan aktif dan menutup cerita pada kontak; ink/paper menjadi dasar.
- Identity motif PASS: bidang cetak, mask editorial, potongan UI, lembar/folio dan objek tiket menghubungkan bab tanpa mengulang kartu.
- Design Read PASS: tercatat sebelum generation dalam BRIEF; refinement meneruskan arah yang disetujui.

## Craftsmanship dan quality locks

- C-1 PASS: alasan tipografi, palette, ruang, objek, foto dan motion ditulis dalam BRIEF/MOTION/PRODUCT-STORY.
- C-2 PASS: click-through seluruh kontrol tercatat di REPORT dan kedua verification JSON.
- C-3 PASS: setiap bab memperkenalkan brand, konteks manusia, produk tertentu atau percakapan relevan.
- C-4 PASS dalam lingkup teruji: desktop/tablet/mobile/reduced motion, keyboard, touch emulasi dan gagal gambar diperiksa; perangkat fisik belum diuji.
- C-5 PASS: tidak ada testimoni atau angka performa bisnis yang dikarang; pengukuran teknis diberi konteks lokal.
- R-05 PASS: photographed cover, prose, satu interactive foldout, potongan UI terarah, lembar akademik, folio PMB, typographic close; tidak ada template Hero+cards.
- R-11 PASS: bidang editorial dan kontrol persegi; lingkaran kecil hanya indikator tahap.
- R-15 PASS: CTA menyebut tindakan “Ikuti satu pesanan”, “Lanjutkan pesanan” dan “Bicarakan kebutuhan”.
- R-16 PASS: copy menjelaskan peran produk tanpa buzzword AI atau janji generik.
- R-20 PASS: motif pesanan, pilihan Staff POS/Kiosk, Kitchen dan konteks kontak mengikuti ClosePay; bukan kulit SaaS yang dapat ditukar tanpa perubahan makna.
- R-21 PASS: light editorial menjadi dasar; deep petrol hanya bab alur F&B untuk menonjolkan objek kertas; tidak ada dark mode paksa.
- R-29 PASS: ink, paper, turunan mint dan satu accent jade; warna foto adalah bagian dari fotografi.
- R-30 PASS: komposisi dan signature pesanan tidak menyalin pola Linear/Vercel/Stripe/Notion; fingerprint pertama tercatat.
- R-31 PASS: keputusan utama masing-masing mempunyai alasan singkat pada BRIEF/MOTION; komentar kode tersisa hanya menjelaskan ownership, offset dan batas gerak kamera.

Tidak ada suppression checker desain yang ditambahkan. Peringatan gradient-text diselesaikan dengan mengganti implementasi, bukan menonaktifkan pemeriksa.

Refinement produk: bukti terbaru memakai `lab/product-final`, `lab/product-frames`, `lab/product-motion` dan `lab/refined-*`. Kumpulan `lab/final` dan `lab/motion-*` lama disimpan sebagai riwayat, bukan hasil refinement ini. React Bits dipakai sebagai referensi pola interaksi; tidak ada dependency atau handler scroll kedua yang ditambahkan.
