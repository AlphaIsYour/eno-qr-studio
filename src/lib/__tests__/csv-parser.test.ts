import { describe, it, expect } from 'vitest';
import { parseCSVToBatch } from '../csv-parser';

describe('csv-parser', () => {
  it('parses standard CSV with label, data, type header', () => {
    const csv = `label,data,type
GitHub,https://github.com,url
Website,https://example.com,url
`;
    const items = parseCSVToBatch(csv);
    expect(items).toHaveLength(2);
    expect(items[0].label).toBe('GitHub');
    expect(items[0].data).toBe('https://github.com');
    expect(items[0].dataType).toBe('url');
  });

  it('supports alias headers like url or text', () => {
    const csv = `name,url,type
Repo,https://github.com/AlphaIsYour,link
`;
    const items = parseCSVToBatch(csv);
    expect(items).toHaveLength(1);
    expect(items[0].label).toBe('Repo');
    expect(items[0].data).toBe('https://github.com/AlphaIsYour');
    expect(items[0].dataType).toBe('url');
  });

  it('handles fields with quotes and commas', () => {
    const csv = `label,data,type
"Acme, Inc.",https://acme.com,url
`;
    const items = parseCSVToBatch(csv);
    expect(items).toHaveLength(1);
    expect(items[0].label).toBe('Acme, Inc.');
    expect(items[0].data).toBe('https://acme.com');
  });

  it('normalizes type variations to valid QRDataType', () => {
    const csv = `label,data,type
Item 1,12345,plain
Item 2,tel:+12345,tel
Item 3,mailto:hi@test.com,mail
Item 4,"geo:0,0",map
`;
    const items = parseCSVToBatch(csv);
    expect(items).toHaveLength(4);
    expect(items[0].dataType).toBe('text');
    expect(items[1].dataType).toBe('phone');
    expect(items[2].dataType).toBe('email');
    expect(items[3].dataType).toBe('location');
  });

  it('returns empty array when given empty input', () => {
    expect(parseCSVToBatch('')).toEqual([]);
    expect(parseCSVToBatch('   \n\n  ')).toEqual([]);
  });
});
