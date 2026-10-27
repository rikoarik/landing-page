'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, MotionConfig, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { gsap, ScrollTrigger, useClosePayMotion } from './useClosePayMotion';

type Context = 'F&B Suite' | 'Member' | 'Institutional';
const destinations = [{ href: '#fnb', label: 'F&B Suite' }, { href: '#member', label: 'Member' }, { href: '#institutional', label: 'Institutional' }];

function ChangingText({ changeKey, children }: { changeKey: string | number; children: ReactNode }) {
  const reduced = useReducedMotion();
  return <span className="text-window"><motion.span key={changeKey} className="text-change" initial={reduced ? false : { y: '105%', rotate: 1.5 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: reduced ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.span></span>;
}

function Direction({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="direction"><path d={diagonal ? 'M7 25 25 7M7 7h18v18' : 'M5 16h21M17 7l9 9-9 9'} stroke="currentColor" strokeWidth="1.6" /></svg>;
}

function Photo({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imageRef.current?.complete) {
      if (imageRef.current.naturalWidth > 0) setLoaded(true);
      else setFailed(true);
    }
  }, [src, failed]);
  return <div className={`photo ${className} ${loaded ? 'photo-loaded' : ''}`}>
    {!loaded && !failed && <span className="photo-status" role="status">Memuat foto...</span>}
    {failed ? <div className="photo-fallback"><span>Foto belum dapat ditampilkan.</span><button onClick={() => { setFailed(false); setLoaded(false); }}>Muat ulang foto</button></div> : <img ref={imageRef} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
  </div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return <header className="site-header">
    <a className="brand" href="#home" aria-label="ClosePay, kembali ke awal"><img src="/assets/brand/closepay-wordmark.png" width="640" height="151" alt="ClosePay" /></a>
    <nav className="desktop-nav" aria-label="Produk ClosePay">{destinations.map(d => <a key={d.href} href={d.href}>{d.label}</a>)}</nav>
    <a className="header-contact" href="#contact">Bicarakan kebutuhan <Direction diagonal /></a>
    <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? 'Tutup' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
    {open && <motion.nav id="mobile-menu" className="mobile-nav" aria-label="Navigasi seluler" initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>{[...destinations, { href: '#contact', label: 'Bicarakan kebutuhan' }].map(d => <a key={d.href} href={d.href} onClick={() => setOpen(false)}>{d.label}<Direction /></a>)}</motion.nav>}
  </header>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const pointer = useMotionValue(0);
  const pointerSmooth = useSpring(pointer, { stiffness: 110, damping: 25 });
  const photoX = useTransform(pointerSmooth, value => value * -5);
  const cupX = useTransform(pointerSmooth, value => value * 14);
  return <section ref={ref} id="home" data-sc-act="flow" className="hero" onPointerMove={e => {
    if (!reduced && e.pointerType === 'mouse') { const rect = e.currentTarget.getBoundingClientRect(); pointer.set((e.clientX - rect.left) / rect.width * 2 - 1); }
  }} onPointerLeave={() => pointer.set(0)}>
    <h1 className="hero-title"><span className="hero-title-line"><span className="hero-title-word">Dekat dengan</span></span><span className="hero-title-line"><span className="hero-title-word">keseharian.</span></span></h1>
    <div className="hero-photo"><motion.div className="hero-photo-pointer" style={reduced ? {} : { x: photoX }}><div className="hero-photo-frame"><Photo src="/assets/editorial/cafe.webp" alt="Ilustrasi seorang barista menyiapkan kopi di balik meja kafe." eager /></div></motion.div></div>
    <div className="hero-copy"><p>Teknologi untuk bisnis yang terus bergerak.<br />Dari satu pesanan, ke banyak kemungkinan.</p><a className="solid-button" href="#fnb">Ikuti satu pesanan <Direction /></a></div>
    <div className="hero-cup" aria-hidden="true"><motion.div className="hero-cup-pointer" style={reduced ? {} : { x: cupX }}><img src="/assets/editorial/cup.webp" alt="" width="1000" height="667" fetchPriority="high" /></motion.div></div>
    <div className="hero-caption"><span>Di balik setiap aktivitas, ada manusia.</span><span>ClosePay untuk keseharian bisnis.</span></div>
  </section>;
}

const steps = [
  { name: 'Pesanan', title: 'Mulai dari pilihan.', body: 'Menu dipilih, pesanan dicatat. Lewat staf kasir atau langsung dari kiosk.', ticket: 'Pesanan dicatat', detail: 'Menu dan keranjang', location: 'Di depan gerai' },
  { name: 'Baru', title: 'Sampai ke dapur.', body: 'Pesanan dari Staff POS atau Kiosk masuk ke daftar pesanan Kitchen.', ticket: 'Pesanan baru', detail: 'Masuk ke Kitchen', location: 'Di layar dapur' },
  { name: 'Diproses', title: 'Sekarang, diracik.', body: 'Tim dapur melihat pesanan dan mengubah statusnya saat mulai menyiapkan.', ticket: 'Sedang diproses', detail: 'Status di Kitchen', location: 'Di meja racik' },
  { name: 'Selesai', title: 'Siap melanjutkan hari.', body: 'Status selesai menandai pesanan yang telah disiapkan oleh tim dapur.', ticket: 'Selesai disiapkan', detail: 'Status di Kitchen', location: 'Siap disajikan' },
];

function OrderJourney({ onContext }: { onContext: (context: Context) => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [manual, setManual] = useState(false);
  const [origin, setOrigin] = useState<'Staff POS' | 'Kiosk'>('Staff POS');
  const [supply, setSupply] = useState(false);
  const progress = useRef(0);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 1000px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)', () => {
      ScrollTrigger.create({ trigger: ref.current, start: 'top top', end: 'bottom bottom', onUpdate: self => {
        progress.current = self.progress;
        if (!manual) setStage(Math.min(3, Math.floor(self.progress * 4)));
      } });
    });
    return () => media.revert();
  }, [manual]);
  function selectStage(index: number) { setManual(true); setStage(index); onContext('F&B Suite'); }
  const active = steps[stage];
  return <section ref={ref} id="fnb" data-sc-act="flow" className="order-journey"><div className="order-stage" data-sc-stage data-sc-verify-state={`${origin}-${stage}-${supply}`}>
    <div className="order-heading"><p className="chapter-label">ClosePay F&B Suite</p><h2>Satu pesanan.<br /><span>Banyak yang terhubung.</span></h2><p className="order-intro">Kasir, pelanggan, dan dapur.<br />Temukan peran setiap produk dalam satu alur.</p></div>
    <div className="order-workspace">
      <div className="route-origin"><span className="small-label">Mulai pesanan lewat</span><div className="origin-options" aria-label="Asal pesanan">{(['Staff POS', 'Kiosk'] as const).map(o => <button key={o} aria-pressed={origin === o} onClick={() => { setOrigin(o); setStage(0); setManual(true); onContext('F&B Suite'); }}>{o === 'Staff POS' ? 'Staf kasir' : 'Kiosk mandiri'}<span>{o}</span></button>)}</div><p className="origin-note">{origin === 'Staff POS' ? 'Staf memilih menu dan mencatat pesanan pelanggan.' : 'Pelanggan memilih menu dan memesan sendiri.'}</p></div>
      <div className="order-theater"><div className="theater-caption"><span>{active.location}</span><span>Ilustrasi alur F&B</span></div><div className="ticket-travel"><div className="ticket-track" aria-hidden="true"><span style={{ transform: `scaleX(${stage / 3})` }} /></div><motion.div className="order-ticket" animate={{ x: reduced ? 0 : (stage - 1.5) * 28, rotate: reduced ? 0 : [-5, -2, 2, 0][stage] }} transition={{ type: 'spring', stiffness: 160, damping: 24 }}><div className="ticket-top"><img src="/assets/brand/closepay-symbol.png" width="30" height="30" alt="" /><span>Contoh pesanan</span></div><p className="ticket-item">Kopi susu</p><p className="ticket-source">Dari {origin}</p><div className="ticket-status" aria-live="polite"><span className="status-mark" aria-hidden="true">{stage === 3 ? '✓' : '+'}</span><div><strong>{active.ticket}</strong><span>{active.detail}</span></div></div><div className="ticket-teeth" aria-hidden="true" /></motion.div></div><div className="journey-steps" aria-label="Tahap pesanan">{steps.map((s, i) => <button key={s.name} aria-pressed={stage === i} onClick={() => selectStage(i)}><span className="step-dot" aria-hidden="true" /><span>{s.name}</span></button>)}</div></div>
      <div className="journey-description"><span className="small-label">{stage === 0 ? origin : 'Kitchen'}</span><h3><ChangingText changeKey={stage}>{active.title}</ChangingText></h3><p><ChangingText changeKey={stage}>{active.body}</ChangingText></p><div className="journey-actions"><button className="text-button" onClick={() => selectStage(stage === 3 ? 0 : stage + 1)}>{stage === 3 ? 'Ulangi pesanan' : 'Lanjutkan pesanan'}<Direction /></button>{manual && <button className="resume-scroll" onClick={() => { setManual(false); setStage(Math.min(3, Math.floor(progress.current * 4))); }}>Ikuti posisi halaman</button>}</div></div>
    </div>
    <div className="supply-row"><span>Di balik meja racik</span><button className="supply-toggle" aria-expanded={supply} aria-controls="supply-detail" onClick={() => { setSupply(!supply); onContext('F&B Suite'); }}>Purchaser: kebutuhan bahan juga punya tempat.<span aria-hidden="true">{supply ? '−' : '+'}</span></button></div>
    {supply && <motion.div id="supply-detail" className="supply-detail" initial={reduced ? false : { height: 0 }} animate={{ height: 'auto' }} transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}><p><strong>Permintaan pembelian bahan baku.</strong> Tim mencatat kebutuhan bahan melalui formulir Purchaser. Ini adalah alur pengadaan, terpisah dari status pesanan di dapur.</p><a href="#contact" onClick={() => onContext('F&B Suite')}>Bicarakan kebutuhan <Direction diagonal /></a></motion.div>}
    <p className="illustration-note">Ilustrasi untuk mengenal alur produk. Bukan layar aplikasi atau transaksi langsung.</p>
  </div></section>;
}

function Member({ onContext }: { onContext: (context: Context) => void }) {
  const [detail, setDetail] = useState<'register' | 'profile'>('register');
  return <section id="member" data-sc-act="flow" className="member-section">
    <div className="member-photo-wrap">
      <div className="member-reveal"><Photo src="/assets/editorial/member.webp" alt="Ilustrasi interaksi anggota dengan staf di sebuah gerai." /></div>
      <p className="photo-credit">Ilustrasi keseharian, dibuat untuk ClosePay.</p>
    </div>
    <div className="member-copy">
      <span className="chapter-label">ClosePay Member</span>
      <h2>Bukan sekadar<br />datang.<br /><span className="text-window"><em className="member-emphasis">Jadi bagian.</em></span></h2>
      <p>Hubungan dimulai saat seseorang bergabung. ClosePay Member memberi tempat untuk pendaftaran dan profil anggota.</p>
      <div className="member-options" aria-label="Fitur Member">
        <button aria-pressed={detail === 'register'} onClick={() => { setDetail('register'); onContext('Member'); }}>Pendaftaran <span aria-hidden="true">+</span></button>
        <button aria-pressed={detail === 'profile'} onClick={() => { setDetail('profile'); onContext('Member'); }}>Profil anggota <span aria-hidden="true">+</span></button>
      </div>
      <p className="member-detail" aria-live="polite"><ChangingText changeKey={detail}>{detail === 'register' ? 'Anggota membuat akun melalui formulir pendaftaran, lalu masuk untuk mengakses keanggotaannya.' : 'Informasi dasar anggota tersimpan dalam profil, termasuk nama dan tanggal bergabung.'}</ChangingText></p>
      <a className="text-button" href="#contact" onClick={() => onContext('Member')}>Bicarakan kebutuhan <Direction diagonal /></a>
    </div>
  </section>;
}

function Institutional({ onContext }: { onContext: (context: Context) => void }) {
  const [step, setStep] = useState(0);
  const items = [{ name: 'Data diri', title: 'Perkenalan yang tertata.', text: 'Calon mahasiswa mengisi data pribadi melalui formulir pendaftaran digital.' }, { name: 'Dokumen', title: 'Berkas dalam satu alur.', text: 'Dokumen pendukung diunggah sebagai bagian dari proses pendaftaran.' }, { name: 'Status pendaftaran', title: 'Dikelola oleh institusi.', text: 'Tim institusi melihat daftar pendaftar dan mengelola status pendaftarannya.' }];
  return <section id="institutional" data-sc-act="flow" className="institution-section">
    <div className="institution-heading"><span className="chapter-label">ClosePay Institutional / PMB</span><h2>Langkah baru.<br />Dimulai dengan jelas.</h2></div>
    <div className="institution-image"><div><Photo src="/assets/editorial/institution.webp" alt="Ilustrasi calon mahasiswa menyiapkan dokumen di meja kampus." /></div></div>
    <div className="institution-bottom">
      <p className="institution-intro">Dari data diri sampai dokumen pendukung. Pendaftaran mahasiswa baru punya alur digital yang bisa diikuti.</p>
      <div className="admission-explorer">
        <div className="admission-tabs" aria-label="Alur PMB">{items.map((item, index) => <button key={item.name} aria-pressed={step === index} onClick={() => { setStep(index); onContext('Institutional'); }}>{item.name}</button>)}</div>
        <div aria-live="polite" className="admission-detail"><h3><ChangingText changeKey={step}>{items[step].title}</ChangingText></h3><p><ChangingText changeKey={step}>{items[step].text}</ChangingText></p></div>
        <a className="text-button" href="#contact" onClick={() => onContext('Institutional')}>Bicarakan kebutuhan <Direction diagonal /></a>
      </div>
    </div>
  </section>;
}

function Contact({ context, onContext }: { context: Context; onContext: (context: Context) => void }) {
  const href = `mailto:marketing@teknologikartu.com?subject=${encodeURIComponent(`Kebutuhan ClosePay ${context}`)}&body=${encodeURIComponent(`Halo tim ClosePay,\n\nSaya ingin berdiskusi tentang ${context} untuk kebutuhan bisnis/institusi saya.\n\nNama:\nBisnis/institusi:\nKebutuhan:\n`)}`;
  return <footer id="contact" data-sc-act="flow" className="contact-section"><div className="contact-top"><img src="/assets/brand/closepay-wordmark.png" alt="ClosePay" width="640" height="151" /><span>Teknologi dekat.<br />Kemungkinan lebih luas.</span></div><h2>Setiap bisnis<br />punya <em>cerita.</em></h2><div className="contact-bottom"><p>Ceritakan keseharian bisnis Anda.<br />Kita mulai dari yang paling dibutuhkan.</p><div className="contact-action"><label htmlFor="business-context">Saya ingin membahas</label><select id="business-context" value={context} onChange={e => onContext(e.target.value as Context)}><option>F&B Suite</option><option>Member</option><option>Institutional</option></select><a className="contact-cta" href={href}>Bicarakan kebutuhan <Direction diagonal /></a><span className="email-note">Membuka aplikasi email Anda.</span></div></div><div className="footer-meta"><span>© 2026 ClosePay · PT Teknologi Kartu Indonesia</span><div><a href="https://closepay.id/privacy-policy" target="_blank" rel="noreferrer">Privasi</a><a href="https://closepay.id/term-condition" target="_blank" rel="noreferrer">Syarat & ketentuan</a><a href="#home">Kembali ke awal ↑</a></div></div></footer>;
}

export default function ClosePayExperience() {
  const [context, setContext] = useState<Context>('F&B Suite');
  useClosePayMotion();
  return <MotionConfig reducedMotion="user"><a className="skip-link" href="#content">Lewati ke konten</a><Header /><main id="content"><Hero /><section className="intro-section" data-sc-act="flow"><span className="intro-label">Teknologi bertemu keseharian.</span><h2>Di balik secangkir kopi,<br />ada banyak tangan<br /><span>yang bekerja.</span></h2><p>ClosePay hadir di antara aktivitas itu. Membantu mencatat pesanan, mengelola keanggotaan, hingga menerima pendaftaran baru.</p></section><OrderJourney onContext={setContext} /><Member onContext={setContext} /><Institutional onContext={setContext} /></main><Contact context={context} onContext={setContext} /></MotionConfig>;
}
