import PostDetailPage from "@/app/pages/id.Posts";
import { Metadata } from "next";
import Image from "next/image";   

export const metadata: Metadata = {
  title: 'Iglesia Puertas Abiertas Eventos'
}

export default function Events() {
  console.log('COMPONENTE MONTADO!!!')
  return (
    <div className="font-sans ">
      <PostDetailPage />
    </div>
  );
}
 