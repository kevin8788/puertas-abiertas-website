import { NextResponse } from "next/server"
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from '../../../config/db'; 
import db from "../../../config/db";
import connectDB from "../../../config/db";
import User from "@/config/models/user";
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const bcrypt = require('bcryptjs');

export async function POST(request: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json();
    const { name, username, password } = body;
 

    if (!name || !username || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    


   const newUser = await User.create({
      name,
      username,
      password: hashedPassword
    });

   
    

    return NextResponse.json(newUser, { status: 201 })
  } catch (error : any) {
    console.log(error.message); 
    return NextResponse.json({ error: 'Error creating user, ' + error.message }, { status: 500 })
  }
}


export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions)
    let users = await User.find({ isActive: { $ne: false } }).select('-password').sort({ createdAt: -1});
    const formatted = users.map((user) => ({
      ...user._doc,
      id: user._id.toString(), 
    }));
    return NextResponse.json(formatted, { status: 200 });
  } catch (ex: any) {
    return NextResponse.json({ error: 'Error fetching users, ' + ex.message }, { status: 500 })
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

    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let user = await User.findById(id);

    if(!user) {
      throw new Error("Event not found");
    }

     if(user.id === session.user.id) {
      return NextResponse.json({ error: 'You cannot delete yourself' }, { status: 400 });
     }


    const objectId = new mongoose.Types.ObjectId(id);
    const result = await User.updateOne({ _id: objectId }, { $set: { isActive: false }});
   
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    
  } catch (ex: any) {
    console.log(ex.message);
    return NextResponse.json({ error: ex.message }, { status: 500 });
  }
}