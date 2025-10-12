// components/CustomCarousel.tsx
'use client';

import React, { useState, useEffect } from 'react';
// Assuming you have installed lucide-react: npm install lucide-react
import { ArrowRight, ArrowLeft } from 'lucide-react'; 

const slides = [
  { id: 1, src: 'https://res.cloudinary.com/dbg69ivju/image/upload/v1760229674/WhatsApp_Image_2025-10-11_at_5.33.49_PM_u8zjne.jpg', alt: 'Slide 1' },
  { id: 2, src: 'https://res.cloudinary.com/dbg69ivju/image/upload/v1760229670/WhatsApp_Image_2025-10-11_at_5.33.17_PM_izomrg.jpg', alt: 'Slide 2' },
  { id: 3, src: 'https://res.cloudinary.com/dbg69ivju/image/upload/v1760229615/WhatsApp_Image_2025-10-11_at_5.34.23_PM_hj9lng.jpg', alt: 'Slide 3' },
  { id: 4, src: 'https://res.cloudinary.com/dbg69ivju/image/upload/v1760229596/WhatsApp_Image_2025-10-11_at_5.35.07_PM_job283.jpg', alt: 'Slide 3' },
  { id: 5, src: 'https://res.cloudinary.com/dbg69ivju/image/upload/v1760229622/WhatsApp_Image_2025-10-11_at_5.34.13_PM_rcjksk.jpg', alt: 'Slide 3' },
  { id: 6, src: 'https://res.cloudinary.com/dbg69ivju/image/upload/v1760229665/WhatsApp_Image_2025-10-11_at_5.33.03_PM_ydrrx5.jpg', alt: 'Slide 3' },
  { id: 7, src: 'https://res.cloudinary.com/dbg69ivju/image/upload/v1760229610/WhatsApp_Image_2025-10-11_at_5.34.38_PM_btxvw7.jpg', alt: 'Slide 3' },
  { id: 8, src: 'https://res.cloudinary.com/dbg69ivju/image/upload/v1760229606/WhatsApp_Image_2025-10-11_at_5.34.48_PM_ywa8kj.jpg', alt: 'Slide 3' },

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
