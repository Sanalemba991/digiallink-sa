"use client";
import Image from "next/image";
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-[350px]"
    >
      {/* Image */}
      <div className="h-full w-full">
        <Image
          src={service.image}
          alt={service.title}
          width={600}
          height={400}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {/* Overlay content */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent flex flex-col justify-start items-center text-center pt-12 px-6">
        {/* Text title instead of icon */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
        </div>
        {/* Description */}
        <p className="text-gray-200 text-m mb-8">{service.description}</p>
      </div>

      {/* Explore More button */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <button className="flex items-center text-white px-0 py-2 font-medium">
          {/* Button content can be added here if needed */}
        </button>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const [textRef, textInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

 // Sample service data
const services = [
  {
    id: 1,
    image: "/details/Details (1).png",
    title: "Surveillance Cameras",
    description: "High-quality surveillance cameras from Toshiba for reliable security solutions."
  },
  {
    id: 2,
    image: "/details/Details (2).png",
    title: "NVR/DVR Solutions",
    description: "Reliable Dahua solutions for seamless monitoring and recording."
  },
  {
    id: 3,
    image: "/details/Details (3).png",
    title: "Entry Management",
    description: "Secure entry management systems powered by UNV for controlled access."
  },
  {
    id: 4,
    image: "/details/Details (4).png",
    title: "Communication",
    description: "Advanced communication solutions from UNV for efficient connectivity."
  },
  {
    id: 5,
    image: "/details/Details (5).png",
    title: "AI Network Cameras",
    description: "Smart AI-powered network cameras from UNV for intelligent surveillance."
  },
  {
    id: 6,
    image: "/details/Details (6).png",
    title: "Security Accessories",
    description: "Complete range of Hikvision security accessories to support all installations."
  }
];


  return (
    <div className="max-w-6xl mx-auto px-4 py-24 md:py-32">
      {/* Centered text with animation */}
      <motion.div 
        ref={textRef}
        initial={{ opacity: 0, y: 30 }}
        animate={textInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-center text-center mb-16"
      >
        <div className="max-w-4xl">
          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-600 leading-relaxed">
           We are an independent company and the authorized distributor of UNV products across the <span className="text-blue-500">UAE, Saudi and Baharain</span>.
          </p>
        </div>
      </motion.div>

      {/* 6-image grid with explore buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;