'use client';

import { QRDataType } from '@/types/qr';

interface DataTypeFormProps {
  dataType: QRDataType;
  fields: Record<string, string | boolean>;
  onChange: (fields: Record<string, string | boolean>) => void;
}

const inputClass =
  'w-full px-3 py-2.5 rounded-xl border border-border bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-smooth placeholder:text-muted/50';
const labelClass = 'block text-sm font-medium mb-1.5';
const rowClass = 'space-y-4';

export default function DataTypeForm({ dataType, fields, onChange }: DataTypeFormProps) {
  const update = (key: string, value: string | boolean) => {
    onChange({ ...fields, [key]: value });
  };

  switch (dataType) {
    case 'text':
      return (
        <div className={rowClass}>
          <div>
            <label className={labelClass}>Text Content</label>
            <textarea
              className={`${inputClass} min-h-[120px] resize-y`}
              placeholder="Enter any text..."
              value={(fields.text as string) || ''}
              onChange={(e) => update('text', e.target.value)}
            />
          </div>
        </div>
      );

    case 'url':
      return (
        <div className={rowClass}>
          <div>
            <label className={labelClass}>URL</label>
            <input
              type="url"
              className={inputClass}
              placeholder="https://example.com"
              value={(fields.url as string) || ''}
              onChange={(e) => update('url', e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {['https://github.com', 'https://linkedin.com', 'https://youtube.com'].map((u) => (
              <button
                key={u}
                onClick={() => update('url', u)}
                className="px-3 py-1 text-xs rounded-lg border border-border hover:bg-surface-hover transition-smooth"
              >
                {u.replace('https://', '')}
              </button>
            ))}
          </div>
        </div>
      );

    case 'wifi':
      return (
        <div className={rowClass}>
          <div>
            <label className={labelClass}>Network Name (SSID)</label>
            <input
              type="text"
              className={inputClass}
              placeholder="My Wi-Fi Network"
              value={(fields.ssid as string) || ''}
              onChange={(e) => update('ssid', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="text"
              className={inputClass}
              placeholder="password123"
              value={(fields.password as string) || ''}
              onChange={(e) => update('password', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Encryption</label>
            <select
              className={inputClass}
              value={(fields.encryption as string) || 'WPA'}
              onChange={(e) => update('encryption', e.target.value)}
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None (Open)</option>
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded accent-accent"
              checked={(fields.hidden as boolean) || false}
              onChange={(e) => update('hidden', e.target.checked)}
            />
            <span className="text-sm">Hidden network</span>
          </label>
        </div>
      );

    case 'vcard':
      return (
        <div className={rowClass}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                className={inputClass}
                placeholder="John"
                value={(fields.firstName as string) || ''}
                onChange={(e) => update('firstName', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Doe"
                value={(fields.lastName as string) || ''}
                onChange={(e) => update('lastName', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Organization</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Acme Corp"
              value={(fields.organization as string) || ''}
              onChange={(e) => update('organization', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Job Title</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Software Engineer"
              value={(fields.title as string) || ''}
              onChange={(e) => update('title', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="tel"
              className={inputClass}
              placeholder="+1 234 567 8900"
              value={(fields.phone as string) || ''}
              onChange={(e) => update('phone', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              className={inputClass}
              placeholder="john@example.com"
              value={(fields.email as string) || ''}
              onChange={(e) => update('email', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Website</label>
            <input
              type="url"
              className={inputClass}
              placeholder="https://johndoe.com"
              value={(fields.url as string) || ''}
              onChange={(e) => update('url', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input
              type="text"
              className={inputClass}
              placeholder="123 Main St, City, Country"
              value={(fields.address as string) || ''}
              onChange={(e) => update('address', e.target.value)}
            />
          </div>
        </div>
      );

    case 'email':
      return (
        <div className={rowClass}>
          <div>
            <label className={labelClass}>To</label>
            <input
              type="email"
              className={inputClass}
              placeholder="hello@example.com"
              value={(fields.to as string) || ''}
              onChange={(e) => update('to', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Subject</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Hello!"
              value={(fields.subject as string) || ''}
              onChange={(e) => update('subject', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Body</label>
            <textarea
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Write your message..."
              value={(fields.body as string) || ''}
              onChange={(e) => update('body', e.target.value)}
            />
          </div>
        </div>
      );

    case 'phone':
      return (
        <div className={rowClass}>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="tel"
              className={inputClass}
              placeholder="+1 234 567 8900"
              value={(fields.phone as string) || ''}
              onChange={(e) => update('phone', e.target.value)}
            />
          </div>
        </div>
      );

    case 'sms':
      return (
        <div className={rowClass}>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="tel"
              className={inputClass}
              placeholder="+1 234 567 8900"
              value={(fields.phone as string) || ''}
              onChange={(e) => update('phone', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Message</label>
            <textarea
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder="Your message here..."
              value={(fields.message as string) || ''}
              onChange={(e) => update('message', e.target.value)}
            />
          </div>
        </div>
      );

    case 'event':
      return (
        <div className={rowClass}>
          <div>
            <label className={labelClass}>Event Title</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Team Meeting"
              value={(fields.title as string) || ''}
              onChange={(e) => update('title', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Conference Room A"
              value={(fields.location as string) || ''}
              onChange={(e) => update('location', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              className={`${inputClass} min-h-[60px] resize-y`}
              placeholder="Weekly sync-up..."
              value={(fields.description as string) || ''}
              onChange={(e) => update('description', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Start</label>
              <input
                type="datetime-local"
                className={inputClass}
                value={(fields.startDate as string) || ''}
                onChange={(e) => update('startDate', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>End</label>
              <input
                type="datetime-local"
                className={inputClass}
                value={(fields.endDate as string) || ''}
                onChange={(e) => update('endDate', e.target.value)}
              />
            </div>
          </div>
        </div>
      );

    case 'location':
      return (
        <div className={rowClass}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Latitude</label>
              <input
                type="text"
                className={inputClass}
                placeholder="-6.2088"
                value={(fields.latitude as string) || ''}
                onChange={(e) => update('latitude', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Longitude</label>
              <input
                type="text"
                className={inputClass}
                placeholder="106.8456"
                value={(fields.longitude as string) || ''}
                onChange={(e) => update('longitude', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Or Search Query</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Eiffel Tower, Paris"
              value={(fields.query as string) || ''}
              onChange={(e) => update('query', e.target.value)}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}
