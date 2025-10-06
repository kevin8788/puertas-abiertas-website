
import { Metadata } from "next";
import Image from "next/image";  
import MinistryPage from "../pages/ministryPage";

export const metadata: Metadata = {
  title: 'Iglesia Puertas Abiertas Ministerio'
}

export default function Ministry() {
  return (
    <div className="font-sans ">
      <MinistryPage />
    </div>
  );
}
 