'use client'

import { useTranslations } from 'next-intl'
import { Heart, DollarSign, CreditCard, Building2 } from 'lucide-react'
import { useState } from 'react'

export default function DonatePage() {
  const t = useTranslations('Donate')
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')

  const suggestedAmounts = [25, 50, 100, 250, 500]

  const handleDonate = () => {
    const donationAmount = amount === 'custom' ? customAmount : amount
    
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert(t('amountError'))
      return
    }

    // Aquí integrarías con Stripe, PayPal, etc.
    alert(`${t('thankYou')} $${donationAmount}`)
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Heart className="text-rose-600" size={64} />
        </div>
        <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Donation Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">{t('makeADonation')}</h2>

          {/* Frequency Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setFrequency('once')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                frequency === 'once'
                  ? 'bg-rose-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('oneTime')}
            </button>
            <button
              onClick={() => setFrequency('monthly')}
              className={`flex-1 py-3 rounded-lg font-semibold transition ${
                frequency === 'monthly'
                  ? 'bg-rose-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('monthly')}
            </button>
          </div>

          {/* Amount Selection */}
          <div className="mb-6">
            <label className="block mb-3 font-medium">{t('selectAmount')}</label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {suggestedAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setAmount(amt.toString())
                    setCustomAmount('')
                  }}
                  className={`py-3 rounded-lg font-semibold transition ${
                    amount === amt.toString()
                      ? 'bg-rose-600 text-white'
                      : 'border-2 border-gray-300 hover:border-rose-600'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
            <button
              onClick={() => setAmount('custom')}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                amount === 'custom'
                  ? 'bg-rose-600 text-white'
                  : 'border-2 border-gray-300 hover:border-rose-600'
              }`}
            >
              {t('customAmount')}
            </button>
          </div>

          {/* Custom Amount Input */}
          {amount === 'custom' && (
            <div className="mb-6">
              <label className="block mb-2 font-medium">{t('enterAmount')}</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-rose-600"
                />
              </div>
            </div>
          )}

          {/* Donate Button */}
          <button
            onClick={handleDonate}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition"
          >
            <Heart size={20} />
            {t('donateButton')}
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            {t('secureTransaction')}
          </p>
        </div>

        {/* Info Section */}
        <div className="space-y-8">
          {/* Impact */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">{t('impactTitle')}</h3>
            <p className="text-gray-700 mb-4">{t('impactDesc')}</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>{t('impact1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>{t('impact2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>{t('impact3')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span>{t('impact4')}</span>
              </li>
            </ul>
          </div>

          {/* Alternative Ways */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">{t('otherWaysTitle')}</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="text-rose-600 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">{t('bankTransferTitle')}</h4>
                  <p className="text-sm text-gray-600">{t('bankTransferDesc')}</p>
                  <div className="mt-2 text-sm bg-white p-3 rounded">
                    <p><strong>{t('bankName')}:</strong> Bank of America</p>
                    <p><strong>{t('accountNumber')}:</strong> 1234567890</p>
                    <p><strong>{t('routingNumber')}:</strong> 123456789</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="text-rose-600 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">{t('checkTitle')}</h4>
                  <p className="text-sm text-gray-600">{t('checkDesc')}</p>
                  <div className="mt-2 text-sm bg-white p-3 rounded">
                    <p>Iglesia Puertas Abiertas</p>
                    <p>14320 Nordhoff St</p>
                    <p>Panorama City, CA 91402</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Info */}
          {/* <div className="bg-rose-50 p-6 rounded-lg border-2 border-rose-200">
            <p className="text-sm text-gray-700">
              {t('taxDeductible')}
            </p>
          </div> */}
        </div>
      </div>

      {/* Bible Verse */}
      <div className="mt-16 text-center max-w-2xl mx-auto">
        <blockquote className="text-xl italic text-gray-700 mb-2">
          "{t('bibleVerse')}"
        </blockquote>
        <p className="text-gray-500">{t('bibleReference')}</p>
      </div>
    </div>
  )
}