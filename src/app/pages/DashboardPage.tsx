'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Calendar, Trash2, Plus } from 'lucide-react'
import moment from 'moment-timezone'
import toast from 'react-hot-toast'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image?: string
}

interface Post {
  id: string 
  title: string
  description: string
  createdAt: string
  image?: string
}

interface User {
  id: string
  name: string
  username: string 
  createdAt: string
  isAdmin: boolean
}
 

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showPostForm, setShowPostForm] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: ''
  })

  const [formPostData, setFormPostData] = useState({
    title: '',
    description: '',
    image: ''
  })

  const [formUserData, setFormUserData] = useState({
    name: '',
    username: '', 
    password: '',
    isAdmin: false
  })
 
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

 
  useEffect(() => {
    if (status === 'authenticated' && session) {
      fetchEvents()
      fetchPosts()
      fetchUsers()
    }
  }, [status, session])

 
  const fetchEvents = async () => { 
    try {
      setLoading(true)
      const response = await fetch('/api/event', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setEvents(data) 
    } catch (error) { 
      console.error('Error fetching events:', error)
      setError(error instanceof Error ? error.message : 'Error desconocido')
      toast.error('Error al cargar eventos')
    } finally { 
      setLoading(false)
    }
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/post', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setPosts(data)
    } catch (ex: any) {
      console.error('Error fetching posts:', ex)
      setError(ex instanceof Error ? ex.message : 'Error desconocido')
      toast.error('Error al cargar posts')
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/user', {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setUsers(data)
    } catch (ex: any) {
      console.error('Error fetching users:', ex)
      setError(ex instanceof Error ? ex.message : 'Error desconocido')
      toast.error('Error al cargar usuarios')
    }
  }

  console.log(session)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Error al crear evento')
      }

      toast.success('Evento creado exitosamente')
      setFormData({ title: '', description: '', date: '', time: '', location: '', image: '' })
      setShowForm(false)
      await fetchEvents()
    } catch (error) {
      console.error('Error creating event:', error)
      toast.error('Error al crear evento')
    }
  }

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formPostData),
      })

      if (!response.ok) {
        throw new Error('Error al crear post')
      }

      toast.success('Post creado exitosamente')
      setFormPostData({ title: '', description: '', image: '' })
      setShowPostForm(false)
      await fetchPosts()
    } catch (ex) {
      console.error('Error creating post:', ex)
      toast.error('Error al crear post')
    }
  }

  const handleSubmitUser = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formUserData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error en la respuesta del servidor')
      }
      
      const data = await response.json()
      console.log('Usuario creado:', data)
      
      toast.success('Usuario creado exitosamente')
      setFormUserData({ name: '', username: '', password: '', isAdmin: false })
      setShowUserForm(false)
      await fetchUsers()
    } catch (ex: any) {
      console.error('Error creating user:', ex)
      toast.error(ex.message || 'Error al crear usuario')
    }
  }

  const handleDelete = async (id: string, type: 'event' | 'post' | 'user') => {
  const label =
    type === 'event' ? 'evento' :
    type === 'post' ? 'post' : 'usuario'

  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-custom-enter' : 'animate-custom-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5`}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">¿Eliminar {label}?</h2>
        <p className="text-sm text-gray-600 mt-1">Esta acción no se puede deshacer.</p>
      </div>

      <div className="flex border-t border-gray-200 divide-x divide-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-1/2 p-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Cancelar
        </button>
        <button
          onClick={async () => {
            toast.dismiss(t.id)
            try {
              const endpoints = {
                event: `/api/event/?id=${id}`,
                post: `/api/post/?id=${id}`,
                user: `/api/user/?id=${id}`
              }

              const response = await fetch(endpoints[type], {
                method: 'DELETE',
                credentials: 'include',
              })

              if (!response.ok) throw new Error('Error al eliminar')

              toast.success(`${label.charAt(0).toUpperCase() + label.slice(1)} eliminado`)

              if (type === 'event') await fetchEvents()
              if (type === 'post') await fetchPosts()
              if (type === 'user') await fetchUsers()
            } catch (error) { 
              toast.error('Error al eliminar', { duration: 400, style: { animation: 'none' } })
            }
          }}
          className="w-1/2 p-3 text-center text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Sí, eliminar
        </button>
      </div>
    </div>
  ))
}

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    )
  }


  if (!session) {
    return null
  }
 

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">Panel de Administración</h2>
              <p className="text-gray-600 mt-2">Bienvenido, {session.user?.name || session.user?.name}</p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Events Management */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar /> Gestión de Eventos
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg flex items-center gap-2 transition"
            >
              <Plus size={20} />
              {showForm ? 'Cancelar' : 'Nuevo Evento'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Título *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Ubicación *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Fecha *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Hora *</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium">Descripción *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">URL de Imagen (opcional)</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Crear Evento
              </button>
            </form>
          )}

          <div className="space-y-4" style={{ maxHeight: '500px', overflow: 'auto' }}>
            {loading && events.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Cargando eventos...</p>
            ) : events.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay eventos creados</p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    <p className="text-gray-600 text-sm">{event.description}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      <span>{new Date(event.date).toLocaleDateString()}</span> • 
                      <span> {event.time}</span> • 
                      <span> {event.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(event.id, 'event')}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Posts Management */}
        <div className='mt-6 bg-white rounded-lg shadow-md p-6 mb-6'>
          <div className='flex justify-between items-center mb-6'>
             <h2 className='text-2xl font-bold flex items-center gap-2'>
              Gestión de Posts
             </h2>
              <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg flex items-center gap-2 transition"
            >
              <Plus size={20} />
              {showPostForm ? 'Cancelar' : 'Nuevo Post'}
            </button>
          </div>

          {showPostForm && (
            <form onSubmit={handleSubmitPost} className="mb-8 p-6 bg-gray-50 rounded-lg space-y-4">
              <div>
                <label className="block mb-2 font-medium">Título *</label>
                <input
                  type="text"
                  required
                  value={formPostData.title}
                  onChange={(e) => setFormPostData({ ...formPostData, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Descripción *</label>
                <textarea
                  required
                  rows={4}
                  value={formPostData.description}
                  onChange={(e) => setFormPostData({ ...formPostData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">URL de Imagen (opcional)</label>
                <input
                  type="url"
                  value={formPostData.image}
                  onChange={(e) => setFormPostData({ ...formPostData, image: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Crear Post
              </button>
            </form>
          )}

          <div className="space-y-4" style={{ maxHeight: '500px', overflow: 'auto' }}>
            {posts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay posts creados</p>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{post.description}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(post.id, 'post')}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Users Management */}
       {  session.user?.isAdmin && ( <div className='mt-6 bg-white rounded-lg shadow-md p-6'>
          <div className='flex justify-between items-center mb-6'>
             <h2 className='text-2xl font-bold flex items-center gap-2'>
              Gestión de Usuarios
             </h2>
              <button
              onClick={() => setShowUserForm(!showUserForm)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg flex items-center gap-2 transition"
            >
              <Plus size={20} />
              {showUserForm ? 'Cancelar' : 'Nuevo Usuario'}
            </button>
          </div>

          {showUserForm && (
            <form onSubmit={handleSubmitUser} className="mb-8 p-6 bg-gray-50 rounded-lg space-y-4">
              <div>
                <label className="block mb-2 font-medium">Nombre *</label>
                <input
                  type="text"
                  required
                  value={formUserData.name}
                  onChange={(e) => setFormUserData({ ...formUserData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Username *</label>
                <input
                  type="text"
                  required
                  value={formUserData.username}
                  onChange={(e) => setFormUserData({ ...formUserData, username: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Contraseña *</label>
                <input
                  type="password"
                  required
                  value={formUserData.password}
                  onChange={(e) => setFormUserData({ ...formUserData, password: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              {/* add isAdmin boolean value */}
              <div>
                <label className="block mb-2 font-medium">Es Administrador</label>
                <input
                  type="checkbox"
                  title='si'
                  checked={formUserData.isAdmin || false}
                  onChange={(e) => setFormUserData({ ...formUserData, isAdmin: e.target.checked })}
                  className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Crear Usuario
              </button>
            </form>
          )}

          <div className="space-y-4" style={{ maxHeight: '500px', overflow: 'auto' }}>
            {users.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay usuarios creados</p>
            ) : (
              users.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <p className="text-gray-600 text-sm"><strong>Usuario:</strong> {user.username}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(user.id, 'user')}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>)}
      </div>
    </div>
  )
}