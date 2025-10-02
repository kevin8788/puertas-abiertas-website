'use client'

import Link from 'next/link'
import { Facebook, Youtube, MapPin, Clock, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative md:w-full bg-slate-800 pt-8 pb-6 m-0 text-gray-200">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Iglesia info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Iglesia Puertas Abiertas</h3>
          <p className="flex items-center gap-2">
            <MapPin size={16} /> 14320 Nordhoff St, Panorama City, CA 91402
          </p>
          <p className="flex items-center gap-2 mt-2">
            <Clock size={16} /> Jueves 6:30 PM · Domingos 9 AM, 10:30 AM, 12 PM
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-2">
          <Link href="/about" className="hover:text-white transition">Sobre Nosotros</Link>
          <Link href="/contact" className="hover:text-white transition">Contáctanos</Link>
          <Link href="/donate" className="hover:text-white transition flex items-center gap-1">
            <Heart size={16} /> Donar
          </Link>
        </div>

        {/* Redes sociales */}
        <div>
          <p className="mb-3 text-sm">Síguenos en nuestras redes</p>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Facebook />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Youtube />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {currentYear} Iglesia Puertas Abiertas. Todos los derechos reservados.
      </div>
    </footer>
  )
}

export default Footer
