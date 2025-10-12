'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Youtube, MapPin, Clock, Heart, Lock } from 'lucide-react'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations('Footer')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative md:w-full bg-slate-800 pt-8 pb-6 m-0 text-gray-200">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Logo y nombre */}
        <div>
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Image src="/logo.png" alt="Church Logo" width={60} height={60} />
            <span className="text-lg font-bold text-white">{t('churchName')}</span>
          </Link>
          <p className="text-sm text-gray-400">{t('tagline')}</p>
        </div>

        {/* Información de contacto */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">{t('contactTitle')}</h3>
          <p className="flex items-center gap-2 text-sm mb-2">
            <MapPin size={16} /> {t('address')}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Clock size={16} /> {t('schedule')}
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">{t('linksTitle')}</h3>
          <div className="flex flex-col space-y-2">
            <Link href="/about" className="hover:text-white transition text-sm">
              {t('aboutUs')}
            </Link>
            <Link href="/contact" className="hover:text-white transition text-sm">
              {t('contact')}
            </Link>
            <Link href="/donate" className="hover:text-white transition flex items-center gap-1 text-sm">
              <Heart size={16} /> {t('donate')}
            </Link>
            <Link href="/admin/login" className="hover:text-white transition flex items-center gap-1 text-sm text-gray-400">
              <Lock size={16} /> Admin
            </Link>
          </div>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">{t('socialTitle')}</h3>
          <p className="mb-3 text-sm">{t('followUs')}</p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/people/Iglesia-Cristiana-Puertas-Abiertas/61561360096792/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Facebook />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Youtube />
            </a>
            <a href="https://www.facebook.com/people/Iglesia-Cristiana-Puertas-Abiertas/61561360096792/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Facebook />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Youtube />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        <p>© {currentYear} {t('churchName')}. {t('rights')}</p>
        <span>{t('poweredBy')} <a href="https://www.logacode.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">LOGACODE</a></span>
      </div>
    </footer>
  )
}

export default Footer