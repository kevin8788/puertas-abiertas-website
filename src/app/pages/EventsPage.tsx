'use client'

import { useTranslations } from 'next-intl'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image?: string
}

export default function EventsPage() {
  const t = useTranslations('Events')
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">{t('loading')}</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{t('noEvents')}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              {event.image && (
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}