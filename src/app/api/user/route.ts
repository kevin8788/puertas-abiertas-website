import { NextResponse } from "next/server"
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from '../../../config/db'; 
import db from "../../../config/db";
import connectDB from "../../../config/db";
import User from "@/config/models/user";
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions)
    
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    const { name, username, password } = body

    if (!name || !username || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

   const newUser = await User.create({
      name,
      username,
      password, 
    });

    console.log(newUser)

    // const docRef = await addDoc(collection(getFirestore(app), "events"), newEvent);
    // console.log("Document successfully written with ID: ", docRef.id);

    // console.log(db);
    // let events = await collection(db, "events");
    // const eventSnapshot = await getDocs(events);
    // const eventsData = eventSnapshot.docs.map(doc => doc.data())
    

    //add new event to firabese collection events

    // await addDoc(events, newEvent);

    // console.log(eventsData)
    

    return NextResponse.json(newUser, { status: 201 })
  } catch (error : any) {
    console.log(error.message); 
    return NextResponse.json({ error: 'Error creating user, ' + error.message }, { status: 500 })
  }
}