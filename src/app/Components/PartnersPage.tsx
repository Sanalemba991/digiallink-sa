"use client";
import Image from "next/image";
import React from "react";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.42, 0, 1, 1] },
  },
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

const PartnersPage = () => {
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
            ease: [0.25, 0.46, 0.45, 0.94],
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
            ease: [0.42, 0, 1, 1],
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
                  We are proud to work with some of the most well-known brands
                  in the world.
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
            {/* Partner 1: Storage */}
            <motion.div
              className="bg-white rounded-lg shadow-none overflow-hidden"
              variants={itemVariants}
              custom={0.5}
            >
              <div className="flex flex-col md:flex-row">
                {/* Logo Section */}
                <div className="w-full md:w-72 bg-gray-50 flex items-center justify-center p-6 min-h-[160px]">
                 <div className="grid grid-cols-2 gap-4">
                  <img
                    src="/partnerstorage/unv.svg"
                    alt="Pubx and Switches Partner Logo 1"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnerstorage/western.svg"
                    alt="Pubx and Switches Partner Logo 2"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnerstorage/seagate.png"
                    alt="Pubx and Switches Partner Logo 3"
                    className="w-full h-16 object-contain"
                  />
                 
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Storage
                  </h3>

                  {/* Contact Information in Columns */}
                  <div className="space-y-3 mb-4"></div>

                  {/* Company Profile */}
                  <div className="flex flex-col">
                    <p className="text-gray-700 leading-relaxed text-sm">
                     We collaborate with industry leaders in surveillance and data storage—such as Hikvision, Axis Communications, Bosch, Western Digital, Seagate, and Synology—to deliver comprehensive security and data management solutions. From advanced CCTV cameras, video analytics, and thermal imaging systems to high-performance SSDs, HDDs, and NAS storage, our partners provide the cutting-edge technology that keeps businesses and communities safe. With real-time monitoring, smart analytics, and reliable data storage, we empower our clients to protect their assets, ensure data accuracy, and support continued growth and success.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <hr className="my-8 border-gray-200" />

            {/* Partner 2: Pubx and Switches */}
            <motion.div
              className="bg-white rounded-lg shadow-none overflow-hidden"
              variants={itemVariants}
              custom={0.5}
            >
              <div className="flex flex-col md:flex-row">
                {/* Logo Section */}
                <div className="w-full md:w-72 bg-gray-50 flex items-center justify-center p-6 min-h-[160px]">
                  <div className="grid grid-cols-2 gap-4">
                  <img
                    src="/partnerspubx/ewind.png"
                    alt="Pubx and Switches Partner Logo 1"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnerspubx/grand.png"
                    alt="Pubx and Switches Partner Logo 2"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnerspubx/megvi.png"
                    alt="Pubx and Switches Partner Logo 3"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnerspubx/ruije.svg"
                    alt="Pubx and Switches Partner Logo 4"
                    className="w-full h-16 object-contain"
                  />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Pubx and Switches
                  </h3>

                  {/* Contact Information in Columns */}
                  <div className="space-y-3 mb-4"></div>

                  {/* Company Profile */}
                  <div className="flex flex-col">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      We have forged partnerships with leading access control companies to provide advanced security solutions. Our collaborations enable us to offer a range of access control options, including biometric, card-based, and mobile solutions, ensuring the safety of our clients' critical infrastructure and facilities. These systems not only secure sensitive areas but also facilitate efficient people management, contributing to the smooth and safe execution of operations.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <hr className="my-8 border-gray-200" />

            {/* Partner 3: Information Technology */}
            <motion.div
              className="bg-white rounded-lg shadow-none overflow-hidden"
              variants={itemVariants}
              custom={0.5}
            >
               <div className="flex flex-col md:flex-row">
                {/* Logo Section */}
                <div className="w-full md:w-72 bg-gray-50 flex items-center justify-center p-6 min-h-[160px]">
                  <div className="grid grid-cols-2 gap-4">
                  <img
                    src="/partnersaudio/bose.svg"
                    alt="Pubx and Switches Partner Logo 1"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnersaudio/qsc.svg"
                    alt="Pubx and Switches Partner Logo 2"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnersaudio/shure.png"
                    alt="Pubx and Switches Partner Logo 3"
                    className="w-full h-16 object-contain"
                  />
                 
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Information Technology
                  </h3>

                  {/* Contact Information in Columns */}
                  <div className="space-y-3 mb-4"></div>

                  {/* Company Profile */}
                  <div className="flex flex-col">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Leading industry players are among our IT partners, collaborating with us to provide companies with state-of-the-art services such as cloud computing, network infrastructure, and cybersecurity. Through these strategic alliances, we have been able to offer seamless digital experiences, enhance operational efficiency, and ensure the digital safety of our clients.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <hr className="my-8 border-gray-200" />

            {/* Partner 4: Audio and Visual */}
            <motion.div
              className="bg-white rounded-lg shadow-none overflow-hidden"
              variants={itemVariants}
              custom={0.5}
            >
              <div className="flex flex-col md:flex-row">
                {/* Logo Section */}
                <div className="w-full md:w-72 bg-gray-50 flex items-center justify-center p-6 min-h-[160px]">
                  <div className="grid grid-cols-3 gap-4">
                   <img
                    src="/partnersaudio/bose.svg"
                    alt="Pubx and Switches Partner Logo 1"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnersaudio/qsc.svg"
                    alt="Pubx and Switches Partner Logo 2"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnersaudio/shure.png"
                    alt="Pubx and Switches Partner Logo 3"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnerstechnology/epson.svg"
                    alt="Pubx and Switches Partner Logo 2"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnerstechnology/furman.png"
                    alt="Pubx and Switches Partner Logo 3"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnerstechnology/neutrik.svg"
                    alt="Audio Visual Partner Logo 4"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnerstechnology/ronald.png"
                    alt="Audio Visual Partner Logo 5"
                    className="w-full h-16 object-contain"
                  />
                  <img
                    src="/partnerstechnology/babrco.svg"
                    alt="Audio Visual Partner Logo 6"
                    className="w-full h-16 object-contain"
                  />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Audio and Visual
                  </h3>

                  {/* Contact Information in Columns */}
                  <div className="space-y-3 mb-4"></div>

                  {/* Company Profile */}
                  <div className="flex flex-col">
                    <p className="text-gray-700 leading-relaxed text-sm">
                      Leading industry players are among our IT partners, collaborating with us to provide companies with state-of-the-art services such as cloud computing, network infrastructure, and cybersecurity. Through these strategic alliances, we have been able to offer seamless digital experiences, enhance operational efficiency, and ensure the digital safety of our clients.
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
                Ready to join our partner network? Contact us today to learn
                more about partnership opportunities and how we can help grow
                your business together.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} custom={0.9}>
              <a
                href="mailto:"
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold text-base rounded-full transition-all duration-300 group"
              >
                Contact Partnership Team
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default PartnersPage;