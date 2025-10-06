'use client'

import { useTranslations } from 'next-intl'
import { Users, Heart, BookOpen, Music, UserCircle, Mic, Video, Headphones } from 'lucide-react'

export default function MinistryPage() {
  const t = useTranslations('Ministry')

  const ministries = [
    { icon: <Users size={40} />, key: 'youth' },
    { icon: <Heart size={40} />, key: 'worship' },
    { icon: <BookOpen size={40} />, key: 'bible' },
    { icon: <Music size={40} />, key: 'music' }
  ]

  const leaders = [
    { name: 'Pedro Rivera', role: 'pastor', years: '15', key: 'isaac' },
    { name: 'Yamilette Rivera', role: 'pastora', years: '12', key: 'liliana' }
  ]

  const servers = [
    { name: 'Ronald', role: 'ronald', icon: <UserCircle size={40} /> },
    { name: 'Jannet', role: 'jannet', icon: <Heart size={40} /> },
    { name: 'Cindy', role: 'cindy', icon: <Music size={40} /> },
    { name: 'Domenica', role: 'domenica', icon: <Heart size={40} /> },
    { name: 'Enrique', role: 'enrique', icon: <Users size={40} /> },
    { name: 'Diana Pacheco', role: 'diana', icon: <Heart size={40} /> },
    { name: 'Leticia', role: 'leticia', icon: <Users size={40} /> }
  ]

  const mediaTeam = [
    { name: 'Enrique Pérez', role: 'enriquePerez', icon: <Video size={40} /> },
    { name: 'Myhara Aguilar', role: 'myhara', icon: <Video size={40} /> },
    { name: 'Kevin Mendoza', role: 'kevin', icon: <Headphones size={40} /> }
  ]

  const serviceAreas = [
    { key: 'worship', icon: <Music size={40} /> },
    { key: 'tech', icon: <Video size={40} /> },
    { key: 'hospitality', icon: <Heart size={40} /> },
    { key: 'children', icon: <Users size={40} /> }
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('subtitle')}</p>
      </div>

      {/* Ministerios principales */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {ministries.map((ministry, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-rose-600 mb-4">{ministry.icon}</div>
            <h3 className="text-2xl font-bold mb-3">{t(`${ministry.key}Title`)}</h3>
            <p className="text-gray-600 mb-4">{t(`${ministry.key}Desc`)}</p>
            <p className="text-sm text-gray-500">{t(`${ministry.key}Schedule`)}</p>
          </div>
        ))}
      </div>

      {/* Liderazgo */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-2 text-center">{t('leadershipTitle')}</h2>
        <p className="text-gray-600 text-center mb-8">{t('leadershipSubtitle')}</p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {leaders.map((leader, index) => (
            <div key={index} className="bg-gradient-to-br from-rose-50 to-white p-8 rounded-lg shadow-md text-center">
              <div className="w-24 h-24 bg-rose-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <UserCircle size={60} className="text-white" />
              </div>
              <h3 className="text-sm font-semibold text-rose-600 uppercase mb-2">
                {t(`${leader.key}Role`)}
              </h3>
              <h4 className="text-2xl font-bold mb-2">{leader.name}</h4>
              <p className="text-gray-600 mb-2">{t(`${leader.key}Desc`)}</p>
              <p className="text-sm text-gray-500 font-medium">
                {leader.years} {t('yearsOfMinistry')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Servidores */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-2 text-center">{t('serversTitle')}</h2>
        <p className="text-gray-600 text-center mb-8">{t('serversSubtitle')}</p>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {servers.map((server, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-rose-600 mb-3 flex justify-center">{server.icon}</div>
              <h4 className="font-bold text-lg mb-1">{server.name}</h4>
              <p className="text-sm font-semibold text-rose-600 mb-2">
                {t(`${server.role}Role`)}
              </p>
              <p className="text-sm text-gray-600">{t(`${server.role}Desc`)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grupo de Media */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-2 text-center">{t('mediaTeamTitle')}</h2>
        <p className="text-gray-600 text-center mb-8">{t('mediaTeamSubtitle')}</p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {mediaTeam.map((member, index) => (
            <div key={index} className="bg-slate-900 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-rose-500 mb-3 flex justify-center">{member.icon}</div>
              <h4 className="font-bold text-lg mb-1">{member.name}</h4>
              <p className="text-sm font-semibold text-rose-500 mb-2">
                {t(`${member.role}Role`)}
              </p>
              <p className="text-sm text-gray-300">{t(`${member.role}Desc`)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Áreas de Servicio */}
      <div className="bg-gradient-to-br from-rose-50 to-slate-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-2 text-center">{t('serviceAreasTitle')}</h2>
        <p className="text-gray-600 text-center mb-8">{t('serviceAreasSubtitle')}</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceAreas.map((area, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-rose-600 mb-3 flex justify-center">{area.icon}</div>
              <h4 className="font-bold text-lg mb-2">{t(`serviceArea${area.key.charAt(0).toUpperCase() + area.key.slice(1)}Title`)}</h4>
              <p className="text-sm text-gray-600">{t(`serviceArea${area.key.charAt(0).toUpperCase() + area.key.slice(1)}Desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}