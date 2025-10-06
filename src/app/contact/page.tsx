
import { Metadata } from "next";
import Image from "next/image";  
import MinistryPage from "../pages/ministryPage";
import ContactPage from "../pages/ContactPage";

export const metadata: Metadata = {
  title: 'Iglesia Puertas Abiertas contacto'
}

export default function Ministry() {
  return (
    <div className="font-sans ">
      <ContactPage />
    </div>
  );
}
 