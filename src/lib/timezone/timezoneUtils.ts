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

function getOffsetMinutes(timezone: string, year: number, month: number, day: number, hour: number, minute: number): number {
  try {
    const date1 = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const utcParts = formatter.formatToParts(date1);
    const utcStr = `${utcParts.find(p => p.type === 'year')?.value}-${utcParts.find(p => p.type === 'month')?.value}-${utcParts.find(p => p.type === 'day')?.value}T${utcParts.find(p => p.type === 'hour')?.value}:${utcParts.find(p => p.type === 'minute')?.value}:${utcParts.find(p => p.type === 'second')?.value}Z`;

    const date2 = new Date(utcStr);

    const tzFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const tzParts = tzFormatter.formatToParts(date2);
    const tzYear = parseInt(tzParts.find(p => p.type === 'year')?.value || '0', 10);
    const tzMonth = parseInt(tzParts.find(p => p.type === 'month')?.value || '0', 10);
    const tzDay = parseInt(tzParts.find(p => p.type === 'day')?.value || '0', 10);
    const tzHour = parseInt(tzParts.find(p => p.type === 'hour')?.value || '0', 10);
    const tzMinute = parseInt(tzParts.find(p => p.type === 'minute')?.value || '0', 10);
    const tzSecond = parseInt(tzParts.find(p => p.type === 'second')?.value || '0', 10);

    const tzTime = Date.UTC(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute, tzSecond);
    const offsetMs = tzTime - date2.getTime();

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

    // 元タイムゾーンでのオフセットを取得（分単位）
    const sourceOffsetMins = getOffsetMinutes(sourceTimezone.ianaName, year, month, day, hour, minute);

    // 元タイムゾーンの現地時刻をUTCに変換
    // UTC時刻 = 現地時刻 - オフセット
    const totalMinutes = hour * 60 + minute;
    const utcTotalMinutes = totalMinutes - sourceOffsetMins;

    // UTC Dateオブジェクトを作成
    const utcDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    utcDate.setUTCMinutes(utcTotalMinutes);

    // ステップ3: 日付差分を計算
    const getDateInTimezone = (date: Date, timezone: string): number => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        day: 'numeric',
      });
      return parseInt(formatter.format(date), 10);
    };

    const sourceDateOnly = day;
    const targetDateOnly = getDateInTimezone(utcDate, targetTimezone.ianaName);

    let dayDifference: 'same' | 'nextDay' | 'previousDay' = 'same';
    if (targetDateOnly > sourceDateOnly) {
      dayDifference = 'nextDay';
    } else if (targetDateOnly < sourceDateOnly) {
      dayDifference = 'previousDay';
    }

    // ステップ4: ターゲットタイムゾーンでフォーマット
    const targetOffsetStr = getTimezoneOffset(targetTimezone.ianaName, utcDate);
    const targetFormatted = formatDateTimeForTimezone(utcDate, targetTimezone.ianaName, locale);

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
