import { Timezone } from '@/data/timezones';

export interface ConversionResult {
  time: string;
  offset: string;
  dayDifference: 'same' | 'nextDay' | 'previousDay';
}

function getTimezoneOffset(timezone: string, date: Date): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const parts = formatter.formatToParts(date);
    const tzDate = {
      year: parseInt(parts.find(p => p.type === 'year')?.value || '0', 10),
      month: parseInt(parts.find(p => p.type === 'month')?.value || '0', 10),
      day: parseInt(parts.find(p => p.type === 'day')?.value || '0', 10),
      hour: parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10),
      minute: parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10),
      second: parseInt(parts.find(p => p.type === 'second')?.value || '0', 10),
    };

    const utcDate = new Date(Date.UTC(tzDate.year, tzDate.month - 1, tzDate.day, tzDate.hour, tzDate.minute, tzDate.second));
    const offsetMs = date.getTime() - utcDate.getTime();
    const offsetMins = offsetMs / (1000 * 60);
    const hours = Math.floor(Math.abs(offsetMins) / 60);
    const mins = Math.abs(offsetMins) % 60;
    const sign = offsetMins >= 0 ? '+' : '-';

    return `${sign}${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  } catch (error) {
    return '+00:00';
  }
}

function getOffsetMinutes(timezone: string, date: Date): number {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const parts = formatter.formatToParts(date);
    const tzDate = {
      year: parseInt(parts.find(p => p.type === 'year')?.value || '0', 10),
      month: parseInt(parts.find(p => p.type === 'month')?.value || '0', 10),
      day: parseInt(parts.find(p => p.type === 'day')?.value || '0', 10),
      hour: parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10),
      minute: parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10),
      second: parseInt(parts.find(p => p.type === 'second')?.value || '0', 10),
    };

    const utcDate = new Date(Date.UTC(tzDate.year, tzDate.month - 1, tzDate.day, tzDate.hour, tzDate.minute, tzDate.second));
    const offsetMs = date.getTime() - utcDate.getTime();
    return offsetMs / (1000 * 60);
  } catch (error) {
    return 0;
  }
}

function formatDateTimeForTimezone(date: Date, timezone: string, locale: string): string {
  try {
    const formatter = new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: locale === 'ja' ? false : true,
    });

    return formatter.format(date);
  } catch (error) {
    return date.toISOString();
  }
}

export function convertTime(
  dateTimeString: string,
  sourceTimezone: Timezone,
  targetTimezone: Timezone,
  locale: string = 'en'
): ConversionResult {
  try {
    const [datePart, timePart] = dateTimeString.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);

    const tempDate = new Date(year, month - 1, day, hour, minute, 0, 0);

    const sourceOffsetMins = getOffsetMinutes(sourceTimezone.ianaName, tempDate);
    const targetOffsetMins = getOffsetMinutes(targetTimezone.ianaName, tempDate);

    const utcMins = hour * 60 + minute - sourceOffsetMins;
    const utcDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    utcDate.setUTCMinutes(utcMins);

    const targetDate = new Date(utcDate.getTime() + targetOffsetMins * 60 * 1000);

    const sourceDate = new Date(year, month - 1, day);
    const targetLocalDate = new Date(targetDate.getTime() + targetOffsetMins * 60 * 1000);
    const sourceDateOnly = sourceDate.getDate();
    const targetDateOnly = targetLocalDate.getDate();

    let dayDifference: 'same' | 'nextDay' | 'previousDay' = 'same';
    if (targetDateOnly > sourceDateOnly) {
      dayDifference = 'nextDay';
    } else if (targetDateOnly < sourceDateOnly) {
      dayDifference = 'previousDay';
    }

    const targetOffsetStr = getTimezoneOffset(targetTimezone.ianaName, targetDate);
    const targetFormatted = formatDateTimeForTimezone(targetDate, targetTimezone.ianaName, locale);

    return {
      time: targetFormatted,
      offset: targetOffsetStr,
      dayDifference,
    };
  } catch (error) {
    console.error('Conversion error:', error);
    throw new Error('Failed to convert timezone');
  }
}

export function getTimezoneOffsetDisplay(timezone: string, date: Date = new Date()): string {
  const offset = getTimezoneOffset(timezone, date);
  return `UTC${offset}`;
}
