// components/CustomCarousel.tsx
'use client';

import React, { useState, useEffect } from 'react';
// Assuming you have installed lucide-react: npm install lucide-react
import { ArrowRight, ArrowLeft } from 'lucide-react'; 

const slides = [
  { id: 1, src: 'https://www.agenciapi.co/sites/default/files/2022-01/iglesiacristiana.jpg', alt: 'Slide 1' },
  { id: 2, src: 'https://www.arthurefc.org/cms_files/slideshow_jquery/slideshow56516_28.jpg', alt: 'Slide 2' },
  { id: 3, src: 'https://www.billboard.com/wp-content/uploads/2024/08/elevation-worship-2024-billboard-pro-1260.jpg', alt: 'Slide 3' },
  { id: 4, src: 'https://lirp.cdn-website.com/08d31351/dms3rep/multi/opt/423483-5-largest-christian-music-festival-640w.jpg', alt: 'Slide 3' },
  { id: 5, src: 'https://images.seattletimes.com/wp-content/uploads/2025/08/08202025_Let-Us-Worship_074510.jpg?d=780x520', alt: 'Slide 3' },
  { id: 6, src: 'https://s3.amazonaws.com/e-zekiel/sites/fb225d34-ee7b-11e4-b3be-6ad50a5a3da0/images/23655/aisle_and_pews-medium.jpg?1490281647', alt: 'Slide 3' },
  { id: 7, src: 'https://images.squarespace-cdn.com/content/v1/5730e03e9f72668963fa70b5/1677093645666-U7BQUR8MKJHG01GG5R6Q/HCC_Feb_2023_Swidrak%26Co-88.jpg?format=2500w', alt: 'Slide 3' },
];

const CustomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Optional: Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    // 1. Main Container: Set a fixed height (h-64) and relative positioning
    <div className="relative w-full max-w-full mx-auto overflow-hidden rounded-lg shadow-lg h-96 md:h-128">
      <div
        // 2. Track Container: Must also match height and enable flex layout
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
       >
        {slides.map((slide) => (
          // 3. Individual Slide: Must be full width and full height
          <div 
            key={slide.id} 
            className="w-full flex-shrink-0 h-full"
          >
            <img
              src={slide.src}
              alt={slide.alt}
              // HTML width/height are ignored by object-cover but good practice
              width={800} 
              height={400}
              // 4. Image Styling: w-full h-full ensures it fills the parent div. 
              // object-cover ensures it covers the area uniformly (crops if needed).
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      
      {/* Navigation buttons: Added styles to make them visible and functional */}
      <button 
        onClick={prevSlide} 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-lg hover:bg-opacity-75 transition"
        aria-label="Previous Slide"
      > 
        <ArrowLeft/>
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-lg hover:bg-opacity-75 transition"
        aria-label="Next Slide"
      >
        <ArrowRight/>
      </button>
    </div>
  );
};

export default CustomCarousel;
