'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import CustomCarousel from '@/components/carousel/carouselt'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

export default function Home() {
  const t = useTranslations('Home')
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const streamUrl = "https://securestreams4.autopo.st:1797/stream"

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlay = () => {
      setIsLoading(false)
      setError(null)
    }

    const handleError = () => {
      setIsLoading(false)
      setIsPlaying(false)
      setError('Error al cargar la transmisión')
    }

    const handleWaiting = () => {
      setIsLoading(true)
    }

    const handlePlaying = () => {
      setIsLoading(false)
      setIsPlaying(true)
    }

    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('waiting', handleWaiting)
    audio.addEventListener('playing', handlePlaying)

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('waiting', handleWaiting)
      audio.removeEventListener('playing', handlePlaying)
    }
  }, [])

  const togglePlayPause = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        setIsLoading(true)
        setError(null)
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (err) {
      console.error('Error al reproducir:', err)
      setError('No se pudo reproducir. Intenta de nuevo.')
      setIsLoading(false)
      setIsPlaying(false)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setVolume(newVolume)
      if (newVolume === 0) {
        setIsMuted(true)
      } else if (isMuted) {
        setIsMuted(false)
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

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
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-6 z-10">
          <h2 className="text-4xl md:text-6xl font-bold">{t('heroTitle')}</h2>
          <p className="text-xl md:text-2xl mb-6">{t('heroSubtitle')}</p>
          <Link
            href="/about"
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-full text-white text-lg font-semibold transition"
          >
            {t('knowUs')}
          </Link>
        </div>
      </section>

      {/* Radio Section - Mejorado */}
      <section className="py-10 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Radio Mi Fortaleza
              </h2>
              <p className="text-gray-600">
                Transmisiones en vivo los viernes por la tarde
              </p>
            </div>

            {/* Reproductor de Audio */}
            <div className="bg-gradient-to-br from-rose-600 to-pink-600 rounded-xl p-6 shadow-lg">
              <audio
                ref={audioRef}
                src={streamUrl}
                preload="none"
              />

              {/* Controles */}
              <div className="flex flex-col items-center gap-6">
                {/* Botón Play/Pause */}
                <button
                  onClick={togglePlayPause}
                  disabled={isLoading}
                  className="w-20 h-20 rounded-full bg-white text-rose-600 flex items-center justify-center hover:scale-110 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
                  ) : isPlaying ? (
                    <Pause size={32} fill="currentColor" />
                  ) : (
                    <Play size={32} fill="currentColor" className="ml-1" />
                  )}
                </button>

                {/* Estado */}
                <div className="text-center">
                  {error ? (
                    <p className="text-white text-sm bg-red-500/30 px-4 py-2 rounded-lg">
                      {error}
                    </p>
                  ) : isPlaying ? (
                    <p className="text-white font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      En vivo ahora
                    </p>
                  ) : (
                    <p className="text-white/80 text-sm">
                      Presiona play para escuchar
                    </p>
                  )}
                </div>

                {/* Control de Volumen */}
                <div className="w-full flex items-center gap-4">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:scale-110 transition-transform"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={24} />
                    ) : (
                      <Volume2 size={24} />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
                  />
                </div>
              </div>
            </div>

          
          </div>
        </div>
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
          <Link
            href="/contact"
            className="inline-block mt-4 px-5 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-full font-medium transition"
          >
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
        <Link
          href="/contact"
          className="px-6 py-3 bg-white text-rose-600 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          {t('planVisit')}
        </Link>
      </section>

      {/* Carousel */}
      <div className="py-12 px-6 max-w-6xl mx-auto">
        <CustomCarousel />
      </div>
    </div>
  )
}