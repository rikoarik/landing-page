import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'ClosePay — Platform Transaksi & Layanan Digital Terpadu',
  description:
    'Mendukung aktivitas transaksi non-tunai, interaksi anggota, operasional merchant, dan pengelolaan ekosistem bisnis terpadu oleh PT Teknologi Kartu Indonesia.',
  icons: {
    icon: '/assets/brand/closepay-symbol.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased bg-paper text-ink selection:bg-forest selection:text-paper min-h-screen">
        {children}
      </body>
    </html>
  );
}
