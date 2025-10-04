import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/navbar/navbar";
import Footer from "@/components/footer/footer";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Iglesia Puertas Abiertas",
  description: "Una iglesia con propósito eterno",
};

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  const messages = useMessages()

  if (!messages) {
    notFound()
  }


  return (
    <html lang="es">
      <body className='font-serif pt'>
        
        <Navbar/> 
        <NextIntlClientProvider locale={locale} messages={messages}>
       <main className="pt-20 min-h-screen">  
          {children}
        </main>
        </NextIntlClientProvider>
        <Footer/>  
        </body>
    </html>
  )
}
