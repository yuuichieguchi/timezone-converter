'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { TimezoneSelector } from '@/components/timezone/TimezoneSelector';
import { Timezone, getLocalTimezone, findTimezone } from '@/data/timezones';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { convertTime } from '@/lib/timezone/timezoneUtils';

function formatToDateTimeLocal(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function TimezonePage() {
  const t = useTranslations();
  const locale = useLocale();

  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sourceTimezone, setSourceTimezone, sourceHydrated] = useLocalStorage<Timezone>(
    'tz_source',
    getLocalTimezone()
  );
  const [targetTimezone, setTargetTimezone, targetHydrated] = useLocalStorage<Timezone>(
    'tz_target',
    findTimezone('asia/tokyo') || getLocalTimezone()
  );

  const [sourceTimezoneObj, setSourceTimezoneObj] = useState<Timezone>(sourceTimezone);
  const [targetTimezoneObj, setTargetTimezoneObj] = useState<Timezone>(targetTimezone);
  const [dateTimeString, setDateTimeString] = useState(formatToDateTimeLocal(new Date()));
  const [error, setError] = useState<string>('');
  const [copyToast, setCopyToast] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTheme = () => {
      const theme = localStorage.getItem('theme');
      const isDarkMode = theme === 'dark';
      setIsDark(isDarkMode);

      if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    };

    updateTheme();
    window.addEventListener('theme-changed', updateTheme);
    return () => window.removeEventListener('theme-changed', updateTheme);
  }, []);

  useEffect(() => {
    if (sourceHydrated && targetHydrated) {
      if (typeof sourceTimezone === 'object' && sourceTimezone.ianaName) {
        setSourceTimezoneObj(sourceTimezone);
      } else {
        const tz = findTimezone(sourceTimezone as unknown as string);
        if (tz) setSourceTimezoneObj(tz);
      }

      if (typeof targetTimezone === 'object' && targetTimezone.ianaName) {
        setTargetTimezoneObj(targetTimezone);
      } else {
        const tz = findTimezone(targetTimezone as unknown as string);
        if (tz) setTargetTimezoneObj(tz);
      }
    }
  }, [sourceHydrated, targetHydrated, sourceTimezone, targetTimezone]);

  const conversionResult = useMemo(() => {
    try {
      if (!dateTimeString) {
        setError(t('errors.invalidDateTime'));
        return null;
      }

      setError('');
      return convertTime(dateTimeString, sourceTimezoneObj, targetTimezoneObj, locale);
    } catch (err) {
      setError(t('errors.invalidDateTime'));
      return null;
    }
  }, [dateTimeString, sourceTimezoneObj, targetTimezoneObj, locale, t]);

  const handleNow = () => {
    setDateTimeString(formatToDateTimeLocal(new Date()));
  };

  const handleCopy = async () => {
    if (conversionResult) {
      try {
        await navigator.clipboard.writeText(conversionResult.time);
        setCopyToast(true);
        setTimeout(() => setCopyToast(false), 2200);
      } catch {
        setError('Failed to copy to clipboard');
      }
    }
  };

  const handleClearAll = () => {
    setDateTimeString(formatToDateTimeLocal(new Date()));
    setError('');
  };

  if (!sourceHydrated || !targetHydrated || !mounted) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: isDark ? '#cbd5e1' : '#666' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />

      {copyToast && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#10b981',
          color: '#ffffff',
          padding: '1rem 1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
          fontSize: '0.875rem',
          fontWeight: '500',
          zIndex: 50,
          animation: 'fadeInOut 2.2s ease-in-out'
        }}>
          {t('buttons.copied')}
        </div>
      )}

      <main style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: 'clamp(2rem, 8vw, 4rem) clamp(1rem, 4vw, 2rem)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {/* Error Display */}
          {error && (
            <div style={{
              backgroundColor: isDark ? '#7f1d1d' : '#fee2e2',
              border: `1px solid ${isDark ? '#b91c1c' : '#fecaca'}`,
              borderRadius: '0.75rem',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <p style={{ color: isDark ? '#fca5a5' : '#dc2626', margin: 0 }}>{error}</p>
              <button
                onClick={() => setError('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isDark ? '#fca5a5' : '#dc2626',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                ×
              </button>
            </div>
          )}

          {/* Main Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Source Timezone Section */}
            <div style={{
              backgroundColor: isDark ? '#1a202c' : '#ffffff',
              borderRadius: '0.75rem',
              padding: 'clamp(1rem, 4vw, 2rem)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
              border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              transition: 'all 0.3s ease'
            }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.08)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📍</span>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: isDark ? '#ffffff' : '#1a202c',
                  margin: 0
                }}>
                  {t('labels.sourceTimezone')}
                </h2>
              </div>

              <TimezoneSelector
                value={sourceTimezoneObj}
                onChange={(tz) => {
                  setSourceTimezoneObj(tz);
                  setSourceTimezone(tz);
                }}
                label={t('labels.sourceTimezone')}
                referenceDate={new Date(dateTimeString + ':00')}
                isDark={isDark}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: isDark ? '#cbd5e1' : '#475569',
                  marginBottom: '0.5rem'
                }}>
                  {t('labels.dateTime')}
                </label>
                <input
                  type="datetime-local"
                  value={dateTimeString}
                  onChange={(e) => setDateTimeString(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
                    backgroundColor: isDark ? '#0f1419' : '#ffffff',
                    color: isDark ? '#ffffff' : '#1a202c',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = isDark ? '#2d3748' : '#e2e8f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button
                onClick={handleNow}
                style={{
                  width: '100%',
                  fontWeight: '500',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: `2px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
                  backgroundColor: isDark ? '#0f1419' : '#ffffff',
                  color: isDark ? '#cbd5e1' : '#475569',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.color = '#667eea';
                  e.currentTarget.style.backgroundColor = isDark ? '#1a202c' : '#f8f9fa';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = isDark ? '#2d3748' : '#e2e8f0';
                  e.currentTarget.style.color = isDark ? '#cbd5e1' : '#475569';
                  e.currentTarget.style.backgroundColor = isDark ? '#0f1419' : '#ffffff';
                }}
              >
                {t('labels.now')}
              </button>
            </div>

            {/* Target Timezone & Output Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Target Timezone */}
              <div style={{
                backgroundColor: isDark ? '#1a202c' : '#ffffff',
                borderRadius: '0.75rem',
                padding: 'clamp(1rem, 4vw, 2rem)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
                border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                transition: 'all 0.3s ease'
              }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.08)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🌍</span>
                  <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: isDark ? '#ffffff' : '#1a202c',
                    margin: 0
                  }}>
                    {t('labels.targetTimezone')}
                  </h2>
                </div>

                <TimezoneSelector
                  value={targetTimezoneObj}
                  onChange={(tz) => {
                    setTargetTimezoneObj(tz);
                    setTargetTimezone(tz);
                  }}
                  label={t('labels.targetTimezone')}
                  referenceDate={new Date(dateTimeString + ':00')}
                  isDark={isDark}
                />
              </div>

              {/* Result Display */}
              {conversionResult && !error && (
                <div style={{
                  backgroundColor: isDark ? '#1a202c' : '#ffffff',
                  borderRadius: '0.75rem',
                  padding: 'clamp(1rem, 4vw, 2rem)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
                  border: `1px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  transition: 'all 0.3s ease'
                }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.08)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>✅</span>
                    <h2 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: isDark ? '#ffffff' : '#1a202c',
                      margin: 0
                    }}>
                      {targetTimezoneObj.ianaName}
                    </h2>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: 'fit-content'
                    }}>
                      <span style={{
                        backgroundColor: '#667eea',
                        color: '#ffffff',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {conversionResult.offset}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '1.875rem',
                      fontWeight: '700',
                      color: isDark ? '#ffffff' : '#1a202c',
                      margin: 0,
                      wordBreak: 'break-word'
                    }}>
                      {conversionResult.time}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      color: isDark ? '#cbd5e1' : '#666',
                      margin: 0
                    }}>
                      {t('results.convertedTime')} {conversionResult.dayDifference === 'nextDay' && `(${t('results.nextDay')})` || conversionResult.dayDifference === 'previousDay' && `(${t('results.previousDay')})`}
                    </p>
                  </div>

                  <button
                    onClick={handleCopy}
                    style={{
                      width: '100%',
                      fontWeight: '600',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      backgroundColor: '#667eea',
                      color: '#ffffff',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#764ba2';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#667eea';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {t('buttons.copy')}
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <button
                onClick={handleClearAll}
                style={{
                  width: '100%',
                  fontWeight: '500',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: `2px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
                  backgroundColor: isDark ? '#0f1419' : '#ffffff',
                  color: isDark ? '#cbd5e1' : '#475569',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.color = '#667eea';
                  e.currentTarget.style.backgroundColor = isDark ? '#1a202c' : '#f8f9fa';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = isDark ? '#2d3748' : '#e2e8f0';
                  e.currentTarget.style.color = isDark ? '#cbd5e1' : '#475569';
                  e.currentTarget.style.backgroundColor = isDark ? '#0f1419' : '#ffffff';
                }}
              >
                {t('labels.clearAll')}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
