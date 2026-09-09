# Contributor Issue Catalog

Welcome to the Eno QR Studio issue catalog. This document provides well-defined, actionable tasks for contributors of all experience levels.

If you would like to work on one of these issues:
1. Check existing open issues on GitHub to see if someone is already assigned.
2. Comment on the corresponding issue or open a new issue citing this catalog.
3. Once approved by a maintainer, submit your PR referencing the issue!

---

## Contributor Ladder

* **Level 1 (Beginner / Good First Issue)**: 1-3 hours. Focused on documentation, small bug fixes, UI polish, or adding simple test cases.
* **Level 2 (Intermediate)**: 1-2 days. Involves extending existing components, handling data edge cases, improving accessibility, or adding new encoding schemes.
* **Level 3 (Advanced)**: Multi-day. Architectural features such as SVG gradient rendering, frame templates, webcam scanning, or PWA integration.

---

## Tier 1: Beginner (Good First Issues)

### Issue #B1: Add URL Protocol Auto-Completion in DataTypeForm
* **Difficulty**: Beginner
* **Suggested Labels**: `good first issue`, `enhancement`, `ui/ux`
* **Relevant Files**: `src/components/DataTypeForm.tsx`
* **Problem**: When users type `google.com` into the URL field without `https://`, some QR reader apps fail to recognize it as a clickable web link and treat it as plain text instead.
* **Why**: Enhancing input ergonomics prevents broken QR codes and improves end-user satisfaction.
* **Current Behavior**: If the user leaves out `https://`, the raw string without scheme is encoded.
* **Expected Behavior**: If a user enters a domain without a protocol (e.g. `example.com`), provide either a soft helper text, an automatic prefix prepend on blur, or a protocol selector dropdown (`https://` by default).
* **Acceptance Criteria**:
  * Entering `example.com` automatically formats or suggests `https://example.com`.
  * Existing valid protocols (`http://`, `https://`) are preserved.
  * Unit tests are added or updated.

---

### Issue #B2: Add Visual Toast / Notification on Download and Copy Actions
* **Difficulty**: Beginner
* **Suggested Labels**: `good first issue`, `ui/ux`
* **Relevant Files**: `src/components/QRPreview.tsx`, `src/components/BatchPanel.tsx`
* **Problem**: Clicking "Download PNG" or "Download SVG" triggers a file download without any visual confirmation toast in the UI. Only "Copy SVG" currently shows a small inline change.
* **Why**: Clear UI feedback informs users that their action succeeded, especially on slower devices or when generating large batches.
* **Current Behavior**: File downloads silently in the browser background.
* **Expected Behavior**: A subtle, elegant toast or status indicator appears confirming "Downloaded [filename].png".
* **Acceptance Criteria**:
  * Non-intrusive toast or notification appears upon successful export.
  * Auto-dismisses after 2.5 seconds.
  * Styled consistently with Tailwind CSS theme variables.

---

### Issue #B3: Add Copy Encoded Payload Button to Live Preview
* **Difficulty**: Beginner
* **Suggested Labels**: `good first issue`, `enhancement`
* **Relevant Files**: `src/app/generator/page.tsx`
* **Problem**: In the generator preview, the encoded string is shown (e.g., `WIFI:T:WPA;S:MyNetwork;P:password;;`), but users cannot copy the raw text to test or inspect it without manually highlighting it.
* **Why**: Developers and power users frequently want to verify or inspect the raw QR string.
* **Current Behavior**: Text is displayed inside a `<p>` tag without a copy shortcut.
* **Expected Behavior**: A small "Copy String" icon button next to "Encoded Data" copies the string to the clipboard with visual checkmark feedback.
* **Acceptance Criteria**:
  * Copy button works on both desktop and mobile.
  * Visual feedback indicates successful copy.

---

### Issue #B4: Add Unit Tests for Edge-Case Phone and SMS Encoding
* **Difficulty**: Beginner
* **Suggested Labels**: `good first issue`, `testing`
* **Relevant Files**: `src/lib/__tests__/qr-encoder.test.ts`, `src/lib/qr-encoder.ts`
* **Problem**: `encodeSMS` and `encodePhone` currently have minimal unit test coverage for international phone numbers with spaces, brackets, or leading zeros.
* **Why**: Ensuring robust character handling prevents malformed `tel:` or `smsto:` payloads.
* **Expected Behavior**: Test suite covers international formats (e.g. `+62 812-3456-7890`, `(021) 555-1234`).
* **Acceptance Criteria**:
  * Tests pass cleanly in `npm run test`.
  * Any normalization needed is cleanly implemented without breaking valid inputs.

---

## Tier 2: Intermediate Issues

### Issue #I1: Support Empty Data Warning and Row Feedback in Batch CSV Parser
* **Difficulty**: Intermediate
* **Suggested Labels**: `help wanted`, `bug`, `enhancement`
* **Relevant Files**: `src/lib/csv-parser.ts`, `src/components/BatchPanel.tsx`
* **Problem**: If a row in the CSV contains an empty data cell, `parseCSVToBatch` drops it silently without notifying the user why rows are missing from the parsed count.
* **Why**: Prevents user confusion when importing large spreadsheets where occasional rows are missing required fields.
* **Current Behavior**: `if (data) items.push(...)` drops the row without reporting.
* **Expected Behavior**:
  * The parser returns both `items: BatchItem[]` and `errors: Array<{ line: number; message: string }>`.
  * The UI displays a warning list of skipped line numbers with reasons.
* **Acceptance Criteria**:
  * Users can see exactly which line numbers had errors.
  * Valid rows are still parsed and generated successfully.
  * Unit tests cover empty cells and warning generation.

---

### Issue #I2: Add Local Storage History for Recent QR Codes
* **Difficulty**: Intermediate
* **Suggested Labels**: `help wanted`, `feature`
* **Relevant Files**: `src/app/generator/page.tsx`, `src/types/qr.ts`, new helper `src/lib/storage.ts`
* **Problem**: Refreshing the browser resets the generator form, losing previous inputs and customizations.
* **Why**: Users who frequently create QR codes need quick access to their recent configurations without retyping.
* **Current Behavior**: State is kept in memory only; page reload resets to default URL.
* **Expected Behavior**:
  * An optional "Recent" drawer or tab lists the last 10 generated QR codes stored in browser `localStorage`.
  * Clicking an entry restores its data and visual settings into the editor.
  * A "Clear History" button allows wiping stored records for privacy.
* **Acceptance Criteria**:
  * Stored entirely on client via `localStorage`.
  * Sensitive Wi-Fi passwords can be excluded or masked if configured.
  * Doesn't slow down initial render.

---

### Issue #I3: Implement Keyboard Shortcuts for Generator Workflow
* **Difficulty**: Intermediate
* **Suggested Labels**: `accessibility`, `enhancement`
* **Relevant Files**: `src/app/generator/page.tsx`
* **Problem**: Navigating between QR types and triggering export actions currently requires mouse interaction.
* **Why**: Keyboard navigation significantly accelerates productivity for power users and improves accessibility (a11y).
* **Expected Behavior**:
  * `Ctrl/Cmd + S`: Trigger PNG export.
  * `Ctrl/Cmd + Shift + S`: Trigger SVG export.
  * `Ctrl/Cmd + C` (in preview focus): Copy SVG markup.
* **Acceptance Criteria**:
  * Shortcuts do not conflict with browser default text editing shortcuts.
  * Keyboard shortcut hint tooltip or helper modal is available (`?` key).

---

### Issue #I4: Support Multi-line Cells in CSV Parser
* **Difficulty**: Intermediate
* **Suggested Labels**: `help wanted`, `bug`
* **Relevant Files**: `src/lib/csv-parser.ts`, `src/lib/__tests__/csv-parser.test.ts`
* **Problem**: `parseCSVToBatch` begins by splitting the entire input using `.split('\n')`. If a cell contains a newline character enclosed in double quotes (standard RFC 4180 CSV), it breaks into two invalid rows.
* **Why**: Essential for multi-line text notes or vCard address fields in CSV imports.
* **Current Behavior**: Splitting on `\n` corrupts quoted multiline fields.
* **Expected Behavior**: A stateful RFC 4180 CSV parser that respects newlines inside quoted strings.
* **Acceptance Criteria**:
  * CSV input with quoted newlines parses correctly.
  * Unit tests in `csv-parser.test.ts` verify multiline preservation.

---

## Tier 3: Advanced Issues

### Issue #A1: Support Linear and Radial Gradient Foreground Colors
* **Difficulty**: Advanced
* **Suggested Labels**: `enhancement`, `help wanted`
* **Relevant Files**: `src/types/qr.ts`, `src/lib/qr-renderer.ts`, `src/components/CustomizePanel.tsx`
* **Problem**: The SVG renderer only supports solid hex colors for foreground modules (`config.foregroundColor`).
* **Why**: Gradient QR codes are a top aesthetic feature for modern branding, posters, and events.
* **Expected Behavior**:
  * `QRConfig` supports `colorMode: 'solid' | 'gradient'`, `gradientStart`, `gradientEnd`, and `gradientAngle` (e.g. 45°, 90°, 135°).
  * `qr-renderer.ts` injects `<linearGradient id="qr-gradient">` inside `<defs>` and sets `fill="url(#qr-gradient)"` on module elements.
  * Both SVG export and Canvas PNG export correctly render the gradient.
* **Acceptance Criteria**:
  * Color picker UI in `CustomizePanel.tsx` toggles between Solid and Gradient modes.
  * High-resolution PNG and vector SVG export preserve gradient faithfully.
  * Scannability is verified with standard smartphone camera readers.

---

### Issue #A2: Add Printable Frame / Badge Templates ("Scan Me", "Connect Wi-Fi")
* **Difficulty**: Advanced
* **Suggested Labels**: `feature`, `ui/ux`
* **Relevant Files**: `src/types/qr.ts`, `src/lib/qr-renderer.ts`, `src/components/CustomizePanel.tsx`
* **Problem**: Many users print QR codes on table tents, flyers, or window stickers that require an outer frame with call-to-action text like "SCAN ME" or "VISIT MENU".
* **Why**: Saves users from having to use external design tools (Canva/Photoshop) just to add a frame and call-to-action banner.
* **Expected Behavior**:
  * Selection of 3 frame styles: `none`, `bottom-banner`, `bubble-top`.
  * Customizable frame text (default: "SCAN ME") and font color.
  * Outer border surrounds the QR matrix and scales cleanly with the export dimensions.
* **Acceptance Criteria**:
  * Frame seamlessly integrates into SVG and PNG export.
  * Layout remains scannable and centered.

---

### Issue #A3: In-Browser QR Code Scanner & Decoder
* **Difficulty**: Advanced
* **Suggested Labels**: `feature`, `help wanted`
* **Relevant Files**: new page `src/app/scanner/page.tsx`, new components
* **Problem**: Eno QR Studio can currently generate QR codes, but users cannot test or verify codes using their webcam or by uploading an image.
* **Why**: Completes the studio as a two-way QR toolkit (Generator + Reader) while retaining the 100% client-side privacy guarantee.
* **Expected Behavior**:
  * A `/scanner` route allowing drag-and-drop image upload or live camera access.
  * Decoded content is displayed with actions (Copy, Open URL, or "Edit in Generator").
* **Acceptance Criteria**:
  * 100% client-side processing using Web APIs (Barcode Detection API or lightweight JS decoder).
  * Gracefully handles camera permission denials.
