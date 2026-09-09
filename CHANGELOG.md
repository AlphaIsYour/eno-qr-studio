# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-09-09

### Added
* Initial public open-source release of Eno QR Studio.
* Support for 9 QR payload formats: Plain Text, URL, Wi-Fi, vCard (Contact Card), Email, Phone, SMS, Calendar Event, and Map Location.
* 6 matrix pattern styles: Square, Rounded, Dots, Classy, Classy-Rounded, Extra-Rounded.
* 3 corner eye styles: Square, Dot, Rounded.
* Color picker controls for foreground and background with pre-configured color palettes.
* Logo overlay upload with adjustable center-position sizing (10% - 35%).
* Error correction level controls (L, M, Q, H).
* Retina 2x PNG export, SVG vector export, clipboard copy, and direct print layout dialog.
* Batch QR code generation supporting CSV text import and bulk ZIP download.
* Vitest automated unit test suite with 16 test cases for encoders and CSV parser.
* GitHub Actions CI workflow for automated typecheck, test, and build validation.
* Contributor onboarding documentation, issue templates, PR template, Code of Conduct, and Security policy.

### Changed
* Modernized SVG-to-PNG canvas converter to use standard Blob and Object URL APIs instead of deprecated `unescape()`.
