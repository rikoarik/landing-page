'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type ProductContext = 'F&B Suite' | 'Member (F&B)' | 'SIAKAD' | 'PMB';
type Crop = [number, number, number, number];
type Screen = { src: string; width: number; height: number; label: string; crop: Crop; mobileCrop?: Crop };
type Scene = { label: string; title: string; body: string; detail: string; screen: Screen };
const asset = '/assets/closepay/';
const fnbScreen = (file: string, label: string, crop: Crop): Screen => ({ src: `${asset}fnb/${file}.webp`, width: 2048, height: 1152, label, crop });
const memberScreen = (file: string, label: string, crop: Crop): Screen => ({ src: `${asset}member/${file}.webp`, width: 944, height: 2048, label, crop });
const campusScreen = (file: string, label: string, crop: Crop): Screen => ({ src: `${asset}siakad/${file}.webp`, width: 2048, height: 1503, label, crop });

const cashierVariant = fnbScreen('02-product-variant-modal', 'Pilihan varian di Staff POS', [.323, .194, .355, .612]);
const fnbScenes: Scene[] = [
  { label: 'Menu & varian', title: 'Pesanan dimulai dari detail.', body: 'Menu, jumlah, varian, sampai tingkat gula. Kasir mencatat pilihan pelanggan sebelum melanjutkan pesanan.', detail: 'Pilihan varian dan tingkat gula tampil langsung di Staff POS.', screen: cashierVariant },
  { label: 'Jenis pesanan', title: 'Di sini, atau dibawa pergi?', body: 'Pilih makan di tempat atau bungkus. Jenis pesanan memberi konteks sebelum kasir masuk ke checkout.', detail: 'Dua pilihan yang terlihat pada layar jenis pesanan.', screen: fnbScreen('03-order-type-modal', 'Jenis pesanan: makan di tempat atau bungkus', [.397, .38, .206, .24]) },
  { label: 'Checkout', title: 'Periksa. Lalu selesaikan.', body: 'Ringkasan item, total tagihan, dan pilihan pembayaran berada dalam satu layar. Kasir memeriksa pesanan sebelum mengonfirmasi pembayaran.', detail: 'Layar checkout menampilkan opsi Tunai dan QRIS.', screen: fnbScreen('04-cashier-checkout', 'Checkout kasir dan pilihan pembayaran', [.04, .06, .955, .92]) },
  { label: 'Dapur', title: 'Sekarang giliran dapur.', body: 'Kitchen memisahkan pesanan yang menunggu, sedang dimasak, dan selesai. Detail item ikut terbaca pada kartu pesanan.', detail: 'Kartu pesanan pada kolom Dimasak, dengan tindakan Selesaikan.', screen: fnbScreen('07-kitchen-board', 'Kitchen: menunggu, dimasak, selesai', [.36, .13, .32, .34]) },
  { label: 'Transaksi', title: 'Selesai melayani, tetap tercatat.', body: 'Daftar transaksi memperlihatkan jenis pesanan, status pesanan, status bayar, dan metode pembayarannya.', detail: 'Status pesanan dan status bayar ditampilkan sebagai informasi terpisah.', screen: fnbScreen('06-transactions', 'Daftar transaksi F&B', [.045, .13, .94, .48]) },
];

const memberScenes: Scene[] = [
  { label: 'Temukan menu', title: 'Mulai dari yang menggugah selera.', body: 'Pelanggan melihat restoran dan menelusuri menu. Pilihan makanan dan minuman menjadi awal perjalanan pesanannya.', detail: 'Beranda restoran dan pilihan menu.', screen: memberScreen('01-home-restaurant', 'Beranda restoran di ClosePay Member', [.025, .32, .95, .48]) },
  { label: 'Pilih rasa', title: 'Kopi yang sesuai selera.', body: 'Pada detail Iced Latte, pelanggan memilih varian dan tingkat gula sebelum menambahkannya. Detail kecil yang penting saat memesan.', detail: 'Pilihan Gula Aren, Original, Vanilla, dan tingkat gula ada pada layar asli.', screen: memberScreen('03-product-detail', 'Varian dan tingkat gula di Member', [.02, .40, .96, .50]) },
  { label: 'Atur pesanan', title: 'Cara menikmati, juga bisa dipilih.', body: 'Dine In atau Take Away, catatan pesanan, nomor meja, dan informasi pemesan disiapkan pada checkout.', detail: 'Nomor meja ditandai opsional pada layar checkout.', screen: memberScreen('04-checkout', 'Checkout pelanggan: pesanan, meja dan pemesan', [.02, .035, .96, .81]) },
  { label: 'Pembayaran', title: 'Sampai ke langkah pembayaran.', body: 'Layar QRIS menampilkan nominal dan status pembayaran. Pelanggan dapat melihat bahwa pembayaran masih menunggu.', detail: 'Cuplikan status pembayaran. Ini bukan permintaan pembayaran aktif.', screen: memberScreen('05-qris-payment', 'Nominal dan status pembayaran QRIS', [.055, .505, .89, .46]) },
];
const loginScreen = memberScreen('06-login', 'Halaman masuk ClosePay Member', [.04, .28, .92, .56]);

const academicScenes: Scene[] = [
  { label: 'KRS', title: 'Rencanakan semester berikutnya.', body: 'Lihat mata kuliah, pilihan kelas, jadwal, dan kapasitas peserta saat menyusun KRS. Informasi pilihan dibaca sebelum disimpan.', detail: 'Pilihan kelas dan kapasitas peserta pada Pengajuan KRS.', screen: campusScreen('02-krs', 'Pengajuan KRS: pilihan kelas dan kapasitas', [.145, .345, .83, .31]) },
  { label: 'Jadwal kuliah', title: 'Tahu kapan harus hadir.', body: 'Daftar pertemuan menampilkan hari, ruang, lantai, dan waktu kuliah. Kegiatan semester menjadi lebih mudah ditelusuri.', detail: 'Pertemuan dan rincian tempat/waktu pada Jadwal Kuliah.', screen: campusScreen('03-class-schedule', 'Jadwal kuliah dan daftar pertemuan', [.135, .07, .84, .45]) },
  { label: 'Tagihan', title: 'Administrasi yang terbaca.', body: 'Jenis tagihan, tahun akademik, nominal, jatuh tempo, dan status bayar berada dalam daftar yang sama.', detail: 'Paid dan Unpaid adalah status yang terlihat pada tangkapan layar.', screen: campusScreen('04-student-billing', 'Tagihan mahasiswa beserta status pembayaran', [.135, .055, .845, .32]) },
  { label: 'Ringkasan', title: 'Lihat kembali perjalanan studi.', body: 'Dashboard menyajikan ringkasan kehadiran, IPS per semester, dan SKS yang diambil. Satu titik untuk membaca informasi akademik.', detail: 'Ringkasan kehadiran dan grafik akademik pada dashboard.', screen: campusScreen('01-dashboard', 'Ringkasan akademik SIAKAD', [.135, .29, .85, .66]) },
];

function EditorialWords({ text }: { text: string }) {
  return <span className="editorial-words"><span className="visually-hidden">{text}</span>{text.split(' ').map((word, i) => <span className="word-mask" aria-hidden="true" key={`${word}-${i}`}><span className="editorial-word">{word}</span></span>)}</span>;
}

function ScreenFragment({ screen, crop = screen.crop }: { screen: Screen; crop?: Crop }) {
  const [x, y, w, h] = crop;
  return <div className="screen-fragment" style={{ aspectRatio: (screen.width * w) / (screen.height * h) }} aria-hidden="true"><img src={screen.src} width={screen.width} height={screen.height} loading="lazy" alt="" draggable={false} style={{ width: `${100 / w}%`, left: `${-x / w * 100}%`, top: `${-y / h * 100}%` }} /></div>;
}

const academicMobileCrops: Crop[] = [[.54, .475, .23, .15], [.145, .125, .33, .32], [.60, .12, .28, .255], [.15, .31, .42, .32]];
academicScenes.forEach((scene, i) => { scene.screen.mobileCrop = academicMobileCrops[i]; });

function ScreenImage({ screen, onStatus }: { screen: Screen; onStatus?: (status: 'loaded' | 'failed') => void }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth) { setLoaded(true); onStatus?.('loaded'); }
  }, [failed]);
  if (failed) return <div className="screen-error" role="status"><p>Tampilan produk belum dapat dimuat.</p><button onClick={() => { setFailed(false); setLoaded(false); }}>Muat ulang tampilan</button></div>;
  return <>
    {!loaded && <span className="screen-loading" role="status">Memuat tampilan produk...</span>}
    <img ref={img} src={screen.src} width={screen.width} height={screen.height} alt={screen.label} loading="lazy" onLoad={() => { setLoaded(true); onStatus?.('loaded'); }} onError={() => { setFailed(true); onStatus?.('failed'); }} draggable={false} />
  </>;
}

function ProductPlate({ screen, className = '' }: { screen: Screen; className?: string }) {
  const [focused, setFocused] = useState(true);
  const [load, setLoad] = useState<{ src: string; status: 'loaded' | 'failed' } | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [originalSize, setOriginalSize] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const viewport = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    if (viewport.current) observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => () => {
    if (dialog.current?.open) window.dispatchEvent(new CustomEvent('closepay:dialog', { detail: false }));
  }, []);
  const [cx, cy, cw, ch] = focused ? size.width < 500 && screen.mobileCrop ? screen.mobileCrop : screen.crop : [0, 0, 1, 1];
  const scale = Math.min(size.width / (screen.width * cw), size.height / (screen.height * ch));
  const x = (size.width - screen.width * cw * scale) / 2 - screen.width * cx * scale;
  const y = (size.height - screen.height * ch * scale) / 2 - screen.height * cy * scale;
  function openOriginal() {
    setOriginalSize(false);
    dialog.current?.showModal();
    window.dispatchEvent(new CustomEvent('closepay:dialog', { detail: true }));
  }
  return <figure className={`product-plate ${className}`} data-screen={screen.src} data-focused={focused}>
    <div className="plate-toolbar"><span>Tampilan produk asli</span><div><button aria-pressed={focused} onClick={() => setFocused(!focused)}>{focused ? 'Lihat konteks' : 'Fokus detail'}<span aria-hidden="true">{focused ? '−' : '+'}</span></button><button ref={opener} onClick={openOriginal} aria-label={`Perbesar ${screen.label}`}>Perbesar <span aria-hidden="true">↗</span></button></div></div>
    <div ref={viewport} className="product-viewport">
      {load?.src !== screen.src && <span className="plate-loading" role="status">Memuat tampilan produk...</span>}
      {load?.src === screen.src && load.status === 'failed' && <div className="plate-error" role="status"><p>Tampilan produk belum dapat dimuat.</p><button onClick={() => { setLoad(null); setAttempt(attempt + 1); }}>Muat ulang tampilan</button></div>}
      <motion.div key={screen.src} className="screen-reveal" style={{ visibility: load?.src === screen.src && load.status === 'failed' ? 'hidden' : 'visible' }} initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: reduced ? 0 : .5, ease: [.22, 1, .36, 1] }}>
        <motion.div className="screen-camera" style={{ width: screen.width, height: screen.height, transformOrigin: '0 0' }} initial={false} animate={{ x, y, scale: size.width ? scale : 1, clipPath: `inset(${cy * 100}% ${(1 - cx - cw) * 100}% ${(1 - cy - ch) * 100}% ${cx * 100}%)` }} transition={{ duration: reduced ? 0 : .65, ease: [.22, 1, .36, 1] }}>
          <ScreenImage key={`${screen.src}-${attempt}`} screen={screen} onStatus={status => setLoad({ src: screen.src, status })} />
        </motion.div>
      </motion.div>
    </div>
    <figcaption>{screen.label}</figcaption>
    <dialog ref={dialog} className="screen-dialog" aria-label={screen.label} data-lenis-prevent onClose={() => { window.dispatchEvent(new CustomEvent('closepay:dialog', { detail: false })); opener.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="dialog-heading"><div><strong>{screen.label}</strong><p>Tangkapan layar produk. Data dan nominal mengikuti gambar sumber.</p></div><div className="dialog-controls"><button aria-pressed={originalSize} onClick={() => setOriginalSize(!originalSize)}>{originalSize ? 'Sesuaikan layar' : 'Ukuran asli'}</button><button autoFocus onClick={() => dialog.current?.close()}>Tutup <span aria-hidden="true">×</span></button></div></div>
      <div className={`dialog-image ${originalSize ? 'dialog-image-original' : ''}`} tabIndex={originalSize ? 0 : undefined} aria-label={originalSize ? 'Gambar ukuran asli, gunakan tombol panah untuk menggeser' : undefined}><ScreenImage key={screen.src} screen={screen} /></div>
    </dialog>
  </figure>;
}

function StoryText({ scene }: { scene: Pick<Scene, 'title' | 'body'> }) {
  const reduced = useReducedMotion();
  return <div className="story-text" aria-live="polite"><div className="story-text-mask"><motion.div key={scene.title} initial={reduced ? false : { y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reduced ? 0 : .4 }}><h3>{scene.title}</h3><p>{scene.body}</p></motion.div></div></div>;
}

export function FnbEvidence() {
  const [selected, setSelected] = useState(0);
  const scene = fnbScenes[selected];
  return <div className="fnb-evidence" id="fnb-product">
    <div className="evidence-heading"><h3>Yang terjadi<br /><em><EditorialWords text="di layar kasir." /></em></h3><p>Dari pilihan pelanggan ke pekerjaan tim.<br />Lihat detail yang membuat setiap langkah berarti.</p></div>
    <div className="fnb-proof-layout">
      <div className="fnb-proof-index"><div className="proof-index" aria-label="Aktivitas F&B">{fnbScenes.map((item, i) => <button key={item.label} aria-pressed={selected === i} onClick={() => setSelected(i)}><span>{item.label}</span><span aria-hidden="true">↗</span></button>)}</div><StoryText scene={scene} /></div>
      <div className={`proof-stage ${selected < 2 ? 'proof-stage-layered' : ''}`}>
        <div className="proof-composition">
          <span className="proof-action" aria-hidden="true">{['Pilih.', 'Di mana?', 'Bayar.', 'Siapkan.', 'Tercatat.'][selected]}</span>
          {selected < 2 && <div className="pos-context"><ScreenFragment screen={fnbScreen('01-pos-menu', 'Menu kasir', [.05, .19, .67, .20])} /><span>Menu di Staff POS</span></div>}
          <ProductPlate screen={scene.screen} />
        </div>
        <p className="evidence-note">{scene.detail}</p>
      </div>
    </div>
    <div className="story-handoff"><p>Di kasir, pesanan dicatat.<br /><strong>Di sisi pelanggan, pilihan dimulai.</strong></p><a href="#member">Lihat pengalaman Member <span aria-hidden="true">↘</span></a></div>
  </div>;
}

export function MemberStory({ onContext }: { onContext: (context: ProductContext) => void }) {
  const [selected, setSelected] = useState(0);
  const [cashier, setCashier] = useState(false);
  const [login, setLogin] = useState(false);
  const scene = memberScenes[selected];
  const screen = login ? loginScreen : selected === 1 && cashier ? cashierVariant : scene.screen;
  const reduced = useReducedMotion();
  function choose(index: number) { setSelected(index); setCashier(false); setLogin(false); onContext('Member (F&B)'); }
  return <section id="member" data-sc-act="flow" className="member-section member-product">
    <div className="member-story-heading"><p className="product-name">ClosePay Member <span>Pengalaman pelanggan F&B</span></p><h2>Pesanan Anda.<br /><span className="text-window"><em className="member-emphasis">Pilihan Anda.</em></span></h2><p>Restoran yang sama, dari sisi pelanggan. Temukan menu, tentukan selera, dan siapkan pesanan melalui ClosePay Member.</p></div>
    <div className="member-editorial-strip"><img src="/assets/editorial/member.webp" alt="Ilustrasi interaksi pelanggan dan staf gerai." loading="lazy" /><p>Di meja pelanggan,<br />setiap pilihan punya arti.</p></div>
    <div className="member-path" aria-label="Perjalanan pelanggan">{memberScenes.map((item, i) => <button key={item.label} aria-pressed={selected === i && !login} onClick={() => choose(i)}><span className="path-mark" aria-hidden="true" /><span>{item.label}</span></button>)}</div>
    <div className="member-product-layout">
      <div className="member-narrative">
        <StoryText scene={login ? { ...scene, title: 'Masuk ke pengalaman Member.', body: 'Halaman masuk menyediakan kolom username dan kata sandi, serta akses lupa kata sandi dan daftar.' } : scene} />
        {selected === 1 && !login && <div className="viewpoint-control"><p>Satu detail, dua sudut pandang.</p><div aria-label="Sudut pandang varian"><button aria-pressed={!cashier} onClick={() => setCashier(false)}>Pelanggan</button><button aria-pressed={cashier} onClick={() => setCashier(true)}>Kasir</button></div><span>Pilihan varian dan tingkat gula terlihat pada kedua antarmuka.</span></div>}
        <p className="member-source-note">{login ? 'Tampilan halaman masuk produk.' : selected === 1 && cashier ? 'Detail varian pada Staff POS. Beralih kembali untuk melihat tampilan pelanggan.' : scene.detail}</p>
        <button className="member-login-toggle" aria-pressed={login} onClick={() => { setLogin(!login); onContext('Member (F&B)'); }}>{login ? 'Kembali ke perjalanan pesanan' : 'Lihat halaman masuk Member'}<span aria-hidden="true">↗</span></button>
        <a className="text-button" href="#contact" onClick={() => onContext('Member (F&B)')}>Bicarakan pengalaman pelanggan <span aria-hidden="true">↗</span></a>
      </div>
      <div className="member-screen-composition">
        <div className="member-context-screen" aria-hidden="true"><ScreenFragment screen={memberScreen(selected === 1 ? '03-product-detail' : '02-menu-list', 'Detail menu pelanggan', selected === 1 ? [.025, .015, .95, .385] : [.025, .10, .95, .61])} /><span>{selected === 1 ? 'Dari minuman yang dipilih...' : 'Berawal dari menu...'}</span></div>
        <motion.div className="member-focus-sheet" animate={{ y: reduced ? 0 : selected === 1 && cashier ? -18 : 0 }} transition={{ duration: .5 }}><ProductPlate screen={screen} className="member-plate" /></motion.div>
      </div>
    </div>
    <p className="product-disclosure">Tampilan asli untuk mengenal alur. Pilihan di halaman ini menjelajahi produk, tanpa membuat pesanan atau pembayaran.</p>
  </section>;
}

export function SiakadStory({ onContext }: { onContext: (context: ProductContext) => void }) {
  const [selected, setSelected] = useState(0);
  const scene = academicScenes[selected];
  return <section id="institutional" data-sc-act="flow" className="institution-section siakad-product">
    <div className="siakad-heading"><p className="product-name">ClosePay SIAKAD <span>Sistem informasi akademik</span></p><h2>Rencana studi.<br /><em><EditorialWords text="Keseharian kampus." /></em></h2><p>Dari memilih kelas hingga membaca tagihan. Informasi akademik hadir di tengah keseharian kampus.</p></div>
    <div className="siakad-workspace">
      <div className="academic-index" aria-label="Kegiatan akademik">{academicScenes.map((item, i) => <button key={item.label} aria-pressed={selected === i} onClick={() => { setSelected(i); onContext('SIAKAD'); }}><span>{item.label}</span><span aria-hidden="true">↗</span></button>)}</div>
      <div className="academic-surface"><div className="academic-surface-header"><span>Informasi untuk satu semester.</span><strong>{scene.label}</strong></div><ProductPlate screen={scene.screen} className="academic-plate" /><p className="evidence-note">{scene.detail}</p></div>
      <div className="academic-story"><StoryText scene={scene} /><a className="text-button" href="#contact" onClick={() => onContext('SIAKAD')}>Bicarakan kebutuhan kampus <span aria-hidden="true">↗</span></a></div>
    </div>
    <div className="campus-footnote"><div className="institution-image"><div><img src="/assets/editorial/institution.webp" alt="Ilustrasi mahasiswa menyiapkan dokumen di lingkungan kampus." loading="lazy" /></div></div><p>Rencana di layar.<br /><strong>Aktivitas di kampus.</strong><span>Ilustrasi keseharian, dibuat untuk ClosePay.</span></p></div>
    <p className="product-disclosure">Tangkapan layar produk. Data akademik, nominal, dan status yang terlihat mengikuti gambar sumber.</p>
  </section>;
}

const admissionSteps = [
  { label: 'Data pendaftar', word: 'Kenalkan diri.', role: 'Calon mahasiswa', title: 'Dimulai dari data diri.', body: 'Calon mahasiswa mengisi formulir pendaftaran digital. Informasi pendaftar menjadi awal proses penerimaan.', paper: 'Data', aside: 'Formulir pendaftaran' },
  { label: 'Dokumen', word: 'Lengkapi berkas.', role: 'Calon mahasiswa', title: 'Berkas ikut dalam perjalanan.', body: 'Dokumen pendukung diunggah bersama data pendaftaran. Kebutuhan berkas mengikuti proses penerimaan institusi.', paper: 'Berkas', aside: 'Unggah dokumen pendukung' },
  { label: 'Administrasi', word: 'Tinjau pendaftaran.', role: 'Tim administrasi', title: 'Giliran tim penerimaan.', body: 'Tim administrasi melihat daftar pendaftar dan memperbarui status pendaftaran. Sisi pendaftar dan pengelola memiliki perannya masing-masing.', paper: 'Status', aside: 'Daftar dan status pendaftaran' },
];

export function PmbStory({ onContext }: { onContext: (context: ProductContext) => void }) {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const step = admissionSteps[selected];
  return <section id="pmb" data-sc-act="flow" className="pmb-story">
    <div className="pmb-heading"><p className="product-name">ClosePay PMB <span>Penerimaan mahasiswa baru</span></p><h2>Sebelum<br />hari <em><EditorialWords text="pertama." /></em></h2><p>Perjalanan kampus dimulai jauh sebelum masuk kelas. Dari data pendaftar, berkas pendukung, hingga meja administrasi.</p></div>
    <div className="admission-desk">
      <div className="admission-tabs" aria-label="Alur penerimaan mahasiswa">{admissionSteps.map((item, i) => <button key={item.label} aria-pressed={selected === i} onClick={() => { setSelected(i); onContext('PMB'); }}><span>{item.label}</span><span aria-hidden="true">{selected === i ? '−' : '+'}</span></button>)}</div>
      <div className="admission-art" aria-hidden="true">
        {admissionSteps.map((item, i) => <motion.div key={item.label} className={`admission-folio ${selected === i ? 'folio-active' : ''}`} style={{ zIndex: selected === i ? 4 : i + 1 }} initial={false} animate={{ x: reduced ? 0 : (i - selected) * 18, y: (i - selected) * 16, rotate: reduced ? 0 : (i - selected) * -3, scale: selected === i ? 1 : .94 }} transition={{ duration: reduced ? 0 : .7, ease: [.22, 1, .36, 1] }}><div className="folio-top"><span>ClosePay / PMB</span><span>{item.role}</span></div><span className="folio-word">{item.paper}</span><div className="folio-rule" /><p>{item.word}</p><span className="folio-bottom">{item.aside}</span></motion.div>)}
      </div>
      <div className="admission-narrative" aria-live="polite"><p className="admission-role">{step.role}</p><StoryText scene={step} /><a className="text-button" href="#contact" onClick={() => onContext('PMB')}>Bicarakan penerimaan mahasiswa <span aria-hidden="true">↗</span></a></div>
      <p className="admission-disclosure">Ilustrasi alur PMB berdasarkan riset produk, bukan tampilan aplikasi. Screenshot PMB belum tersedia.</p>
    </div>
  </section>;
}
