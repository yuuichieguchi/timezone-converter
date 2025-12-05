export interface Timezone {
  id: string;
  ianaName: string;
  region: string;
}

export const TIMEZONE_LIST: Timezone[] = [
  { id: 'utc', ianaName: 'UTC', region: 'UTC' },
  { id: 'america/new_york', ianaName: 'America/New_York', region: 'Americas' },
  { id: 'america/chicago', ianaName: 'America/Chicago', region: 'Americas' },
  { id: 'america/denver', ianaName: 'America/Denver', region: 'Americas' },
  { id: 'america/los_angeles', ianaName: 'America/Los_Angeles', region: 'Americas' },
  { id: 'america/sao_paulo', ianaName: 'America/Sao_Paulo', region: 'Americas' },
  { id: 'europe/london', ianaName: 'Europe/London', region: 'Europe' },
  { id: 'europe/paris', ianaName: 'Europe/Paris', region: 'Europe' },
  { id: 'europe/berlin', ianaName: 'Europe/Berlin', region: 'Europe' },
  { id: 'asia/dubai', ianaName: 'Asia/Dubai', region: 'Asia' },
  { id: 'asia/kolkata', ianaName: 'Asia/Kolkata', region: 'Asia' },
  { id: 'asia/bangkok', ianaName: 'Asia/Bangkok', region: 'Asia' },
  { id: 'asia/singapore', ianaName: 'Asia/Singapore', region: 'Asia' },
  { id: 'asia/hong_kong', ianaName: 'Asia/Hong_Kong', region: 'Asia' },
  { id: 'asia/shanghai', ianaName: 'Asia/Shanghai', region: 'Asia' },
  { id: 'asia/tokyo', ianaName: 'Asia/Tokyo', region: 'Asia' },
  { id: 'australia/sydney', ianaName: 'Australia/Sydney', region: 'Oceania' },
  { id: 'pacific/auckland', ianaName: 'Pacific/Auckland', region: 'Oceania' },
];

export function findTimezone(id: string): Timezone | undefined {
  return TIMEZONE_LIST.find(tz => tz.id === id);
}

export function findTimezoneByIanaName(ianaName: string): Timezone | undefined {
  return TIMEZONE_LIST.find(tz => tz.ianaName === ianaName);
}

export function detectLocalTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.warn('Failed to detect timezone, falling back to UTC:', error);
    return 'UTC';
  }
}

export function getLocalTimezone(): Timezone {
  const detectedIana = detectLocalTimezone();
  const matched = findTimezoneByIanaName(detectedIana);

  if (matched) {
    return matched;
  }

  console.warn(`Timezone "${detectedIana}" not in supported list, using UTC`);
  return findTimezone('utc')!;
}
