import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
// import { authOptions } from '../auth/[...nextauth]/route'

// Simulación de base de datos (en producción usa MongoDB, PostgreSQL, etc.)
let events: any[] = []

// GET - Obtener todos los eventos
export async function GET() {
  try {
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching events' }, { status: 500 })
  }
}

// POST - Crear nuevo evento (requiere autenticación)
export async function POST(request: Request) {
  try {
    // const session = await getServerSession(authOptions)
    
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    const { title, description, date, time, location, image } = body

    if (!title || !description || !date || !time || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newEvent = {
      id: Date.now().toString(),
      title,
      description,
      date,
      time,
      location,
      image: image || null,
      createdAt: new Date().toISOString(),
    }

    console.log({title, description, date, time, location, image})

    events.push(newEvent)

    return NextResponse.json(newEvent, { status: 201 })
  } catch (error : any) {
    return NextResponse.json({ error: 'Error creating event, ' + error.message }, { status: 500 })
  }
}

// DELETE - Eliminar evento (requiere autenticación)
export async function DELETE(request: Request) {
  try {
    // const session = await getServerSession(authOptions)
    
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Event ID required' }, { status: 400 })
    }

    events = events.filter(event => event.id !== id)

    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting event' }, { status: 500 })
  }
}