"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import OurDetails from "./Components/OurDetails";
import App from "next/app";
import Approach from "./Components/Approach";
import Partners from "./Components/Partner";
import HomeContact from "./Components/HomeContact";
import Testimony from "./Components/Testimony";

export default function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  
  // Array of banner images with descriptions and links
  const banners = [
    {
      image: "/banner/banner.jpg",
      title: "In it for the long haul!",
      description: "We want to build a relationship, not just a customer base.",
      link: "/digital",
      buttonText: "LEARN MORE"
    },
    {
      image: "/banner/banner (1).jpg",
      title: "Premium Home Services",
      description: "Excellence in every detail for your modern home needs.",
      link: "/home",
      buttonText: "DISCOVER MORE"
    },
    {
      image: "/banner/banner (2).jpg",
      title: "Quality Products",
      description: "High-quality products designed for lasting excellence.",
      link: "/products",
      buttonText: "VIEW PRODUCTS"
    },
    {
      image: "/banner/banner (3).jpg",
      title: "Professional Team",
      description: "Get in touch with our dedicated professional team.",
      link: "/contact",
      buttonText: "CONTACT NOW"
    }
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Handle indicator click
  const handleIndicatorClick = (index: number) => {
    setCurrentImageIndex(index);
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 1000); // Reset after 1 second
  };

  // Animation variants
  const bannerVariants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const arrowVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div 
      className="w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Banner Container - Full screen height */}
      <div className="relative w-full h-screen min-h-[600px] overflow-hidden">
        <AnimatePresence custom={1} initial={false}>
          <motion.div
            key={currentImageIndex}
            custom={1}
            variants={bannerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={banners[currentImageIndex].image}
              alt={`Banner image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
              sizes="100vw"
            />
            
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Banner Content - Left aligned */}
            <div className="absolute inset-0 flex items-center">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="text-white px-8 md:px-12 lg:px-24 max-w-2xl"
              >
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                >
                  {banners[currentImageIndex].title}
                </motion.h1>
                <motion.p 
                  variants={itemVariants}
                  className="text-lg md:text-xl lg:text-2xl mb-8 font-light tracking-wide opacity-90"
                >
                  {banners[currentImageIndex].description}
                </motion.p>
                <motion.div variants={buttonVariants}>
                  <Link
                    href={banners[currentImageIndex].link}
                    className="inline-block border-2 border-white text-white font-semibold py-3 px-8 hover:bg-white hover:text-gray-900 transition-all duration-300 tracking-wider text-sm"
                  >
                    {banners[currentImageIndex].buttonText}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Arrows - Animate on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.button
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={arrowVariants}
                onClick={() => setCurrentImageIndex(
                  currentImageIndex === 0 ? banners.length - 1 : currentImageIndex - 1
                )}
                className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300 z-10 p-2"
                aria-label="Previous slide"
              >
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              <motion.button
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={arrowVariants}
                onClick={() => setCurrentImageIndex(
                  currentImageIndex === banners.length - 1 ? 0 : currentImageIndex + 1
                )}
                className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300 z-10 p-2"
                aria-label="Next slide"
              >
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>
      
      {/* Bottom Indicators - Centered */}
      
      
    <OurDetails />
    <Approach />       
    <Partners/>
      <Testimony/>
    <HomeContact />
  

    </div>
  );
}