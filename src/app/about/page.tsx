
import { Metadata } from "next";
import Image from "next/image"; 
import AboutPage from "../pages/AboutPage";

export const metadata: Metadata = {
  title: 'Iglesia Puertas Abiertas Home'
}

export default function Home() {
  return (
    <div className="font-sans ">
      <AboutPage/>
    </div>
  );
}
 