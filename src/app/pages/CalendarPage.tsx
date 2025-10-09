'use client'

import { useTranslations } from 'next-intl'
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Event } from './EventsPage';
import moment from 'moment-timezone'

export default function CalendarPage() {
  const t = useTranslations('Calendar')
  const [events, setEvents] = useState<Event[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { 
    fetchEvents();
  }, [])

  const fetchEvents = async () => { 
    try {
      const baseUrl = window.location.origin; 
      const url = `${baseUrl}/api/test` 
      const response = await fetch(url); 
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json();  
      setEvents(data) 
    } catch (error) { 
      setError(error instanceof Error ? error.message : 'Error desconocido')
    } finally { 
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = moment.tz(dateString, 'America/Los_Angeles')
    return {
      day: date.format('DD'),
      month: date.format('MMM').toUpperCase(),
      year: date.format('YYYY')
    }
  }

  const formatTime = (timeString: string, dateString: string) => {
    // Combinar fecha y hora para procesarla correctamente
    const dateTime = moment.tz(`${dateString} ${timeString}`, 'America/Los_Angeles')
    return dateTime.format('HH:mm')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">{t('loading')}</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="space-y-6">
        {events.map((event) => {
          const dateInfo = formatDate(event.date)
          const formattedTime = formatTime(event.time, event.date)
          
          return (
            <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
              {/* Imagen del evento */}
              {event.image && (
                <div className="h-56 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Contenido del evento */}
              <div className="p-6">
                <div className="flex gap-6">
                  {/* Fecha destacada */}
                  <div className="bg-rose-600 text-white px-4 py-3 rounded-lg text-center self-start flex-shrink-0">
                    <div className="text-3xl font-bold leading-none">{dateInfo.day}</div>
                    <div className="text-xs mt-1">{dateInfo.month}</div>
                    <div className="text-xs">{dateInfo.year}</div>
                  </div>
                  
                  {/* Info del evento */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{formattedTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{t('noEvents')}</p>
        </div>
      )}
    </div>
  )
}