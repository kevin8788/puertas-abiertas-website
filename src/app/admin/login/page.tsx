
import AdminLogin from "@/app/pages/LoginPage";
import { Metadata } from "next";
import Image from "next/image";   

export const metadata: Metadata = {
  title: 'Iglesia Puertas Abiertas Admin'
}

export default function Ministry() {
  return (
    <div className="font-sans ">
      <AdminLogin />
    </div>
  );
}
 