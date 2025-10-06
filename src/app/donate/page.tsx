
import { Metadata } from "next";
import Image from "next/image";  
import MinistryPage from "../pages/ministryPage";
import ContactPage from "../pages/ContactPage";
import EventsPage from "../pages/EventsPage";
import DonatePage from "../pages/DonatePage";

export const metadata: Metadata = {
  title: 'Iglesia Puertas Abiertas donar'
}

export default function Donate() {
  return (
    <div className="font-sans ">
      <DonatePage />
    </div>
  );
}
 