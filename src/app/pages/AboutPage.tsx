'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  const t = useTranslations('About')

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      {/* Encabezado / Hero de la página */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>

    </div>
  )
}
