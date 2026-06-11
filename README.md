# Eno QR Studio

A premium, client-side QR code creation web app. Generate beautiful, customizable QR codes for text, URLs, Wi-Fi, contacts, email, SMS, calendar events, and locations — all in your browser.

![Eno QR Studio](https://img.shields.io/badge/Eno%20QR%20Studio-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Features

### QR Code Types
- **Plain Text** — Encode any text message
- **URL / Link** — Link to websites, portfolios, social profiles
- **Wi-Fi** — Share network credentials (SSID, password, encryption)
- **Contact Card (vCard)** — Digital business card with name, org, phone, email
- **Email** — Pre-filled `mailto:` with subject and body
- **Phone** — Direct call link
- **SMS** — Pre-filled text message
- **Calendar Event** — Add events with title, location, dates
- **Location** — Geo coordinates or place query

### Customization
- Foreground and background color pickers with presets
- 6 pattern styles: square, rounded, dots, classy, classy-rounded, extra-rounded
- 3 corner styles: square, dot, rounded
- Error correction level control (L/M/Q/H)
- Adjustable size (200–1000px) and margin
- Logo overlay with adjustable size
- Live preview with instant updates

### Export & Output
- **PNG Export** — High-quality raster image (2x retina)
- **SVG Export** — Scalable vector for print and web
- **Copy SVG** — Copy SVG markup to clipboard
- **Print** — Single QR code print dialog
- **Batch ZIP** — Download all QR codes as PNG or SVG zip
- **Print Grid** — 3-column print layout for labels and stickers

### Batch Generation
- Paste CSV text with label, data, and type columns
- Parse and preview multiple items
- Generate all QR codes at once
- Download individual or bulk as ZIP
- Print-friendly grid layout

### Privacy
- 100% client-side processing
- No data sent to any server
- No analytics, no tracking
- Works offline after initial load

## Screenshots

<!-- TODO: Add screenshots -->

| Landing Page | Generator |
|---|---|
| ![Landing](screenshots/landing.png) | ![Generator](screenshots/generator.png) |

| Batch Mode | Customization |
|---|---|
| ![Batch](screenshots/batch.png) | ![Customize](screenshots/customize.png) |

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| qrcode | QR code matrix generation |
| JSZip | ZIP file creation for batch export |
| Lucide React | Icons |

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/your-username/eno-qr-studio.git
cd eno-qr-studio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles, theme, print styles
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Landing page
│   └── generator/
│       └── page.tsx         # Main generator page
├── components/
│   ├── BatchPanel.tsx       # CSV batch generation UI
│   ├── CustomizePanel.tsx   # Color, pattern, logo controls
│   ├── DataTypeForm.tsx     # Input forms for each QR type
│   └── QRPreview.tsx        # Live preview with export buttons
├── lib/
│   ├── csv-parser.ts        # CSV text parsing for batch mode
│   ├── export-utils.ts      # Download, print, ZIP utilities
│   ├── qr-encoder.ts        # Data type → QR string encoding
│   └── qr-renderer.ts       # QR matrix → SVG/PNG rendering
└── types/
    └── qr.ts                # TypeScript types and constants
```

## CSV Format for Batch Generation

```csv
label,url,type
GitHub,https://github.com,url
My Wi-Fi,,wifi
John Doe,,vcard
```

Supported columns: `label` (or `name`/`title`), `data` (or `url`/`text`/`content`), `type`.

## Deployment

### Vercel

1. Push to GitHub
2. Import in Vercel
3. Deploy — no environment variables needed

### Other Platforms

This is a static Next.js app. It can be deployed to any platform that supports Node.js:

```bash
npm run build
npm start
```

## Roadmap

- [ ] Gradient foreground support
- [ ] Multi-color QR codes
- [ ] More pattern variations
- [ ] QR code scanning/decoding
- [ ] Template presets (business, event, restaurant)
- [ ] SVG editor for fine-tuning individual modules
- [ ] Frame/label templates around QR codes

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License. See [LICENSE](LICENSE) for details.

---

Built with care as part of the Eno Tools ecosystem.
