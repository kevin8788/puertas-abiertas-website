'use client'

import { useTranslations } from 'next-intl'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface Event {
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
  const [error, setError] = useState<string | null>(null)
 

  useEffect(() => { 
    fetchEvents();
  }, [])

  useEffect(() => { 
  }, [events])

  const fetchEvents = async () => { 
    try {
      const baseUrl = window.location.origin; 
      
      const url = `${baseUrl}/api/post` 
       
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
 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
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
    <div className="max-w-6xl mx-auto px-6 py-12 gap-2">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Posts</h2>
        <p className="text-lg text-gray-600">Quieres recibir nuestros posts?, subscribete</p>
        <input type="email" placeholder='youremail@email.com' className="w-md px-4 py-2 border rounded-lg"/>
         <button
                type="submit"
                className="w-2xs bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold ml-4"
              >
                Suscribirse
              </button>
      </div>
      
      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay Posts disponibles</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
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
                
                 
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}