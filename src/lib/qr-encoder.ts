import {
  QRDataType,
  WifiData,
  VCardData,
  EmailData,
  SMSData,
  EventData,
  LocationData,
} from '@/types/qr';

export function encodeQRData(dataType: QRDataType, fields: Record<string, string | boolean>): string {
  switch (dataType) {
    case 'text':
      return (fields.text as string) || '';
    case 'url':
      return (fields.url as string) || '';
    case 'wifi':
      return encodeWifi(fields as unknown as WifiData);
    case 'vcard':
      return encodeVCard(fields as unknown as VCardData);
    case 'email':
      return encodeEmail(fields as unknown as EmailData);
    case 'phone':
      return `tel:${(fields.phone as string) || ''}`;
    case 'sms':
      return encodeSMS(fields as unknown as SMSData);
    case 'event':
      return encodeEvent(fields as unknown as EventData);
    case 'location':
      return encodeLocation(fields as unknown as LocationData);
    default:
      return '';
  }
}

function encodeWifi(data: WifiData): string {
  const t = data.encryption === 'nopass' ? 'nopass' : data.encryption;
  const hidden = data.hidden ? 'true' : 'false';
  return `WIFI:T:${t};S:${escapeWifi(data.ssid)};P:${escapeWifi(data.password)};H:${hidden};;`;
}

function escapeWifi(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/"/g, '\\"');
}

function encodeVCard(data: VCardData): string {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${data.lastName};${data.firstName};;;`,
    `FN:${data.firstName} ${data.lastName}`,
    data.organization ? `ORG:${data.organization}` : '',
    data.title ? `TITLE:${data.title}` : '',
    data.phone ? `TEL;TYPE=CELL:${data.phone}` : '',
    data.email ? `EMAIL:${data.email}` : '',
    data.url ? `URL:${data.url}` : '',
    data.address ? `ADR:;;${data.address};;;;` : '',
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\n');
}

function encodeEmail(data: EmailData): string {
  const params = new URLSearchParams();
  if (data.subject) params.set('subject', data.subject);
  if (data.body) params.set('body', data.body);
  const qs = params.toString();
  return `mailto:${data.to || ''}${qs ? '?' + qs : ''}`;
}

function encodeSMS(data: SMSData): string {
  // Use SMSTO: format which is widely supported
  return `smsto:${data.phone || ''}:${data.message || ''}`;
}

function encodeEvent(data: EventData): string {
  const formatDT = (dt: string) => {
    if (!dt) return '';
    const d = new Date(dt);
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };
  return [
    'BEGIN:VEVENT',
    `SUMMARY:${data.title || ''}`,
    data.location ? `LOCATION:${data.location}` : '',
    data.description ? `DESCRIPTION:${data.description}` : '',
    data.startDate ? `DTSTART:${formatDT(data.startDate)}` : '',
    data.endDate ? `DTEND:${formatDT(data.endDate)}` : '',
    'END:VEVENT',
  ]
    .filter(Boolean)
    .join('\n');
}

function encodeLocation(data: LocationData): string {
  if (data.latitude && data.longitude) {
    return `geo:${data.latitude},${data.longitude}`;
  }
  if (data.query) {
    return `geo:0,0?q=${encodeURIComponent(data.query)}`;
  }
  return 'geo:0,0';
}

export function getDefaultFields(dataType: QRDataType): Record<string, string | boolean> {
  switch (dataType) {
    case 'text':
      return { text: '' };
    case 'url':
      return { url: 'https://' };
    case 'wifi':
      return { ssid: '', password: '', encryption: 'WPA', hidden: false };
    case 'vcard':
      return { firstName: '', lastName: '', organization: '', title: '', phone: '', email: '', url: '', address: '' };
    case 'email':
      return { to: '', subject: '', body: '' };
    case 'phone':
      return { phone: '' };
    case 'sms':
      return { phone: '', message: '' };
    case 'event':
      return { title: '', location: '', description: '', startDate: '', endDate: '' };
    case 'location':
      return { latitude: '', longitude: '', query: '' };
    default:
      return {};
  }
}
