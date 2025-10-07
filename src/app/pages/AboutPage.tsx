'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Target, Heart, Users, Send, BookOpen, Shield } from 'lucide-react'

export default function AboutPage() {
  const t = useTranslations('About')

  const values = [
    { key: 'evangelism', icon: <Users size={32} /> },
    { key: 'teamMinistry', icon: <Users size={32} /> },
    { key: 'relevance', icon: <Target size={32} /> },
    { key: 'growth', icon: <BookOpen size={32} /> },
    { key: 'service', icon: <Heart size={32} /> },
    { key: 'excellence', icon: <Shield size={32} /> },
    { key: 'relationships', icon: <Heart size={32} /> },
    { key: 'leadership', icon: <Users size={32} /> },
    { key: 'integrity', icon: <Shield size={32} /> },
    { key: 'christCentered', icon: <Heart size={32} /> }
  ]

  const methods = ['connect', 'form', 'equip', 'send']

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-br from-rose-600 to-rose-800 text-white">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl max-w-2xl">{t('motto')}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Vision */}
        <section>
          <div className="text-center mb-8">
            <Target className="text-rose-600 mx-auto mb-4" size={48} />
            <h2 className="text-3xl font-bold mb-4">{t('visionTitle')}</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {t('visionDesc')}
          </p>
        </section>

        {/* Culture */}
        <section className="bg-slate-50 p-8 rounded-lg">
          <div className="text-center mb-6">
            <Heart className="text-rose-600 mx-auto mb-4" size={48} />
            <h2 className="text-3xl font-bold mb-4">{t('cultureTitle')}</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {t('cultureDesc')}
          </p>
        </section>

        {/* Mission */}
        <section>
          <div className="text-center mb-8">
            <Send className="text-rose-600 mx-auto mb-4" size={48} />
            <h2 className="text-3xl font-bold mb-4">{t('missionTitle')}</h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            {t('missionDesc')}
          </p>
        </section>

        {/* Method */}
        <section className="bg-gradient-to-br from-rose-50 to-slate-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('methodTitle')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-bold text-xl mb-3">{t(`method${method.charAt(0).toUpperCase() + method.slice(1)}Title`)}</h3>
                <p className="text-gray-600 text-sm">{t(`method${method.charAt(0).toUpperCase() + method.slice(1)}Desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Biblical Foundation */}
        <section className="bg-slate-800 text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">{t('bibleFoundationTitle')}</h2>
          <blockquote className="text-lg italic text-center max-w-3xl mx-auto mb-4">
            "{t('bibleVerse')}"
          </blockquote>
          <p className="text-center text-gray-300">{t('bibleReference')}</p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-3xl font-bold mb-4 text-center">{t('valuesTitle')}</h2>
          <p className="text-center text-gray-600 mb-8">{t('valuesSubtitle')}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white border-2 border-gray-100 p-6 rounded-lg hover:border-rose-200 hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="text-rose-600 flex-shrink-0">{value.icon}</div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{t(`value${value.key.charAt(0).toUpperCase() + value.key.slice(1)}Title`)}</h3>
                    <p className="text-gray-600 text-sm mb-2">{t(`value${value.key.charAt(0).toUpperCase() + value.key.slice(1)}Desc`)}</p>
                    <p className="text-xs text-gray-500 italic">{t(`value${value.key.charAt(0).toUpperCase() + value.key.slice(1)}Scripture`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-rose-600 text-white p-12 rounded-lg">
          <h3 className="text-3xl font-bold mb-4">{t('ctaTitle')}</h3>
          <p className="text-lg mb-6">{t('ctaDesc')}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-rose-600 rounded-full hover:bg-gray-100 font-semibold"
            >
              {t('ctaContact')}
            </Link>
            <Link
              href="/ministry"
              className="px-6 py-3 bg-rose-700 text-white rounded-full hover:bg-rose-800 font-semibold border-2 border-white"
            >
              {t('ctaMinistry')}
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}