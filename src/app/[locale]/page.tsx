
import { Metadata } from "next";
import Image from "next/image";
import HomePage from "./pages/HomePage";

export const metadata: Metadata = {
  title: 'Iglesia Puertas Abiertas Home'
}

export default function Home() {
  return (
    <div className="font-sans ">
      <HomePage/>
    </div>
  );
}
