// import { MongoClient } from 'mongodb'
// import { NextResponse } from 'next/server'
// import { v4 as uuidv4 } from 'uuid'

// // MongoDB connection
// let client
// let db

// async function connectToDatabase() {
//   if (!client) {
//     client = new MongoClient(process.env.MONGO_URL)
//     await client.connect()
//     db = client.db(process.env.DB_NAME || 'puertas_abiertas')
//   }
//   return db
// }

// // Admin login endpoint
// export async function POST(request, { params }) {
//   const path = params.path ? params.path.join('/') : ''
  
//   try {
//     if (path === 'admin/login') {
//       const { username, password } = await request.json()
      
//       // Admin credentials
//       if (username === 'wilson123' && password === 'puertasabiertas123') {
//         return NextResponse.json({ success: true })
//       }
      
//       return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
//     }
    
//     if (path === 'events') {
//       const db = await connectToDatabase()
//       const eventData = await request.json()
      
//       const event = {
//         id: uuidv4(),
//         ...eventData,
//         createdAt: new Date()
//       }
      
//       await db.collection('events').insertOne(event)
//       return NextResponse.json(event)
//     }
    
//     if (path === 'contact') {
//       const db = await connectToDatabase()
//       const contactData = await request.json()
      
//       const contact = {
//         id: uuidv4(),
//         ...contactData,
//         createdAt: new Date()
//       }
      
//       await db.collection('contacts').insertOne(contact)
//       return NextResponse.json({ success: true })
//     }
    
//     return NextResponse.json({ error: 'Not found' }, { status: 404 })
//   } catch (error) {
//     console.error('API Error:', error)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }

// // Get events
// export async function GET(request, { params }) {
//   const path = params.path ? params.path.join('/') : ''
  
//   try {
//     if (path === 'events') {
//       const db = await connectToDatabase()
//       const events = await db.collection('events')
//         .find({})
//         .sort({ createdAt: -1 })
//         .toArray()
      
//       return NextResponse.json(events)
//     }
    
//     return NextResponse.json({ error: 'Not found' }, { status: 404 })
//   } catch (error) {
//     console.error('API Error:', error)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }

// // Update event
// export async function PUT(request, { params }) {
//   const path = params.path ? params.path.join('/') : ''
  
//   try {
//     if (path.startsWith('events/')) {
//       const eventId = path.replace('events/', '')
//       const db = await connectToDatabase()
//       const updateData = await request.json()
      
//       await db.collection('events').updateOne(
//         { id: eventId },
//         { $set: { ...updateData, updatedAt: new Date() } }
//       )
      
//       return NextResponse.json({ success: true })
//     }
    
//     return NextResponse.json({ error: 'Not found' }, { status: 404 })
//   } catch (error) {
//     console.error('API Error:', error)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }

// // Delete event
// export async function DELETE(request, { params }) {
//   const path = params.path ? params.path.join('/') : ''
  
//   try {
//     if (path.startsWith('events/')) {
//       const eventId = path.replace('events/', '')
//       const db = await connectToDatabase()
      
//       await db.collection('events').deleteOne({ id: eventId })
      
//       return NextResponse.json({ success: true })
//     }
    
//     return NextResponse.json({ error: 'Not found' }, { status: 404 })
//   } catch (error) {
//     console.error('API Error:', error)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }