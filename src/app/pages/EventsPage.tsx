'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link';
import moment from 'moment-timezone';

interface Post {
  id: string
  slug: string
  title: string
  description: string
  content: string
  image: string
  createdAt: string
}

export default function PostsPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('¡Suscripción exitosa! Revisa tu email.')
        setEmail('')
      } else {
        setMessage(data.error || 'Error al suscribirse')
      }
    } catch (error) {
      setMessage('Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

   useEffect(() => { 
    fetchEvents();
  }, [])

  useEffect(() => { 
  }, [posts])

  const fetchEvents = async () => { 
    try {
      const baseUrl = window.location.origin; 
      
      const url = `${baseUrl}/api/post` 
       
      const response = await fetch(url); 
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json();  

      setPosts(data) 
    } catch (error) { 
      setError(error instanceof Error ? error.message : 'Error desconocido')
    } finally { 
      setLoading(false)
    }
  }
 

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header con suscripción */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Posts</h1>
        <p className="text-lg text-gray-600 mb-6">
          Quieres recibir nuestros posts?, suscríbete
        </p>
        
        <div className="flex flex-col items-center justify-center w-full px-4">
  <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-2">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="youremail@email.com"
      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
      required
      disabled={loading}
    />
    <button
      type="submit"
      disabled={loading}
      className="bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-rose-700 transition disabled:opacity-50 whitespace-nowrap"
    >
      {loading ? 'Enviando...' : 'Suscribirse'}
    </button>
  </form>
  
  {message && (
    <p className={`mt-4 text-sm text-center ${message.includes('exitosa') ? 'text-green-600' : 'text-red-600'}`}>
      {message}
    </p>
  )}
</div>
      </div>

      {/* Grid de posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <Link href={`/posts/${post.id}`}>
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            
            <div className="p-6">
              <Link href={`/posts/${post.id}`}>
                <h3 className="text-xl font-bold mb-2 hover:text-rose-600 transition">
                  {post.title}
                </h3>
              </Link>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.description}
              </p>
              
              <Link 
                href={`/posts/${post.id}`}
                className="text-rose-600 font-semibold hover:text-rose-700 transition inline-flex items-center gap-1"
              >
                Leer más
                <span>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}


