'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import CustomCarousel from '@/components/carousel/carouselt'

export default function Home() {
  const t = useTranslations('Home');
  const audioRef : any = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const streamUrl = "https://securestreams4.autopo.st:1797//;stream.mp3";
   const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dbg69ivju/video/upload/v1760229633/WhatsApp_Video_2025-10-11_at_5.34.04_PM_t8j0vf.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* 🔳 Capa oscura encima del video + contenido */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6 z-10">
          <h2 className="text-4xl md:text-6xl font-bold">{t('heroTitle')}</h2>
          <p className="text-xl md:text-2xl mb-6">{t('heroSubtitle')}</p>
          <Link href="/about" className="px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-full text-white text-lg font-semibold">
            {t('knowUs')}
          </Link>
        </div>
      </section>

      <section className="py-10 bg-gray-50 text-center max-w-2xl justify-center mx-auto">
        <h2 className='text-2xl font-semibold mb-4'>Escuchanos en Radio Mi Fortaleza</h2>
        <iframe
          title="Radio Mi Fortaleza"
          src={"https://securestreams4.autopo.st:1797//;stream.mp3"}
          width="100%"
          height="200"
          frameBorder="0"
          allowFullScreen
        ></iframe>

        {/* <audio ref={audioRef} src={streamUrl} >
          <source src={streamUrl} type='audio/mpeg'/>
          Your browser does not support the audio element.
        </audio> */}
        <p>Transmisiones en vivo los viernes por la tarde</p>
      {/* <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause Radio' : 'Play Radio'} */}
      {/* </button> */}

      </section>
 

      {/* Service Times + Map */}
      <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="bg-slate-100 p-6 rounded-xl shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">{t('scheduleTitle')}</h2>
          <p><strong>{t('tuesday')}:</strong> 7:00 PM</p>
          <p><strong>{t('wednesday')}:</strong> 7:30 PM</p>
          <p><strong>{t('sunday')}:</strong> 10:00 AM</p>

          <h2 className="text-2xl font-bold mt-6 text-slate-800">{t('locationTitle')}</h2>
          <p>14320 Nordhoff St, Panorama City, CA 91402</p>

          <Link href="/contact" className="inline-block mt-4 px-5 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-full font-medium">
            {t('planVisit')}
          </Link>
        </div>

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
        <h3 className="text-3xl font-semibold mb-2">{t('firstTimeTitle')}</h3>
        <p className="mb-4">{t('firstTimeDesc')}</p>
        <Link href="/contact" className="px-6 py-3 bg-white text-rose-600 rounded-full font-semibold hover:bg-gray-100">
          {t('planVisit')}
        </Link>
      </section>

      {/* center carousel section */}
      <div className="py-12 px-6 max-w-6xl mx-auto">
        <CustomCarousel />
      </div>
    </div>
  )
}
