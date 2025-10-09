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
    const { title, description, date, time, location, image } = body

    if (!title || !description || !date || !time || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
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


export async function DELETE(request: Request) {
  try {
    console.log("mas mostro que los de thriller")
    let { searchParams } = new URL(request.url);
    let id = searchParams.get('id');
    console.log(id);
    console.log("deleting")
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
