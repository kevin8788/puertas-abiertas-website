import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const locale = (await cookieStore).get('NEXT_LOCALE')?.value || 'es';

  return {
    locale,
    messages: (await import(`../app/messages/${locale}.json`)).default
  };
});