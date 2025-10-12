import { NextResponse } from "next/server";
import connectDB from "../../../config/db";
import subscription_email from "@/config/models/subscription_email";
import mongoose from "mongoose";  

const bcrypt = require('bcryptjs');

export async function POST(request: Request) {
  try {
    await connectDB(); 
     
    const body = await request.json();
    const { email } = body;
 

    if (!email ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

     
    let existing = await subscription_email.findOne({ email: email });
    if (existing) {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 })
    }
    
    if(existing && !existing.isActive) {
      existing.isActive = true;
      await existing.save();
      return NextResponse.json(existing, { status: 201 })
    }

   const newSubscription = await subscription_email.create({
      email 
    });


    

   
    

    return NextResponse.json({mesage: "created"}, { status: 201 })
  } catch (error : any) {
    console.log(error.message); 
    return NextResponse.json({ error: 'Error creating user, ' + error.message }, { status: 500 })
  }
}