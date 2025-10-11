'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import moment from 'moment-timezone'

interface Post {
  id: string 
  title: string 
  description: string
  image: string
  createdAt: string
//   author?: string
  readTime?: number
}

export default function PostDetailPage() {
  const params = useParams() 
  const id = params.id as string
  
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchPost()
    }
  }, [id])

  const fetchPost = async () => {
    try {
      const baseUrl = window.location.origin
      const response = await fetch(`${baseUrl}/api/post/${id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Post no encontrado')
        } else {
          throw new Error('Error al cargar el post')
        }
        return
      }
      
      const data = await response.json()
      setPost(data)
    } catch (error) {
      console.error('Error fetching post:', error)
      setError('Error al cargar el post')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return moment.tz(dateString, 'America/Los_Angeles').format('DD [de] MMMM, YYYY')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando post...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-2xl font-bold text-gray-700">{error || 'Post no encontrado'}</div>
        <Link 
          href="/posts"
          className="text-rose-600 hover:text-rose-700 font-semibold inline-flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Volver a posts
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Botón volver */}
      <Link 
        href="/posts"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition"
      >
        <ArrowLeft size={20} />
        <span>Volver a posts</span>
      </Link>

      {/* Imagen destacada */}
      {post.image && (
        <div className="w-full h-96 rounded-xl overflow-hidden mb-8">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header del post */}
      <header className="mb-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {post.title}
        </h2>
        
         

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          
          {post.readTime && (
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime} min de lectura</span>
            </div>
          )}
          
          {/* {post.author && (
            <div className="flex items-center gap-2">
              <span>Por</span>
              <span className="font-semibold text-gray-700">{post.author}</span>
            </div>
          )} */}
        </div>
      </header>

      {/* Contenido del post */}
      <div className="prose prose-lg max-w-none">
        {/* Si el contenido viene en HTML */}
        {/* <div dangerouslySetInnerHTML={{ __html: post.description }} /> */}
        
        {/* O si el contenido viene en texto plano */}
        <div className="whitespace-pre-wrap">{post.description}</div>
      </div>

      {/* Navegación al final */}
      <div className="mt-12 pt-8 border-t">
        <Link 
          href="/posts"
          className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold transition"
        >
          <ArrowLeft size={20} />
          Ver todos los posts
        </Link>
      </div>
    </article>
  )
}