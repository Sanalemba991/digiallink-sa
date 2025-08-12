"use client";
import Image from 'next/image';
import React from 'react';
import { motion, Variants } from 'framer-motion';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.42, 0, 1, 1] }
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const  PartnersPage = () => {
  const bannerRef = React.useRef<HTMLDivElement>(null);
  const [bannerInView, setBannerInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setBannerInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen">
      <motion.section
        ref={bannerRef}
        className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-cyan-900 to-blue-800 overflow-hidden"
        initial="hidden"
        animate={bannerInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-black/20" />
        
        <motion.div 
          className="absolute top-10 left-10 md:top-20 md:left-20 w-32 h-32 md:w-72 md:h-72 bg-purple-600/10 rounded-full blur-3xl hidden md:block"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-48 h-48 md:w-96 md:h-96 bg-blue-600/10 rounded-full blur-3xl hidden md:block"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: [0.42, 0, 1, 1]
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
            <motion.div 
              className="space-y-4 md:space-y-6 lg:space-y-8 overflow-hidden" 
              initial="hidden"
              animate={bannerInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4 md:mb-6">
                  Our Partners
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                 We are proud to work with some of the most well-known brands in the world.
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative overflow-hidden"
              initial="hidden"
              animate={bannerInView ? "visible" : "hidden"}
              variants={slideInRight}
            >
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/partner/banner.png"
                  alt="Partners Banner"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Partners Grid Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center"
            variants={itemVariants}
            custom={0}
          >
            {/* Partnership Information */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Become Our Partner
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Join our growing network of trusted partners and distributors. We offer comprehensive support, 
                training programs, and marketing resources to help you succeed in the security technology market.
              </p>
              
              {/* Partnership Benefits */}
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    icon: (
                      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                      </svg>
                    ),
                    title: "Competitive Margins",
                    description: "Attractive profit margins and volume-based incentives"
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    ),
                    title: "Training & Support",
                    description: "Comprehensive training programs and technical support"
                  },
                  {
                    icon: (
                      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    ),
                    title: "Quality Products",
                    description: "Access to cutting-edge security technology solutions"
                  }
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                    variants={itemVariants}
                    custom={index * 0.3}
                  >
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Partners Listing Section */}
      <motion.section 
        className="py-10 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid gap-6 max-w-5xl mx-auto">
            {/* Partner 1: Lovosis Technology */}
            <motion.div 
              className="bg-white rounded-lg shadow-none overflow-hidden"
              variants={itemVariants}
              custom={0.5}
            >
              <div className="flex flex-col md:flex-row">
                {/* Logo Section */}
                <div className="w-full md:w-72 bg-gray-50 flex items-center justify-center p-6 min-h-[160px]">
                  <img src="/images/partner.png" alt="Lovosis Technology Logo" className="w-full h-32 object-contain" />
                </div>
                
                {/* Content Section */}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Lovosis Technology</h3>
                  
                  {/* Contact Information in Columns */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <span className="font-medium text-gray-600 w-24 text-sm">Tel :</span>
                      <span className="text-gray-800">+971 50 916 2488</span>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="font-medium text-gray-600 w-24 text-sm">Email :</span>
                      <a href="mailto:sales@lovosis.com" className="text-blue-600 hover:text-blue-700 transition-colors">
                        sales@lovosis.com
                      </a>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="font-medium text-gray-600 w-24 text-sm">Web site :</span>
                      <a href="https://lovosis.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                        https://lovosis.com/
                      </a>
                    </div>
                  </div>
                  
                  {/* Company Profile */}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600 mb-2 text-sm">Company Profile :</span>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Lovosis Technology is a leading provider of innovative IT solutions and services, empowering businesses with cutting-edge technology.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <hr className="my-8 border-gray-200" />

            {/* Partner 2: Spottive Technologies */}
            <motion.div 
              className="bg-white rounded-lg shadow-none overflow-hidden"
              variants={itemVariants}
              custom={0.9}
            >
              <div className="flex flex-col md:flex-row">
                {/* Logo Section */}
                <div className="w-full md:w-72 bg-gray-50 flex items-center justify-center p-6 min-h-[160px]">
                  <img src="/images/partner1.png" alt="Spottive Technologies Logo" className="w-full h-32 object-contain" />
                </div>
                
                {/* Content Section */}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Spottive Technologies</h3>
                  
                  {/* Contact Information in Columns */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <span className="font-medium text-gray-600 w-32 text-sm">Tel :</span>
                      <span className="text-gray-800">+971 55 234 1712</span>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="font-medium text-gray-600 w-32 text-sm">Email :</span>
                      <a href="mailto:sales@spottive.com" className="text-blue-600 hover:text-blue-700 transition-colors">
                        sales@spottive.com
                      </a>
                    </div>
                    
                    <div className="flex items-start">
                      <span className="font-medium text-gray-600 w-32 text-sm">Web site :</span>
                      <a href="https://spottive.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                        https://spottive.com/
                      </a>
                    </div>
                  </div>
                  
                  {/* Company Profile */}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600 mb-2 text-sm">Company Profile :</span>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Spottive Technologies specializes in smart solutions and digital transformation for enterprises across various industries.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        id="partner-form"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-xl lg:text-3xl font-bold text-gray-900 mb-12"
              variants={itemVariants}
              custom={0.3}
            >
              INTERESTED IN PARTNERSHIP?
            </motion.h2>
            
            <motion.div 
              className="max-w-3xl mx-auto mb-12"
              variants={itemVariants}
              custom={0.6}
            >
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-6">
                Ready to join our partner network? Contact us today to learn more about partnership opportunities 
                and how we can help grow your business together.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} custom={0.9}>
              <a 
                href="mailto:partners@primotech-llc.com"
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white font-semibold text-base rounded-full transition-all duration-300 group"
              >
                Contact Partnership Team
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default PartnersPage;