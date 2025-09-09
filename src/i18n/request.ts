import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export const locales = ['ko', 'en'] as const;
export const defaultLocale = 'ko' as const;

export type Locale = typeof locales[number];

export async function getLocaleFromCookies(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get('locale')?.value;
    return locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

export default getRequestConfig(async () => {
  // 쿠키에서 로케일을 가져오거나 기본값 사용
  const locale = await getLocaleFromCookies();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});