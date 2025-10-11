// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import dotenv from 'dotenv';
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// dotenv.config();
// // Your web app's Firebase configuration
// console.log({apiKey: process.env.FIREBASEAPIKEY,
//   authDomain: process.env.FIREBASEAUTHDOMAIN,
//   databaseURL: process.env.FIREBASEDBURL,
//   projectId: process.env.FIREBASEPROJECTID,
//   storageBucket: process.env.FIREBASESTORAGEBUCKET,
//   messagingSenderId: process.env.FIREBASEMESSAGINSENDERID,
//   appId: process.env.FIREBASEAPPId,
// });

// const firebaseConfig = {
//   apiKey: process.env.FIREBASEAPIKEY,
//   authDomain: process.env.FIREBASEAUTHDOMAIN,
//   databaseURL: process.env.FIREBASEDBURL,
//   projectId: process.env.FIREBASEPROJECTID,
//   storageBucket: process.env.FIREBASESTORAGEBUCKET,
//   messagingSenderId: process.env.FIREBASEMESSAGINSENDERID,
//   appId: process.env.FIREBASEAPPId,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export default db;


// lib/mongoose.ts
import mongoose from 'mongoose';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() { 
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('⚠️ MONGODB_URI no está definida en las variables de entorno.');
    throw new Error('MONGODB_URI environment variable missing');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      console.log('✅ MongoDB conectado exitosamente');
      return mongoose;
    }).catch((err) => {
      console.error('❌ Error conectando a MongoDB:', err.message);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;