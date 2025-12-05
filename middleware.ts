import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/', '/(en|ja)/:path*', '/((?!_next|_vercel|.*\\..*).)*'],
};
