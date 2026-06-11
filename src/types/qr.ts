export type QRDataType =
  | 'text'
  | 'url'
  | 'wifi'
  | 'vcard'
  | 'email'
  | 'phone'
  | 'sms'
  | 'event'
  | 'location';

export type CornerStyle = 'square' | 'dot' | 'rounded';
export type PatternStyle = 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRConfig {
  dataType: QRDataType;
  data: string;
  foregroundColor: string;
  backgroundColor: string;
  cornerStyle: CornerStyle;
  patternStyle: PatternStyle;
  size: number;
  margin: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  logoFile: string | null;
  logoSize: number;
}

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  email: string;
  url: string;
  address: string;
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export interface SMSData {
  phone: string;
  message: string;
}

export interface EventData {
  title: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface LocationData {
  latitude: string;
  longitude: string;
  query: string;
}

export interface BatchItem {
  id: string;
  label: string;
  data: string;
  dataType: QRDataType;
}

export const QR_TYPE_INFO: Record<QRDataType, { label: string; icon: string; description: string }> = {
  text: { label: 'Plain Text', icon: 'Type', description: 'Encode any text message' },
  url: { label: 'URL / Link', icon: 'Link', description: 'Link to a website or page' },
  wifi: { label: 'Wi-Fi', icon: 'Wifi', description: 'Share Wi-Fi credentials' },
  vcard: { label: 'Contact Card', icon: 'User', description: 'Digital business card (vCard)' },
  email: { label: 'Email', icon: 'Mail', description: 'Pre-filled email message' },
  phone: { label: 'Phone', icon: 'Phone', description: 'Direct phone call link' },
  sms: { label: 'SMS', icon: 'MessageSquare', description: 'Pre-filled text message' },
  event: { label: 'Calendar Event', icon: 'Calendar', description: 'Add event to calendar' },
  location: { label: 'Location', icon: 'MapPin', description: 'Share a map location' },
};

export const PRESET_COLORS = [
  '#000000', '#1a1a2e', '#16213e', '#0f3460', '#533483',
  '#e94560', '#ff6b6b', '#feca57', '#48dbfb', '#0abde3',
  '#10ac84', '#1dd1a1', '#ee5a24', '#f368e0', '#5f27cd',
  '#222f3e', '#576574', '#8395a7', '#c8d6e5', '#ffffff',
];
