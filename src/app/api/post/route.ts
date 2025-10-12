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
    let { title, description, image } = body

    if (!title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    
    if(!image) {
      image = "https://res.cloudinary.com/dbg69ivju/image/upload/v1760229665/WhatsApp_Image_2025-10-11_at_5.33.03_PM_ydrrx5.jpg"
      
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
    //lets return last post first

    let posts = await Post.find({ isActive: { $ne: false } }).sort({ createdAt: -1 });
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
    const { title, description, image } = body
    
    // Validación
    if (!title || !description) {
      return NextResponse.json(
        { error: 'Título y descripción son requeridos' },
        { status: 400 }
      )
    }
    
    // Actualizar post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image: image || '',
      },
      { new: true, runValidators: true }
    )
    
    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Error al actualizar post' },
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

    let post = await Post.findOne({ _id: id });
    if(!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const objectId = new mongoose.Types.ObjectId(id);
    const result = await Post.updateOne({ _id: objectId }, { $set: { isActive: false }});
   
    return NextResponse.json({ message: 'post deleted successfully' }, { status: 200 });
    
  } catch (ex: any) {
    console.log(ex.message);
    return NextResponse.json({ error: ex.message }, { status: 500 });
  }
}