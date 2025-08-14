"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HomeContact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full py-16 px-6 overflow-hidden"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/banner/footerhome.png')"
        }}
      >
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0  bg-opacity-40"></div>
      </div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          variants={itemVariants}
        >
          Where to <span className='text-blue-500'>Buy</span>
        </motion.h2>
        
        <motion.p 
          className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Connect with local distributors to get genuine Hikvision products, expert advice, and
          reliable after-sales support.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <Link
            href="/contact"
            className="inline-block border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 tracking-wider text-sm"
          >
          Contact Us
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HomeContact;