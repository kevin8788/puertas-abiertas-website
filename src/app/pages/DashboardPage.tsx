'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Calendar, Trash2, Plus } from 'lucide-react'
import moment from 'moment-timezone';
import VARIABLES from '@/config/varaibles'
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
}

interface User {
  id: string
  name: string
  username: string 
  createdAt: string
}

export default function AdminDashboard() {
//   const { data: session, status } = useSession()
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: ''
  });

  const [formPostData, setFormPostData] = useState({
    title: '',
    description: '',
    image: ''
  });

  const [formUserData, setFormUserData] = useState({
    name: '',
    username: '', 
    password: ''
  });

  const [baseUrl, setBaseUrl] = useState("");

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/admin/login')
//     }
//   }, [status, router])

//   useEffect(() => {
//     if (session) {
//       fetchEvents()
//     }
//   }, [session])

  useEffect(() => { 
    const url = window.location.origin;
    setBaseUrl(url);
  }, []);

  useEffect(() => {
    if (baseUrl) {
      fetchEvents();
      fetchPosts();
      fetchUsers();
    }
  }, [baseUrl]);

  useEffect(() => { 
  }, [events, posts, users])

  const fetchEvents = async () => { 
    try {
      
      
      const url = `${baseUrl}/api/test` 
       
      const response = await fetch(url); 
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json();  

      setEvents(data) 
    } catch (error) { 
      setError(error instanceof Error ? error.message : 'Error desconocido')
    } finally { 
      setLoading(false)
    }
  }

  const fetchPosts = async () => {
    try {
    
      
      const url = `${baseUrl}/api/post` 
       
      const response = await fetch(url); 
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json();  
      setPosts(data);
    } catch (ex: any){
      setError(ex instanceof Error ? ex.message : 'Error desconocido')
    }
  }

  const fetchUsers = async () => {
    try {
      
      const url = `${baseUrl}/api/user`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (ex: any) {
      setError(ex instanceof Error ? ex.message : 'Error desconocido')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('Evento creado exitosamente')
        setFormData({ title: '', description: '', date: '', time: '', location: '', image: '' })
        setShowForm(false)
        fetchEvents()
      }
    } catch (error) {
      // alert('Error al crear evento')
      toast.error("Error al crear evento")
    }
  }

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     
      toast.success("Post creado exitosamente");
      setFormPostData({ title: '', description: '', image: '' });
      setShowPostForm(false);
      fetchPosts();
    } catch( ex ) {
      toast.error("Error al crear post");
    }

  }

  const handleSubmitUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       const response = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formUserData),
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
      const data = await response.json();
    console.log('Usuario creado:', data);
    
    // AHORA sí muestra el toast
    toast.success("Usuario creado exitosamente")
      setFormUserData({ name: '', username: '', password: '' });
      setShowUserForm(false);
      fetchUsers();
    } catch (ex) {
      toast.error("Error al crear usuario");
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este evento?')) return

    try {
      const response = await fetch(`/api/test?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Evento eliminado')
        fetchEvents();
      }
    } catch (error) {
      alert('Error al eliminar evento')
    }
  }

//   if (status === 'loading') {
//     return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
//   }

//   if (!session) {
//     return null
//   }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">Panel de Administración</h2>
              {/* <p className="text-gray-600 mt-2">Bienvenido, {session.user?.name}</p> */}
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Events Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar /> Gestión de Eventos
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg flex items-center gap-2"
            >
              <Plus size={20} />
              {showForm ? 'Cancelar' : 'Nuevo Evento'}
            </button>
          </div>

          {/* Form */}
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
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Ubicación *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Fecha *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Hora *</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
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
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">URL de Imagen (opcional)</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold"
              >
                Crear Evento
              </button>
            </form>
          )}

          {/* Events List */}
          <div className="space-y-4" style={{ maxHeight: '500px', overflow: 'auto' }}>
            {events.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay eventos creados</p>
            ) : (
              events.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
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
                    onClick={() => handleDelete(event.id)}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Posts Management */}
        <div className='mt-6 bg-white rounded-lg shadow-md p-6'>
          <div className='flex justify-between items-center mb-6'>
             <h2 className='text-2xl font-bold flex items-center gap-2'>
              Gestion de Posts
             </h2>
              <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg flex items-center gap-2"
            >
              <Plus size={20} />
              {showPostForm ? 'Cancelar' : 'Nuevo Post'}
            </button>
          </div>

          {/* Form */}
          {showPostForm && (
            <form onSubmit={handleSubmitPost} className="mb-8 p-6 bg-gray-50 rounded-lg space-y-4">
              <div className="grid md:grid-cols-1 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Título *</label>
                  <input
                    type="text"
                    required
                    value={formPostData.title}
                    onChange={(e) => setFormPostData({ ...formPostData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                
             
               
              </div>
              <div>
                <label className="block mb-2 font-medium">Descripción *</label>
                <textarea
                  required
                  rows={4}
                  value={formPostData.description}
                  onChange={(e) => setFormPostData({ ...formPostData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">URL de Imagen (opcional)</label>
                <input
                  type="url"
                  value={formPostData.image}
                  onChange={(e) => setFormPostData({ ...formPostData, image: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold"
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
                <div key={post.id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-gray-600 text-sm">{post.description}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span> •  
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

        </div>

        {/* Users Management */}
         <div className='mt-6 bg-white rounded-lg shadow-md p-6'>
          <div className='flex justify-between items-center mb-6'>
             <h2 className='text-2xl font-bold flex items-center gap-2'>
              Gestion de Usuarios
             </h2>
              <button
              onClick={() => setShowUserForm(!showUserForm)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg flex items-center gap-2"
            >
              <Plus size={20} />
              {showUserForm ? 'Cancelar' : 'Nuevo Usuario'}
            </button>
          </div>

          {/* Form */}
          {showUserForm && (
            <form onSubmit={handleSubmitUser} className="mb-8 p-6 bg-gray-50 rounded-lg space-y-4">
              <div className="grid md:grid-cols-1 gap-4">
                <div>
                  <label className="block mb-2 font-medium">Nombre *</label>
                  <input
                    type="text"
                    required
                    value={formUserData.name}
                    onChange={(e) => setFormUserData({ ...formUserData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                
             
               
              </div>
              <div>
                <label className="block mb-2 font-medium">username</label>
                  <input
                    type="text"
                    required
                    value={formUserData.username}
                    onChange={(e) => setFormUserData({ ...formUserData, username: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
              </div>
              <div>
                <label className="block mb-2 font-medium">Contrasena</label>
                   <input
                    type="password"
                    required
                    value={formUserData.password}
                    onChange={(e) => setFormUserData({ ...formUserData, password: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
              </div>
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg font-semibold"
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
                <div key={user.id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <p className="text-gray-600 text-sm"><strong>Usuario:</strong> {user.username}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      <span>{new Date(user.createdAt).toLocaleDateString()}</span> •  
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  )
}