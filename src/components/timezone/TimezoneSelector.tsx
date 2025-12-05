'use client';

import { useTranslations } from 'next-intl';
import { useState, useMemo } from 'react';
import { Timezone, TIMEZONE_LIST } from '@/data/timezones';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { getTimezoneOffsetDisplay } from '@/lib/timezone/timezoneUtils';

interface TimezoneSelectorProps {
  value: Timezone;
  onChange: (tz: Timezone) => void;
  label?: string;
  referenceDate?: Date;
  isDark?: boolean;
}

export function TimezoneSelector({
  value,
  onChange,
  label,
  referenceDate = new Date(),
  isDark = false,
}: TimezoneSelectorProps) {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTimezones = useMemo(() => {
    if (!searchQuery.trim()) {
      return TIMEZONE_LIST;
    }

    const query = searchQuery.toLowerCase();
    return TIMEZONE_LIST.filter(tz => {
      const tzName = t(`timezones.${tz.id}`);
      return (
        tz.id.toLowerCase().includes(query) ||
        tz.ianaName.toLowerCase().includes(query) ||
        tzName.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, t]);

  const options = filteredTimezones.map(tz => {
    const tzName = t(`timezones.${tz.id}`);
    const offset = getTimezoneOffsetDisplay(tz.ianaName, referenceDate);
    return {
      value: tz.id,
      label: `${tzName} (${offset})`,
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTz = TIMEZONE_LIST.find(tz => tz.id === e.target.value);
    if (selectedTz) {
      onChange(selectedTz);
      setSearchQuery('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Select
        label={label}
        value={value.id}
        onChange={handleChange}
        options={options}
        isDark={isDark}
      />
      <Input
        type="text"
        placeholder={t('labels.searchTimezone')}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        isDark={isDark}
      />
    </div>
  );
}
