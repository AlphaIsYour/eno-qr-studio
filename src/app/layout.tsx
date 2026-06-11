import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Eno QR Studio — Advanced QR Code Generator',
  description:
    'Create beautiful, customizable QR codes for text, URLs, Wi-Fi, contacts, email, SMS, events, and locations. Export as PNG or SVG. Batch generate from CSV. Free, private, client-side.',
  keywords: [
    'QR code generator',
    'QR code customizer',
    'Wi-Fi QR code',
    'vCard QR code',
    'batch QR generator',
    'SVG QR code',
    'PNG QR export',
    'QR code logo',
    'free QR generator',
  ],
  openGraph: {
    title: 'Eno QR Studio — Advanced QR Code Generator',
    description:
      'Create beautiful, customizable QR codes with live preview, logo overlay, batch generation, and PNG/SVG export.',
    type: 'website',
    siteName: 'Eno QR Studio',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
