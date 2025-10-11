import { NextResponse } from "next/server"
import connectDB from "../../../../config/db";
import Post from "@/config/models/post"; 

export async function GET(request: Request) {
  try {
    
    await connectDB();
    let id = request.url.split('/').pop();

    let post = await Post.findOne({ _id: id, isActive: { $ne: false}});
   

return NextResponse.json(post, { status: 200 });
  } catch (ex: any) {
    console.log(ex.message);
    return NextResponse.json({error: ex.message}, {status: 500})
  }
}