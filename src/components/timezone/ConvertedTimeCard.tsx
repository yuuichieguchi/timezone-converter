'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ConversionResult } from '@/lib/timezone/timezoneUtils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface ConvertedTimeCardProps {
  result: ConversionResult;
}

export function ConvertedTimeCard({ result }: ConvertedTimeCardProps) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const dateDiffKey =
    result.dateDifference === 'next_day'
      ? 'nextDay'
      : result.dateDifference === 'prev_day'
      ? 'previousDay'
      : 'sameDay';

  const dateDiffLabel = t(`results.${dateDiffKey}`);

  const copyText = `${result.targetTime.formatted} (${result.targetTime.timezone.ianaName} ${result.targetTime.offset})`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {t(`timezones.${result.targetTime.timezone.id}`)}
          </h3>
          <Badge variant="primary">
            {result.targetTime.offset}
          </Badge>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            {t('results.convertedTime')}
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {result.targetTime.formatted}
          </p>
        </div>

        {result.dateDifference !== 'same' && (
          <div className="flex items-center gap-2">
            <Badge variant="warning">
              {dateDiffLabel}
            </Badge>
          </div>
        )}

        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="w-full"
        >
          {copied ? t('buttons.copied') : t('buttons.copy')}
        </Button>
      </div>
    </Card>
  );
}
