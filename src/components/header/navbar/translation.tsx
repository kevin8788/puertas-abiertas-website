'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const LanguageSelector = () => {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState('es');

  useEffect(() => { 
    const cookies = document.cookie.split('; ');
    const localeCookie = cookies.find(row => row.startsWith('NEXT_LOCALE='));
    if (localeCookie) {
      setCurrentLocale(localeCookie.split('=')[1]);
    }
  }, []);

  const changeLanguage = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
    console.log('locale: ', locale, {currentLocale})
    setCurrentLocale(locale);
    router.refresh();
  };

  return (
    <button
      onClick={() => changeLanguage(currentLocale === 'es' ? 'en' : 'es')}
      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md font-medium transition-colors"
    >
      {currentLocale === 'es' ? 'EN' : 'ES'}
    </button>
  );
}

export default LanguageSelector;