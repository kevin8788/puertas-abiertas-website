'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const HomePage = () => {
  return (
    <div className="w-full bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: "url('/hero.webp')" }}>
        <div className="absolute pt-50 inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold">Bienvenidos a Iglesia Puertas Abiertas</h1>
          <p className="text-xl md:text-2xl mb-6">Una comunidad con propósito eterno</p>
          <Link href="/about" className="px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-full text-white text-lg font-semibold">
            Conócenos
          </Link>
        </div>
      </section>

      {/* Service Times + Map */}
      <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Info */}
        <div className="bg-slate-100 p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">Horarios de Servicio</h2>
          <p><strong>Jueves:</strong> 6:30 PM</p>
          <p><strong>Domingo:</strong> 9:00 AM, 10:30 AM, 12:00 PM</p>

          <h2 className="text-2xl font-bold mt-6 text-slate-800">Ubicación</h2>
          <p>14320 Nordhoff St, Panorama City, CA 91402</p>

          <Link href="/contact" className="inline-block mt-4 px-5 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-full font-medium">
            Planifica tu visita
          </Link>
        </div>

        {/* Google Maps */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3298.5305104303065!2d-118.44720492388798!3d34.23500430805728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c290d9762fe88d%3A0xbef6c877f37d79e!2s14320%20Nordhoff%20St%2C%20Panorama%20City%2C%20CA%2091402!5e0!3m2!1sen!2sus!4v1759287272197!5m2!1sen!2sus"
            width="100%"
            height="400"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-rose-600 text-white py-12 text-center">
        <h3 className="text-3xl font-semibold mb-2">¿Primera vez aquí?</h3>
        <p className="mb-4">Nos encantaría conocerte y ayudarte a dar tu siguiente paso.</p>
        <Link href="/contact" className="px-6 py-3 bg-white text-rose-600 rounded-full font-semibold hover:bg-gray-100">
          Planifica tu visita
        </Link>
      </section>
    </div>
  )
}

export default HomePage
