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
    const { name, username, password, isAdmin } = body
    
    // Validación
    if (!name || !username) {
      return NextResponse.json(
        { error: 'Nombre y username son requeridos' },
        { status: 400 }
      )
    }
    
    // Verificar si el username ya existe en otro usuario
    const existingUser = await User.findOne({ 
      username, 
      _id: { $ne: id } // Excluye el usuario actual
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'El username ya está en uso' },
        { status: 400 }
      )
    }
    
    // Preparar datos para actualizar
    const updateData: any = {
      name,
      username,
      isAdmin: isAdmin ?? false,
    }
    
    // Solo actualizar password si se proporcionó uno nuevo
    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10)
      updateData.password = hashedPassword
    }
    
    // Actualizar usuario
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }
    
    // No devolver la contraseña
    const userResponse = {
      id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      isAdmin: updatedUser.isAdmin,
      createdAt: updatedUser.createdAt,
    }
    
    return NextResponse.json(userResponse)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Error al actualizar usuario' },
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