import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export const locales = ['en', 'es'];
export const defaultLocale = 'es'; 

export default getRequestConfig(async () => { 
  const locale = defaultLocale;

  if (!locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`../app/messages/${locale}.json`)).default
  };
});