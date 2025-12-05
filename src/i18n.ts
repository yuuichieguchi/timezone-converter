import { getRequestConfig } from 'next-intl/server';
import enJson from './messages/en.json';
import jaJson from './messages/ja.json';

export const locales = ['en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const messagesByLocale: Record<Locale, Record<string, any>> = {
  en: enJson as Record<string, any>,
  ja: jaJson as Record<string, any>,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const validLocale: Locale =
    locale && locales.includes(locale as Locale)
      ? (locale as Locale)
      : defaultLocale;

  return {
    locale: validLocale,
    messages: messagesByLocale[validLocale],
  };
});
