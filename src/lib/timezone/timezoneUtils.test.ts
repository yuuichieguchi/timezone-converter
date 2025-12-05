import { describe, it, expect } from 'vitest';
import { convertTime } from './timezoneUtils';
import { findTimezone } from '@/data/timezones';

describe('convertTime', () => {
  it('should convert Tokyo to Tokyo (same timezone)', () => {
    const tokyo = findTimezone('asia/tokyo')!;

    const result = convertTime('2025-12-05T23:21', tokyo, tokyo, 'ja');

    expect(result.time).toContain('23:21');
    expect(result.time).toContain('2025');
    expect(result.time).toContain('12');
    expect(result.time).toContain('5');
    expect(result.dayDifference).toBe('same');
  });

  it('should convert Tokyo to New York', () => {
    const tokyo = findTimezone('asia/tokyo')!;
    const newYork = findTimezone('america/new_york')!;

    const result = convertTime('2025-12-05T23:21', tokyo, newYork, 'en');

    expect(result.time).toContain('9:21');
    expect(result.dayDifference).toBe('same');
  });

  it('should convert New York to Tokyo', () => {
    const tokyo = findTimezone('asia/tokyo')!;
    const newYork = findTimezone('america/new_york')!;

    const result = convertTime('2025-12-05T10:00', newYork, tokyo, 'ja');

    expect(result.time).toContain('0:00');
    expect(result.time).toContain('12');
    expect(result.time).toContain('6');
    expect(result.dayDifference).toBe('nextDay');
  });
});
