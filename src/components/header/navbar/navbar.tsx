'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Heart, Calendar, Users, Home, Phone, Info, Newspaper } from 'lucide-react'
import { useTranslations } from 'next-intl'
import LanguageSelector from './translation'

const Navbar = () => {
  const t = useTranslations('Navbar')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  const LINKS = [
    { name: t('home'), link: '/', icon: <Home size={18} /> },
    { name: t('about'), link: '/about', icon: <Info size={18} /> },
    { name: t('ministry'), link: '/ministry', icon: <Users size={18} /> },
    // { name: t('events'), link: '/events', icon: <Calendar size={18} /> },
    { name: t('contact'), link: '/contact', icon: <Phone size={18} /> },
    { name: t('events'), link: '/posts', icon: <Newspaper size={18} /> },
    { name: t('calendar'), link: '/calendar', icon: <Calendar size={18} /> },
  ]

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-slate-800 text-gray-200 shadow-md">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Church Logo" width={90} height={45} />
          <span className="text-xl font-bold text-white">{t('churchName')}</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 items-center">
          {LINKS.map((l, index) => (
            <li key={index}>
              <Link
                href={l.link}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                {l.icon}
                {l.name}
              </Link>
            </li>
          ))}

          {/* Language Selector */}
          <li>
            <LanguageSelector />
          </li>

          {/* Donar */}
          <li>
            <Link
              href="/donate"
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center gap-2"
            >
              <Heart size={16} />
              {t('donate')}
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          {LINKS.map((l, index) => (
            <Link
              key={index}
              href={l.link}
              className="flex items-center gap-2 hover:text-white block"
              onClick={() => setIsMenuOpen(false)}
            >
              {l.icon}
              {l.name}
            </Link>
          ))}

          {/* Language Selector Mobile */}
          <div className="pt-2">
            <LanguageSelector />
          </div>

          {/* Donar Mobile */}
          <Link
            href="/donate"
            className="flex items-center gap-2 text-white bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-full mt-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Heart size={18} />
            {t('donate')}
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar