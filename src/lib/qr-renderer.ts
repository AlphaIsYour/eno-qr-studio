import QRCode from 'qrcode';
import { QRConfig } from '@/types/qr';

export interface QRRenderResult {
  svgString: string;
  dataURL: string;
}

export async function renderQR(data: string, config: QRConfig): Promise<QRRenderResult> {
  if (!data) {
    return { svgString: '', dataURL: '' };
  }

  const modules = QRCode.create(data, {
    errorCorrectionLevel: config.errorCorrectionLevel,
  });

  const moduleCount = modules.modules.size;
  const cellSize = Math.floor((config.size - config.margin * 2) / moduleCount);
  const totalSize = cellSize * moduleCount + config.margin * 2;

  // Build SVG
  const svgParts: string[] = [];
  svgParts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize}" width="${totalSize}" height="${totalSize}">`
  );
  svgParts.push(
    `<rect width="${totalSize}" height="${totalSize}" fill="${config.backgroundColor}"/>`
  );

  // Draw modules
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (modules.modules.get(row, col)) {
        const x = config.margin + col * cellSize;
        const y = config.margin + row * cellSize;

        // Check if this is a corner (finder pattern) area
        const isCorner =
          (row < 7 && col < 7) ||
          (row < 7 && col >= moduleCount - 7) ||
          (row >= moduleCount - 7 && col < 7);

        const style = getModuleStyle(
          config.patternStyle,
          config.cornerStyle,
          x,
          y,
          cellSize,
          isCorner,
          config.foregroundColor
        );
        svgParts.push(style);
      }
    }
  }

  // Draw logo overlay if configured
  if (config.logoFile) {
    const logoSize = (totalSize * config.logoSize) / 100;
    const logoX = (totalSize - logoSize) / 2;
    const logoY = (totalSize - logoSize) / 2;
    const logoPadding = logoSize * 0.1;
    svgParts.push(
      `<rect x="${logoX - logoPadding}" y="${logoY - logoPadding}" width="${logoSize + logoPadding * 2}" height="${logoSize + logoPadding * 2}" rx="8" fill="${config.backgroundColor}"/>`
    );
    svgParts.push(
      `<image x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" href="${config.logoFile}" preserveAspectRatio="xMidYMid slice"/>`
    );
  }

  svgParts.push('</svg>');
  const svgString = svgParts.join('\n');

  // Generate data URL for PNG export
  const dataURL = await svgToDataURL(svgString, totalSize);

  return { svgString, dataURL };
}

function getModuleStyle(
  pattern: string,
  cornerStyle: string,
  x: number,
  y: number,
  size: number,
  isCorner: boolean,
  foregroundColor: string
): string {
  const color = foregroundColor;
  const cx = x + size / 2;
  const cy = y + size / 2;
  const r = size / 2;

  // Corner patterns get special treatment
  if (isCorner && cornerStyle !== 'square') {
    if (cornerStyle === 'dot') {
      return `<circle cx="${cx}" cy="${cy}" r="${r * 0.85}" fill="${color}"/>`;
    }
    if (cornerStyle === 'rounded') {
      const rr = size * 0.3;
      return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${rr}" fill="${color}"/>`;
    }
  }

  // Data area patterns
  switch (pattern) {
    case 'dots':
      return `<circle cx="${cx}" cy="${cy}" r="${r * 0.8}" fill="${color}"/>`;
    case 'rounded':
      return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${size * 0.3}" fill="${color}"/>`;
    case 'classy':
      return `<rect x="${x + 1}" y="${y + 1}" width="${size - 2}" height="${size - 2}" rx="1" fill="${color}"/>`;
    case 'classy-rounded':
      return `<rect x="${x + 1}" y="${y + 1}" width="${size - 2}" height="${size - 2}" rx="${size * 0.35}" fill="${color}"/>`;
    case 'extra-rounded':
      return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${size * 0.45}" fill="${color}"/>`;
    default: // square
      return `<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}"/>`;
  }
}

async function svgToDataURL(svgString: string, size: number): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve('');
      return;
    }

    const scale = 2; // Retina
    canvas.width = size * scale;
    canvas.height = size * scale;

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve('');
    };
    img.src = url;
  });
}

export function generateSampleData(type: string): string {
  switch (type) {
    case 'url':
      return 'https://github.com';
    case 'wifi':
      return 'WIFI:T:WPA;S:MyNetwork;P:password123;H:false;;';
    case 'vcard':
      return 'BEGIN:VCARD\nVERSION:3.0\nN:Doe;John;;;\nFN:John Doe\nORG:Acme Corp\nTEL;TYPE=CELL:+1234567890\nEMAIL:john@example.com\nEND:VCARD';
    case 'email':
      return 'mailto:hello@example.com?subject=Hello&body=Hi%20there';
    case 'phone':
      return 'tel:+1234567890';
    case 'sms':
      return 'smsto:+1234567890:Hello!';
    case 'event':
      return 'BEGIN:VEVENT\nSUMMARY:Team Meeting\nLOCATION:Conference Room\nDTSTART:20260615T090000\nDTEND:20260615T100000\nEND:VEVENT';
    case 'location':
      return 'geo:-6.2088,106.8456';
    default:
      return 'Hello, World!';
  }
}
