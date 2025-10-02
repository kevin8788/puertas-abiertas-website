'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../../public/logo.png'
import Navbar from './navbar/navbar'

function Header() {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => { 
      setIsMenuOpen(!isMenuOpen); 
    }; 

     return (
    <div className='h-full'> 
   
    
     <Navbar/>
    </div>
  )
}

export default Header

// Compare this snippet from puertas-abiertas-website/src/app/page.tsx:
// import Image from "next/image";