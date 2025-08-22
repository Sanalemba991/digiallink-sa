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
  const [direction, setDirection] = useState(0); // Add direction state

  // Array of banner images with descriptions and links
  const banners = [
    {
      image: "/banner/Award 2.png",
      title: <>Award-Winning <span style={{ color: '#3A55E8' }}>Excellence</span></>,
      description: "Recognized globally for our innovative solutions and outstanding technological achievements.",
      link: "/awards",
      buttonText: "VIEW AWARDS"
    },
    {
      image: "/banner/P 2.png",
      title: <>Enterprise <span style={{ color: '#3A55E8' }}>Solutions</span></>,
      description: "Complete surveillance ecosystems: high-definition cameras, reliable storage, professional cabling, and durable hard disks for long-term performance.",
      link: "/products",
      buttonText: "VIEW PRODUCTS"
    },

    {
      image: "/banner/Contact 1.png",
      title: <>Strategic <span style={{ color: '#3A55E8' }}>Partnership</span></>,
      description: "Partner with us to leverage cutting-edge technology and expert consultation for your business growth.",
      link: "/contact",
      buttonText: "PARTNER WITH US"
    },
    {
      image: "/banner/History.png",
      title: <>Innovation & <span style={{ color: '#3A55E8' }}>Excellence</span></>,
      description: "Pioneering technological advancement with over two decades of industry expertise and innovation.",
      link: "/history",
      buttonText: "DISCOVER MORE"
    }
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1); // Forward direction for auto-rotation
      setCurrentImageIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Handle indicator click
  const handleIndicatorClick = (index: number) => {
    const newDirection = index > currentImageIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentImageIndex(index);
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 1000); // Reset after 1 second
  };

  // Handle previous button click
  const handlePrevious = () => {
    setDirection(-1); // Left to right direction
    setCurrentImageIndex(
      currentImageIndex === 0 ? banners.length - 1 : currentImageIndex - 1
    );
  };

  // Handle next button click
  const handleNext = () => {
    setDirection(1); // Right to left direction
    setCurrentImageIndex(
      currentImageIndex === banners.length - 1 ? 0 : currentImageIndex + 1
    );
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
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentImageIndex}
            custom={direction}
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
                    className="inline-block border-2 rounded-lg border-white text-white font-semibold py-3 px-8 hover:bg-white hover:text-gray-900 transition-all duration-300 tracking-wider text-sm"
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
                onClick={handlePrevious}
                className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-transparent hover:bg-blue-600/30 transition-all duration-300 group"
                aria-label="Previous slide"
              >
                <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full group-hover:bg-blue-600 transition-all duration-300">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </motion.button>

              <motion.button
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={arrowVariants}
                onClick={handleNext}
                className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-transparent hover:bg-blue-600/30 transition-all duration-300 group"
                aria-label="Next slide"
              >
                <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full  transition-all duration-300">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Bottom Indicators - Centered */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/80'
                } ${clickedIndex === index ? 'scale-125' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <OurDetails />
      <Approach />
      <Partners />
      <Testimony />
      <HomeContact />
   
    </div>
  );
}