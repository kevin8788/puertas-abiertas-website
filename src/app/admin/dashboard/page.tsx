
import AdminLogin from "@/app/pages/LoginPage";
import { Metadata } from "next";
import Image from "next/image";   
import AdminDashboard from "../../pages/DashboardPage";

export const metadata: Metadata = {
  title: 'Iglesia Puertas Abiertas Admin'
}

export default function Dashboard() {
  return (
    <div className="font-sans ">
      <AdminDashboard />
    </div>
  );
}
 