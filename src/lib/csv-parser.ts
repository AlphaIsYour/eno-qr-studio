import { BatchItem, QRDataType } from '@/types/qr';

export function parseCSVToBatch(csvText: string): BatchItem[] {
  const lines = csvText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length === 0) return [];

  // Check if first line is a header
  const firstLine = parseCSVLine(lines[0]);
  const hasHeader =
    firstLine.some((h) =>
      ['label', 'name', 'title', 'data', 'text', 'url', 'content', 'type'].includes(h.toLowerCase())
    );

  const startIndex = hasHeader ? 1 : 0;
  const headerMap = hasHeader ? firstLine.map((h) => h.toLowerCase().trim()) : null;

  const items: BatchItem[] = [];

  for (let i = startIndex; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length === 0) continue;

    let label = '';
    let data = '';
    let dataType: QRDataType = 'text';

    if (headerMap) {
      const labelIdx = headerMap.findIndex((h) => ['label', 'name', 'title'].includes(h));
      const dataIdx = headerMap.findIndex((h) => ['data', 'text', 'url', 'content'].includes(h));
      const typeIdx = headerMap.findIndex((h) => h === 'type');

      label = labelIdx >= 0 ? cols[labelIdx] || '' : cols[0] || `Item ${i}`;
      data = dataIdx >= 0 ? cols[dataIdx] || '' : cols[Math.min(1, cols.length - 1)] || '';
      if (typeIdx >= 0 && cols[typeIdx]) {
        dataType = normalizeQRType(cols[typeIdx]);
      }
    } else {
      label = cols[0] || `Item ${i}`;
      data = cols[1] || cols[0] || '';
      if (cols[2]) {
        dataType = normalizeQRType(cols[2]);
      }
    }

    if (data) {
      items.push({
        id: `batch-${Date.now()}-${i}`,
        label: label || `QR ${items.length + 1}`,
        data,
        dataType,
      });
    }
  }

  return items;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function normalizeQRType(s: string): QRDataType {
  const lower = s.toLowerCase().trim();
  const map: Record<string, QRDataType> = {
    text: 'text',
    plain: 'text',
    url: 'url',
    link: 'url',
    wifi: 'wifi',
    vcard: 'vcard',
    contact: 'vcard',
    email: 'email',
    mail: 'email',
    phone: 'phone',
    tel: 'phone',
    sms: 'sms',
    event: 'event',
    calendar: 'event',
    location: 'location',
    geo: 'location',
    map: 'location',
  };
  return map[lower] || 'text';
}
