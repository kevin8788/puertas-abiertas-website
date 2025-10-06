
import { Metadata } from "next";
import Image from "next/image";  
import MinistryPage from "../pages/ministryPage";
import ContactPage from "../pages/ContactPage";
import EventsPage from "../pages/EventsPage";

export const metadata: Metadata = {
  title: 'Iglesia Puertas Abiertas Eventos'
}

export default function Events() {
  return (
    <div className="font-sans ">
      <EventsPage />
    </div>
  );
}
 