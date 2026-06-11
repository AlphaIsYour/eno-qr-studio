'use client';

import Link from 'next/link';
import {
  QrCode,
  Palette,
  Layers,
  Download,
  Wifi,
  User,
  Mail,
  Calendar,
  MapPin,
  Phone,
  MessageSquare,
  Type,
  Link as LinkIcon,
  Printer,
  FileSpreadsheet,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  Check,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Layers,
    title: '9 QR Types',
    desc: 'Text, URL, Wi-Fi, vCard, email, phone, SMS, calendar events, and map locations.',
  },
  {
    icon: Palette,
    title: 'Full Customization',
    desc: 'Colors, patterns, corner styles, logo overlay, and error correction control.',
  },
  {
    icon: Download,
    title: 'PNG & SVG Export',
    desc: 'Download high-quality raster or vector files for any use case.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Batch Generation',
    desc: 'Paste CSV data and generate dozens of QR codes in one go.',
  },
  {
    icon: Printer,
    title: 'Print-Ready Layout',
    desc: 'Optimized print grid for labels, stickers, and event materials.',
  },
  {
    icon: Shield,
    title: '100% Client-Side',
    desc: 'Your data never leaves the browser. No server, no tracking.',
  },
];

const QR_TYPES = [
  { icon: Type, label: 'Plain Text', color: '#6366f1' },
  { icon: LinkIcon, label: 'URL / Link', color: '#8b5cf6' },
  { icon: Wifi, label: 'Wi-Fi', color: '#06b6d4' },
  { icon: User, label: 'Contact Card', color: '#10b981' },
  { icon: Mail, label: 'Email', color: '#f59e0b' },
  { icon: Phone, label: 'Phone', color: '#ef4444' },
  { icon: MessageSquare, label: 'SMS', color: '#ec4899' },
  { icon: Calendar, label: 'Calendar', color: '#f97316' },
  { icon: MapPin, label: 'Location', color: '#14b8a6' },
];

const USE_CASES = [
  {
    title: 'Events & Weddings',
    desc: 'RSVP links, Wi-Fi sharing for guests, venue locations, and schedule details — all in one scan.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Restaurant Menus',
    desc: 'Contactless digital menus with your logo and brand colors. Update content without reprinting.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Product Labels',
    desc: 'Batch-generate unique QR codes for inventory, product info pages, and authentication.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Portfolios & Business',
    desc: 'vCard contact codes, LinkedIn profiles, project showcases, and professional link-in-bio.',
    gradient: 'from-blue-500 to-indigo-600',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-border no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">Eno QR Studio</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/generator"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-smooth flex items-center gap-2"
            >
              Open Generator <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-light text-accent text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Free, Private, No Sign-Up
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Create{' '}
              <span className="gradient-text">Beautiful QR Codes</span>
              <br />
              For Everything
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10">
              Professional QR code generator with live preview, custom colors, logo overlay,
              batch generation, and instant PNG/SVG export. All processing happens in your browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/generator"
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-base hover:opacity-90 transition-smooth flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
              >
                <Zap className="w-5 h-5" />
                Start Creating
              </Link>
              <a
                href="#features"
                className="px-8 py-3.5 rounded-2xl border border-border font-semibold text-base hover:bg-surface-hover transition-smooth flex items-center justify-center gap-2"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* QR Type pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-16">
            {QR_TYPES.map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface text-sm font-medium transition-smooth hover:shadow-md"
              >
                <t.icon className="w-4 h-4" style={{ color: t.color }} />
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              A complete QR code toolkit that works entirely in your browser.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-border bg-surface hover:shadow-lg transition-smooth group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                  <f.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Use Cases</h2>
            <p className="text-muted text-lg max-w-xl mx-auto">
              QR codes for real-world scenarios that matter.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {USE_CASES.map((u) => (
              <div
                key={u.title}
                className="p-8 rounded-2xl border border-border bg-surface hover:shadow-lg transition-smooth overflow-hidden relative"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${u.gradient}`}
                />
                <h3 className="font-bold text-xl mb-3">{u.title}</h3>
                <p className="text-muted leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted text-lg">Three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Choose Type', desc: 'Select from 9 QR code types and fill in your data.' },
              { step: '2', title: 'Customize', desc: 'Pick colors, patterns, add your logo, and adjust settings.' },
              { step: '3', title: 'Export', desc: 'Download as PNG or SVG, or use the print layout for labels.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-muted text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
              <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white rounded-full" />
            </div>
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Create?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
                No sign-up. No limits. Just open the generator and start making beautiful QR codes.
              </p>
              <Link
                href="/generator"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-indigo-600 font-semibold text-base hover:bg-white/90 transition-smooth shadow-lg"
              >
                <QrCode className="w-5 h-5" />
                Open Generator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <QrCode className="w-4 h-4" />
            Eno QR Studio
          </div>
          <div className="flex items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3" /> 100% Client-Side
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3" /> No Data Sent
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3" /> Free Forever
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
