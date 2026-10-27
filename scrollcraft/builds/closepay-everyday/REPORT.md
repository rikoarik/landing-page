# ClosePay: hasil implementasi dan motion refinement

Status: selesai untuk preview lokal. Halaman yang sudah ada diteruskan, bukan dibangun ulang. Preview: http://localhost:4500. Tidak ada deployment publik, commit, push, atau email terkirim.

Creative direction dan keputusan gerak disusun berdasarkan delegasi eksplisit pengguna, bukan hasil wawancara tambahan. Mode antislop DURING; ENERGY 3 / RHYTHM 3 / MOTION 3. Rincian awal tersedia di [BRIEF.md](BRIEF.md), kepemilikan animasi dan alasan teknik di [MOTION.md](MOTION.md).

## Yang berubah

- Lenis memakai GSAP ticker sebagai satu clock; ScrollTrigger mengikuti event Lenis. Runtime ScrollCraft lama tidak lagi dimuat dan CSS native smooth scroll dimatikan.
- Hero memiliki entrance tipografi bermasker, pembukaan foto, gerak cup yang berlapis, respons pointer, dan kamera yang berhenti setelah 4,5 detik.
- Pilihan tahap F&B mempertahankan kendali manual. Tiket mengikuti tahap dengan spring, sementara penjelasan berganti melalui mask. Tombol resume mengembalikan kendali ke posisi scroll.
- Foto Member dan PMB memiliki karakter reveal berbeda. Navigasi menandai bab aktif. Menu, Purchaser, pergantian teks, garis pilihan, dan CTA mendapat interaksi lokal.
- Magnetik hanya menggerakkan panah, sehingga area klik tidak berpindah. Navigasi memindahkan fokus keyboard setelah sampai ke tujuan.
- Reduced motion menghilangkan Lenis, gerak spasial, kamera, mask tersembunyi, dan sticky scene. Sentuhan mobile tetap native.

Logo, urutan bab, copy produk, pilihan konteks dan aset editorial yang sudah ada dipertahankan. Tidak ada dashboard, fitur atau klaim produk baru.

## Bukti pemeriksaan

| Pemeriksaan | Hasil | Bukti |
| --- | --- | --- |
| Production build dan TypeScript | PASS; halaman utama 182 kB first-load JS menurut Next build | `npm run build`, exit 0 |
| Desktop 1440×900 | PASS; 11 kelompok interaksi, 0 error, 0 pelanggaran Axe, 0 target di bawah 44 px | [verification.json](lab/final/verification.json) |
| Mobile 390×844 | PASS; 11 kelompok interaksi, 0 error, 0 pelanggaran Axe, tanpa overflow | [verification.json](lab/final/verification.json) |
| Compact 360×640 | PASS; CTA hero masuk viewport pertama, 11 kelompok interaksi, 0 error dan pelanggaran Axe | [compact hero](lab/final/compact-hero.png) |
| Tablet 768×1024 | PASS; 10 kelompok interaksi, 0 error dan pelanggaran Axe | [verification.json](lab/final/verification.json) |
| Reduced motion 1440×900 | PASS; 10 kelompok interaksi dan hero diam dalam perbandingan pixel setelah waktu/pointer berubah | [motion verification](lab/motion/verification.json) |
| Wheel inertia | PASS; input 650 px menghasilkan lintasan 67 → 284 → 399 → … → 646 px, tanpa overshoot atau perpindahan ganda | [motion verification](lab/motion/verification.json) |
| Anchor dan fokus | PASS; Member berhenti pada 104,25 px, fokus di section Member, penanda navigasi sesuai | [member frame](lab/motion/member-rest.png) |
| Sinkronisasi F&B | PASS; empat posisi menghasilkan empat tahap; pilihan manual tetap setelah scroll | [motion verification](lab/motion/verification.json) |
| Lifecycle | PASS; tiga siklus perubahan preferensi tidak menambah listener wheel, touch, scroll atau resize | [motion verification](lab/motion/verification.json) |
| Touch | PASS di emulasi Chrome; swipe native berpindah 465 px; order tidak sticky, tanpa overflow | [touch capture](lab/motion/mobile-touch.png) |
| Keyboard | PASS; Enter pada anchor memindahkan fokus, Enter/Space mengoperasikan asal/tahap, Escape menutup menu dan memulihkan fokus | Dua verification JSON |
| Aset gagal dimuat | PASS; error terlihat, retry benar-benar memuat foto setelah koneksi dipulihkan | [image error](lab/final/image-error.png) |
| Konten tanpa JavaScript | PASS untuk konten server dan gambar; kontrol React tetap membutuhkan JavaScript | [motion verification](lab/motion/verification.json) |
| Scrollcraft sampling | PASS; 31 sampel × 3 mode, tidak ada dead-scroll flag atau console error | [desktop](lab/motion-desktop/report.json), [mobile](lab/motion-mobile/report.json), [reduced](lab/motion-reduced/report.json) |
| Visual | Contact sheet ketiga mode, entrance, hero compact, Member, F&B dan PMB ditinjau langsung | [desktop sheet](lab/motion-desktop/sheet.png), [mobile sheet](lab/motion-mobile/sheet.png), [reduced sheet](lab/motion-reduced/sheet.png) |
| Legal links | Kedua URL resmi merespons HTTP 200 | `https://closepay.id/privacy-policy`, `https://closepay.id/term-condition` |
| Diff hygiene | PASS | `git diff --check`, exit 0 |

Pengukuran Chrome lokal: median frame 16,7 ms, p95 16,8 ms; satu long task 54 ms; layout shift pada pemuatan dan interaksi normal sekitar 0,000048. Total shift pengujian 0,72 mencakup perubahan layout yang disengaja saat preferensi OS diganti berulang kali, karena sticky scene dipendekkan menjadi alur biasa. Angka ini bukan benchmark perangkat fisik atau klaim performa produksi.

Harness ScrollCraft tidak mengukur kontras komposit khusus karena halaman tidak memakai cue teks engine. Kontras diperiksa dengan Axe pada kelima konfigurasi dan inspeksi visual terhadap latar solid; tidak diklaim sebagai pengujian otomatis setiap frame animasi.

## Click-through yang direkam

- Logo dan “Kembali ke awal” menuju `#home`; skip link menuju konten; semua target anchor ada.
- Navigasi desktop F&B, Member, Institutional dan kontak membuka bab yang tepat.
- Menu mobile membuka/menutup; Escape memulihkan fokus; keempat tautan menutup menu dan berpindah bab.
- “Ikuti satu pesanan” membuka F&B. Staf kasir dan Kiosk mempertahankan asal pesanan pada seluruh empat tahap.
- Empat tombol tahap, Lanjutkan, Ulangi dan Ikuti posisi halaman mengubah atau memulihkan alur dengan benar.
- Purchaser membuka/menutup keterangan. CTA-nya membawa konteks F&B ke kontak.
- Pendaftaran dan Profil anggota mengubah keterangan; CTA membawa konteks Member.
- Data diri, Dokumen dan Status pendaftaran mengubah keterangan; CTA membawa konteks Institutional.
- Ketiga pilihan kontak membentuk subjek/body email sesuai konteks. Klik CTA email diperiksa dengan intersepsi agar aplikasi email tidak diluncurkan atau pesan terkirim.
- Retry foto memulihkan gambar setelah kegagalan jaringan simulasi. Link legal benar-benar tersedia.

## Temuan yang diperbaiki

1. Dua pemilik scroll: ScrollCraft JS dan Motion scroll dihapus dari runtime, diganti satu jalur Lenis/GSAP. Motion hanya memiliki pointer dan perubahan state.
2. Anchor awal berhenti pada 290,25 px karena offset CSS dihitung lagi oleh Lenis. Target numerik memperbaikinya menjadi 104,25 px. Assertion anchor kini lolos.
3. Pengukuran layout awal mencampur kondisi normal dengan perubahan preferensi OS. Laporan sekarang memisahkan kedua kondisi, tanpa menyembunyikan angka total.
4. Checker desain menandai implementasi fill teks sebagai gradient-text. Efek diganti dengan transisi warna tinta solid; tidak ada ignore/suppression yang ditambahkan.
5. Kamera hero tidak dibuat berulang tanpa batas; settle berhenti dalam lima detik dan tidak bersaing dengan aktivitas membaca.
6. Pemeriksaan awal sebelum refinement menemukan opacity label menurunkan kontras, watermark dekoratif, posisi CTA compact, dan status loading gambar cached. Semuanya telah diperbaiki; bukti lama disimpan di `lab/accessibility-before-fixes.json` dan hasil final berada di `lab/final/`.

## Fingerprint dan batas verifikasi

Grammar tetap editorial field journal dengan interactive foldout. Signature: satu tiket kopi yang dapat diarahkan dari kasir atau kiosk ke tahap Kitchen. Pembukaan berupa komposisi foto berlapis; penutup berupa undangan percakapan dengan konteks yang dipertahankan. Delapan grammar stock ditolak dengan alasan di BRIEF. Registry awal kosong; ini baris pertama dan bukan variasi build terdahulu. Panjang tidak ditambah untuk memenuhi angka viewport karena pengguna meminta struktur sekarang dipertahankan.

Belum diuji pada Safari/iOS/Android fisik. Source aplikasi produk yang dirujuk riset tidak ada di checkout, sehingga fakta produk mengikuti laporan proyek yang diberikan. Review Endor Lenis terbatas oleh koneksi yang tidak tersedia. Audit npm masih mencatat Next.js lama sebagai critical dan PostCSS terkait sebagai high; pembaruan major tidak dicampurkan ke perubahan motion. Gunakan npm/`package-lock.json` untuk instalasi yang telah diverifikasi; `bun.lock` bawaan tidak diperbarui.

Lihat [DELIVERY-GATE.md](DELIVERY-GATE.md) untuk seluruh item antislop dan bukti per item.
