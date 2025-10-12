'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  const t = useTranslations('Contact')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Form submitted:', formData)
    alert(t('successMessage'))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">{t('infoTitle')}</h2>
          
          <div className="flex items-start gap-4">
            <MapPin className="text-rose-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold mb-1">{t('addressLabel')}</h3>
              <p className="text-gray-600">14320 Nordhoff St, Panorama City, CA 91402</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-rose-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold mb-1">{t('phoneLabel')}</h3>
              <p className="text-gray-600">(818) 123-4567</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="text-rose-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold mb-1">{t('emailLabel')}</h3>
              <p className="text-gray-600">info@puertasabiertas.org</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="text-rose-600 mt-1" size={24} />
            <div>
              <h3 className="font-semibold mb-1">{t('scheduleLabel')}</h3>
              <p className="text-gray-600">{t('tuesday')}: 7:00 PM</p> 
              <p className='text-gray-600'>{t('wednesday')}: 7:30 PM</p>
              <p className="text-gray-600">{t('sunday')}: 10:00 AM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-100 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">{t('formTitle')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                {t('nameLabel')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                {t('emailLabel')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 font-medium">
                {t('phoneLabel')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                {t('messageLabel')} *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold"
            >
              {t('submitButton')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}