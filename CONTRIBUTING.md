# Contributing to Eno QR Studio

Thank you for your interest in contributing to Eno QR Studio! We welcome contributions from developers of all backgrounds, whether you are fixing a typo, adding unit tests, or building major new features.

This guide provides everything you need to set up the project locally, understand the architecture, and submit your contributions.

---

## Code of Conduct

We are committed to providing an open, welcoming, and inclusive environment. Please read and respect our [Code of Conduct](CODE_OF_CONDUCT.md) in all project interactions.

---

## Quick Start / Local Development

### Prerequisites
* **Node.js**: Version 20.x or 22.x (LTS recommended)
* **npm**: Version 10+ (or pnpm / yarn)
* **Git**

### 1. Clone the Repository
Fork the repository on GitHub, then clone your fork locally:

```bash
git clone https://github.com/AlphaIsYour/eno-qr-studio.git
cd eno-qr-studio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The generator is available at [http://localhost:3000/generator](http://localhost:3000/generator).

---

## Available Scripts

* `npm run dev`: Starts the Next.js development server with Turbopack.
* `npm run build`: Builds the production bundle.
* `npm run start`: Starts the production server.
* `npm run typecheck`: Runs the TypeScript compiler (`tsc --noEmit`) to verify type safety.
* `npm run lint`: Runs ESLint across all source files.
* `npm run test`: Runs the Vitest unit test suite once.
* `npm run test:watch`: Runs tests in interactive watch mode during development.

---

## Project Architecture Overview

The codebase is organized cleanly to separate data encoding, SVG rendering, and user interface:

```
src/
├── app/
│   ├── layout.tsx         # Root layout with HTML headers and fonts
│   ├── globals.css        # Tailwind 4 theme, CSS variables, print styles
│   ├── page.tsx           # Marketing landing page
│   └── generator/
│       └── page.tsx       # Studio workspace (Single mode & Batch mode tabs)
├── components/
│   ├── DataTypeForm.tsx   # Dynamic input form for 9 QR types
│   ├── CustomizePanel.tsx # Visual controls (colors, shapes, error correction, logo)
│   ├── QRPreview.tsx      # Real-time preview container with download buttons
│   └── BatchPanel.tsx     # CSV import, parsing table, and batch generator
├── lib/
│   ├── qr-encoder.ts      # Pure encoders transforming typed data into QR payload strings
│   ├── qr-renderer.ts     # Builds customized SVG markup from QR matrix data
│   ├── csv-parser.ts      # Parses raw CSV text into batch queue items
│   ├── export-utils.ts    # File download helpers (PNG, SVG, JSZip archive, print dialog)
│   └── __tests__/         # Automated Vitest unit test suites
└── types/
    └── qr.ts              # TypeScript interfaces, configuration types, and preset constants
```

### Key Principles
1. **100% Client-Side**: All QR encoding and rendering occurs in the user's browser. Never introduce external API calls that send user payload or sensitive data to remote servers.
2. **Deterministic Output**: For identical data and configuration, the encoder and renderer should produce reliable, scan-tested output.
3. **Responsive & Accessible**: Form controls, color inputs, and buttons should be accessible via keyboard and screen readers.

---

## How to Contribute

### Finding Something to Work On
* Browse open issues on GitHub tagged with `good first issue` or `help wanted`.
* Check our [Curated Issue Catalog](docs/GOOD_FIRST_ISSUES.md) for well-scoped tasks across beginner, intermediate, and advanced levels.
* If you have a new idea or found a bug not yet listed, please open an issue first to discuss it with maintainers.

### Branching Workflow
1. Create a branch from `master` using descriptive prefixes:
   * `feat/your-feature-name`
   * `fix/issue-description`
   * `docs/documentation-update`
   * `test/unit-test-addition`
2. Keep commits concise and follow Conventional Commits conventions:
   * `feat: add radial gradient support`
   * `fix: handle empty lines in batch csv parser`
   * `docs: clarify installation steps in README`
   * `test: add unit test for vcard phone encoding`

### Submitting a Pull Request
1. Ensure all verification checks pass before pushing:
   ```bash
   npm run typecheck
   npm run test
   npm run lint
   npm run build
   ```
2. Push your branch to your fork on GitHub.
3. Open a Pull Request against the `master` branch.
4. Fill out the PR template completely with a summary of changes and screenshots for UI updates.
5. Our GitHub Actions CI will automatically test and validate your PR. Maintainers will review your submission promptly.

---

## Asking Questions & Getting Help

If you run into issues, have questions, or need guidance on implementation details:
* Open a discussion or question in GitHub Discussions or Issues.
* Maintainers actively monitor issues and will help unblock your work.
