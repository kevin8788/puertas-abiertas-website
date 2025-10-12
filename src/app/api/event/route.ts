import { NextResponse } from "next/server"
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from '../../../config/db'; 
import db from "../../../config/db";
import connectDB from "../../../config/db";
import Event from "@/config/models/event";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await connectDB();
    // const session = await getServerSession(authOptions)
    
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    let { title, description, date, time, location, image } = body

    if (!title || !description || !date || !time || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if(!image) {
      image = "https://res.cloudinary.com/dbg69ivju/image/upload/v1760229665/WhatsApp_Image_2025-10-11_at_5.33.03_PM_ydrrx5.jpg"
      
    } 

   const newEvent = await Event.create({
      title,
      description,
      date,
      time,
      location,
      image
    });

    console.log(newEvent)

    // const docRef = await addDoc(collection(getFirestore(app), "events"), newEvent);
    // console.log("Document successfully written with ID: ", docRef.id);

    // console.log(db);
    // let events = await collection(db, "events");
    // const eventSnapshot = await getDocs(events);
    // const eventsData = eventSnapshot.docs.map(doc => doc.data())
    

    //add new event to firabese collection events

    // await addDoc(events, newEvent);

    // console.log(eventsData)
    

    return NextResponse.json(newEvent, { status: 201 })
  } catch (error : any) {
    console.log(error.message);
    console.log(error);
    return NextResponse.json({ error: 'Error creating event, ' + error.message }, { status: 500 })
  }
}


export async function GET(request: Request) {
  try {
    
    await connectDB();
    let events = await Event.find({ isActive: { $ne: false } }).sort({ date: 1, time: 1 });
    const formatted = events.map((event) => ({
  ...event._doc,
  id: event._id.toString(), 
}));

return NextResponse.json(formatted, { status: 200 });
  } catch (ex: any) {
    console.log(ex.message);
    return NextResponse.json({error: ex.message}, {status: 500})
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    const { title, description, date, time, location, image } = body
    
    // Validación
    if (!title || !description || !date || !time || !location) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos excepto imagen' },
        { status: 400 }
      )
    }
    
    // Actualizar evento
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date,
        time,
        location,
        image: image || '',
      },
      { new: true, runValidators: true }
    )
    
    if (!updatedEvent) {
      return NextResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(updatedEvent)
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { error: 'Error al actualizar evento' },
      { status: 500 }
    )
  }
}


export async function DELETE(request: Request) {
  try {
    let { searchParams } = new URL(request.url);
    let id = searchParams.get('id');
    if(!id) {
      return NextResponse.json({ error: 'Event Id must be provided' }, { status: 400 });
    }

    await connectDB();

    let event = await Event.findById(id);

    


    if(!event) {
      throw new Error("Event not found");
    }

     


    const objectId = new mongoose.Types.ObjectId(id);
    const result = await Event.updateOne({ _id: objectId }, { $set: { isActive: false }});
    console.log("Resultado del updateOne:", result);
    const updatedEvent = await Event.findById(objectId);
    console.log("Evento actualizado:", updatedEvent);
    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
    
  } catch (ex: any) {
    console.log(ex.message);
    return NextResponse.json({ error: ex.message }, { status: 500 });
  }
}
