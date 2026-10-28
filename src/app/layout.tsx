import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Archivo } from 'next/font/google';
import './globals.css';
import './product-stories.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ClosePay | Dekat dengan keseharian',
  description:
    'Kenali ClosePay F&B untuk kasir dan dapur, Member untuk pengalaman pelanggan, serta SIAKAD untuk kegiatan akademik kampus.',
  icons: {
    icon: '/assets/brand/closepay-symbol.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${sans.variable} ${display.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
