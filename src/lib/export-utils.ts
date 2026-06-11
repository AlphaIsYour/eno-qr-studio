export function downloadSVG(svgString: string, filename: string): void {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.svg') ? filename : `${filename}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadPNG(dataURL: string, filename: string): void {
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = filename.endsWith('.png') ? filename : `${filename}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function downloadAllAsZip(
  items: Array<{ label: string; svgString: string; dataURL: string }>,
  format: 'png' | 'svg'
): void {
  // Use dynamic import for jszip
  import('jszip').then(({ default: JSZip }) => {
    const zip = new JSZip();
    const folder = zip.folder('qr-codes');

    if (!folder) return;

    items.forEach((item, i) => {
      const safeName = (item.label || `qr-${i + 1}`)
        .replace(/[^a-zA-Z0-9-_ ]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase();

      if (format === 'svg') {
        folder.file(`${safeName}.svg`, item.svgString);
      } else {
        // Convert dataURL to base64
        const base64 = item.dataURL.split(',')[1];
        if (base64) {
          folder.file(`${safeName}.png`, base64, { base64: true });
        }
      }
    });

    zip.generateAsync({ type: 'blob' }).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qr-codes.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  });
}

export function printQRCode(svgString: string, label: string): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Print QR Code</title>
      <style>
        body {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          font-family: system-ui, sans-serif;
        }
        .qr-container {
          text-align: center;
          padding: 24px;
        }
        .qr-container svg {
          max-width: 300px;
          max-height: 300px;
        }
        .qr-label {
          margin-top: 12px;
          font-size: 14px;
          color: #333;
          word-break: break-all;
        }
      </style>
    </head>
    <body>
      <div class="qr-container">
        ${svgString}
        <div class="qr-label">${escapeHtml(label)}</div>
      </div>
      <script>
        window.onload = function() {
          window.print();
          window.close();
        };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

export function printBatchLayout(
  items: Array<{ label: string; svgString: string }>
): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const cards = items
    .map(
      (item) => `
    <div class="qr-item">
      ${item.svgString}
      <div class="qr-label">${escapeHtml(item.label)}</div>
    </div>
  `
    )
    .join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Print QR Codes</title>
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 16px;
          font-family: system-ui, sans-serif;
        }
        .qr-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .qr-item {
          text-align: center;
          padding: 16px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          break-inside: avoid;
        }
        .qr-item svg {
          max-width: 100%;
          height: auto;
          max-height: 200px;
        }
        .qr-label {
          margin-top: 8px;
          font-size: 12px;
          color: #333;
          word-break: break-all;
        }
        @media print {
          .qr-grid { grid-template-columns: repeat(3, 1fr); }
        }
      </style>
    </head>
    <body>
      <div class="qr-grid">${cards}</div>
      <script>
        window.onload = function() {
          window.print();
          window.close();
        };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
