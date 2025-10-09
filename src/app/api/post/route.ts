import { NextResponse } from "next/server"
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import app from '../../../config/db'; 
import db from "../../../config/db";
import connectDB from "../../../config/db";
import Post from "@/config/models/post";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await connectDB();
    // const session = await getServerSession(authOptions)
    
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    const { title, description, image } = body

    if (!title || !description || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

   const newPost = await Post.create({
      title,
      description,
      image, 
    });  

    return NextResponse.json(newPost, { status: 201 })
  } catch (error : any) {
    console.log(error.message); 
    return NextResponse.json({ error: 'Error creating user, ' + error.message }, { status: 500 })
  }
}


export async function GET(request: Request) {
  try {
    
    await connectDB();
    let posts = await Post.find({ isActive: { $ne: false } }).sort({ date: 1, time: 1 });
    const formatted = posts.map((post) => ({
  ...post._doc,
  id: post._id.toString(), 
}));

return NextResponse.json(formatted, { status: 200 });
  } catch (ex: any) {
    console.log(ex.message);
    return NextResponse.json({error: ex.message}, {status: 500})
  }
}