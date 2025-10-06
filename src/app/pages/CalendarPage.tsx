'use client'

import { useTranslations } from 'next-intl'
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react'

export default function CalendarPage() {
  const t = useTranslations('Calendar')

  const events = [
    { key: 'event1' },
    { key: 'event2' },
    { key: 'event3' }
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="bg-rose-600 text-white p-6 rounded-lg text-center min-w-[120px]">
                <div className="text-3xl font-bold">{t(`${event.key}Day`)}</div>
                <div className="text-sm">{t(`${event.key}Month`)}</div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{t(`${event.key}Title`)}</h3>
                <p className="text-gray-600 mb-4">{t(`${event.key}Desc`)}</p>
                
                <div className="flex flex-col gap-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{t(`${event.key}Time`)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{t(`${event.key}Location`)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}