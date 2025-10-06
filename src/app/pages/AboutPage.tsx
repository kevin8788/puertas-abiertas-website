'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  const t = useTranslations('About')

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      {/* Hero Image */}
      <div className="w-full h-64 relative overflow-hidden rounded-lg shadow-lg bg-gray-200"> 
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <img src="/imagebk.webp" alt="" />
        </div>
      </div>

      {/* Story */}
      <div className="space-y-6 text-gray-700">
        <p>{t('para1')}</p>
        <p>{t('para2')}</p>
      </div>

      {/* Mission / Vision / Values */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-100 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-xl mb-2">{t('missionTitle')}</h3>
          <p>{t('missionDesc')}</p>
        </div>
        <div className="bg-slate-100 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-xl mb-2">{t('visionTitle')}</h3>
          <p>{t('visionDesc')}</p>
        </div>
        <div className="bg-slate-100 p-6 rounded-lg shadow">
          <h3 className="font-semibold text-xl mb-2">{t('valuesTitle')}</h3>
          <p>{t('valuesDesc')}</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          href="/donate"
          className="px-6 py-3 bg-rose-600 text-white rounded-full hover:bg-rose-700"
        >
          {t('donateButton')}
        </Link>
      </div>
    </div>
  )
}