'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageSwitcherProps {
  isDark?: boolean;
}

export function LanguageSwitcher({ isDark = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) {
      return;
    }

    // 現在のパスからロケール部分を削除
    const pathWithoutLocale = pathname.replace(/^\/(en|ja)/, '') || '/';

    // 新しいパスを構築
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

    router.push(newPath);
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button
        onClick={() => switchLocale('en')}
        disabled={locale === 'en'}
        style={{
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
          cursor: locale === 'en' ? 'default' : 'pointer',
          opacity: locale === 'en' ? 1 : 1
        }}
        onMouseOver={(e) => {
          if (locale !== 'en') {
            e.currentTarget.style.borderColor = '#667eea';
            e.currentTarget.style.color = '#667eea';
            e.currentTarget.style.backgroundColor = isDark ? '#1a202c' : '#f8f9fa';
          } else {
            e.currentTarget.style.backgroundColor = '#764ba2';
          }
        }}
        onMouseOut={(e) => {
          if (locale !== 'en') {
            e.currentTarget.style.borderColor = isDark ? '#2d3748' : '#e2e8f0';
            e.currentTarget.style.color = isDark ? '#cbd5e1' : '#475569';
            e.currentTarget.style.backgroundColor = isDark ? '#0f1419' : '#ffffff';
          } else {
            e.currentTarget.style.backgroundColor = '#667eea';
          }
        }}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('ja')}
        disabled={locale === 'ja'}
        style={{
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
          cursor: locale === 'ja' ? 'default' : 'pointer',
          opacity: locale === 'ja' ? 1 : 1
        }}
        onMouseOver={(e) => {
          if (locale !== 'ja') {
            e.currentTarget.style.borderColor = '#667eea';
            e.currentTarget.style.color = '#667eea';
            e.currentTarget.style.backgroundColor = isDark ? '#1a202c' : '#f8f9fa';
          } else {
            e.currentTarget.style.backgroundColor = '#764ba2';
          }
        }}
        onMouseOut={(e) => {
          if (locale !== 'ja') {
            e.currentTarget.style.borderColor = isDark ? '#2d3748' : '#e2e8f0';
            e.currentTarget.style.color = isDark ? '#cbd5e1' : '#475569';
            e.currentTarget.style.backgroundColor = isDark ? '#0f1419' : '#ffffff';
          } else {
            e.currentTarget.style.backgroundColor = '#667eea';
          }
        }}
      >
        JA
      </button>
    </div>
  );
}
