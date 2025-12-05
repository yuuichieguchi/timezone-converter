'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  isDark?: boolean;
}

export function LanguageSwitcher({ isDark = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(en|ja)/, '') || '/';

  const switchLocale = (newLocale: string) => {
    return `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Link href={switchLocale('en')}>
        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.5rem',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          padding: '0.5rem 0.75rem',
          fontSize: '0.875rem',
          border: locale === 'en' ? 'none' : `2px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
          backgroundColor: locale === 'en' ? '#667eea' : isDark ? '#0f1419' : '#ffffff',
          color: locale === 'en' ? '#ffffff' : isDark ? '#cbd5e1' : '#475569',
          cursor: 'pointer'
        }}
          onMouseOver={(e) => {
            if (locale === 'en') {
              e.currentTarget.style.backgroundColor = '#764ba2';
            } else {
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.color = '#667eea';
              e.currentTarget.style.backgroundColor = isDark ? '#1a202c' : '#f8f9fa';
            }
          }}
          onMouseOut={(e) => {
            if (locale === 'en') {
              e.currentTarget.style.backgroundColor = '#667eea';
            } else {
              e.currentTarget.style.borderColor = isDark ? '#2d3748' : '#e2e8f0';
              e.currentTarget.style.color = isDark ? '#cbd5e1' : '#475569';
              e.currentTarget.style.backgroundColor = isDark ? '#0f1419' : '#ffffff';
            }
          }}
        >
          EN
        </button>
      </Link>
      <Link href={switchLocale('ja')}>
        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0.5rem',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          padding: '0.5rem 0.75rem',
          fontSize: '0.875rem',
          border: locale === 'ja' ? 'none' : `2px solid ${isDark ? '#2d3748' : '#e2e8f0'}`,
          backgroundColor: locale === 'ja' ? '#667eea' : isDark ? '#0f1419' : '#ffffff',
          color: locale === 'ja' ? '#ffffff' : isDark ? '#cbd5e1' : '#475569',
          cursor: 'pointer'
        }}
          onMouseOver={(e) => {
            if (locale === 'ja') {
              e.currentTarget.style.backgroundColor = '#764ba2';
            } else {
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.color = '#667eea';
              e.currentTarget.style.backgroundColor = isDark ? '#1a202c' : '#f8f9fa';
            }
          }}
          onMouseOut={(e) => {
            if (locale === 'ja') {
              e.currentTarget.style.backgroundColor = '#667eea';
            } else {
              e.currentTarget.style.borderColor = isDark ? '#2d3748' : '#e2e8f0';
              e.currentTarget.style.color = isDark ? '#cbd5e1' : '#475569';
              e.currentTarget.style.backgroundColor = isDark ? '#0f1419' : '#ffffff';
            }
          }}
        >
          JA
        </button>
      </Link>
    </div>
  );
}
