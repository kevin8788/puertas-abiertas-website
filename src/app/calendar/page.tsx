
import { Metadata } from "next";
import Image from "next/image";  
import MinistryPage from "../pages/ministryPage"; 
import CalendarPage from "../pages/CalendarPage";

export const metadata: Metadata = {
  title: 'Iglesia Puertas Abiertas Ministerio'
}

export default function Ministry() {
  return (
    <div className="font-sans ">
      <CalendarPage/>
    </div>
  );
}
 