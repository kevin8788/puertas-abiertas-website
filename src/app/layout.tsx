import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from "@/components/header/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Providers } from './providers';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} font-serif`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Navbar /> 
            <main className="pt-20 min-h-screen">
              {children}
            </main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}