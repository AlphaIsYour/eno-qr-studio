import { describe, it, expect } from 'vitest';
import { encodeQRData, getDefaultFields } from '../qr-encoder';
import { QRDataType } from '@/types/qr';

describe('qr-encoder', () => {
  it('encodes plain text correctly', () => {
    const result = encodeQRData('text', { text: 'Hello, Open Source!' });
    expect(result).toBe('Hello, Open Source!');
  });

  it('encodes url correctly', () => {
    const result = encodeQRData('url', { url: 'https://github.com' });
    expect(result).toBe('https://github.com');
  });

  it('encodes wifi network with WPA encryption', () => {
    const result = encodeQRData('wifi', {
      ssid: 'Office_Guest',
      password: 'SecretPassword123',
      encryption: 'WPA',
      hidden: false,
    });
    expect(result).toBe('WIFI:T:WPA;S:Office_Guest;P:SecretPassword123;H:false;;');
  });

  it('escapes special characters in wifi ssid and password', () => {
    const result = encodeQRData('wifi', {
      ssid: 'My;Special,Network',
      password: 'pass;word"test',
      encryption: 'WPA',
      hidden: true,
    });
    expect(result).toBe('WIFI:T:WPA;S:My\\;Special\\,Network;P:pass\\;word\\"test;H:true;;');
  });

  it('encodes vCard contact card correctly', () => {
    const result = encodeQRData('vcard', {
      firstName: 'Jane',
      lastName: 'Smith',
      organization: 'Acme Labs',
      title: 'Maintainer',
      phone: '+1234567890',
      email: 'jane@example.com',
      url: 'https://example.com',
      address: '123 Main St, Springfield',
    });
    expect(result).toContain('BEGIN:VCARD');
    expect(result).toContain('VERSION:3.0');
    expect(result).toContain('FN:Jane Smith');
    expect(result).toContain('N:Smith;Jane;;;');
    expect(result).toContain('ORG:Acme Labs');
    expect(result).toContain('TITLE:Maintainer');
    expect(result).toContain('TEL;TYPE=CELL:+1234567890');
    expect(result).toContain('EMAIL:jane@example.com');
    expect(result).toContain('URL:https://example.com');
    expect(result).toContain('ADR:;;123 Main St, Springfield;;;;');
    expect(result).toContain('END:VCARD');
  });

  it('encodes email with subject and body query string', () => {
    const result = encodeQRData('email', {
      to: 'team@example.com',
      subject: 'Inquiry',
      body: 'Hello team',
    });
    expect(result).toBe('mailto:team@example.com?subject=Inquiry&body=Hello+team');
  });

  it('encodes phone number with tel: prefix', () => {
    const result = encodeQRData('phone', { phone: '+123456789' });
    expect(result).toBe('tel:+123456789');
  });

  it('encodes sms with smsto: format', () => {
    const result = encodeQRData('sms', {
      phone: '+123456789',
      message: 'Here is your verification code',
    });
    expect(result).toBe('smsto:+123456789:Here is your verification code');
  });

  it('encodes location with latitude and longitude', () => {
    const result = encodeQRData('location', {
      latitude: '-6.2088',
      longitude: '106.8456',
      query: '',
    });
    expect(result).toBe('geo:-6.2088,106.8456');
  });

  it('encodes location query fallback', () => {
    const result = encodeQRData('location', {
      latitude: '',
      longitude: '',
      query: 'Monas Jakarta',
    });
    expect(result).toBe('geo:0,0?q=Monas%20Jakarta');
  });

  it('provides default fields for every supported type', () => {
    const types: QRDataType[] = [
      'text', 'url', 'wifi', 'vcard', 'email', 'phone', 'sms', 'event', 'location',
    ];
    for (const t of types) {
      const defaults = getDefaultFields(t);
      expect(defaults).toBeDefined();
      expect(typeof defaults).toBe('object');
    }
  });
});
