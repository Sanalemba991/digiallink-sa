import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface Partner {
  name: string;
  logoType: string;
  imagePath: string;
}

const PartnersSection = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = ["OUR", "PARTNERS", "TRUSTED BY INDUSTRY LEADERS WORLDWIDE"];

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    const speed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => {
            if (currentTextIndex < texts.length - 1) {
              setIsDeleting(true);
            }
          }, 1500);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentFullText.substring(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, currentTextIndex, isDeleting, texts]);

  const partners: Partner[] = [
    { name: "UNV", logoType: "image", imagePath: "/details/unv.png" },
    { name: "Toshiba", logoType: "image", imagePath: "/details/toshiba.png" },
    { name: "Imou", logoType: "image", imagePath: "/details/imou.png" },
    { name: "Ewind", logoType: "image", imagePath: "/details/ewind.png" },
    { name: "Dahua", logoType: "image", imagePath: "/details/dahua.png" },
    { name: "Hikvision", logoType: "image", imagePath: "/details/hikvision.png" },
    { name: "Uniarch", logoType: "image", imagePath: "/details/uniarch.png" },
  ];

  // Animation variants for the left content area
  const containerVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-gray-50 py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left side - Content with Framer Motion */}
          <motion.div
            className="md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight"
              variants={itemVariants}
            >
              We Work With Industry Leaders
            </motion.h2>

            <motion.div className="mb-12" variants={itemVariants}>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our strategic partnerships with top technology providers ensure
                we deliver cutting-edge solutions tailored to your needs.
                Together, we create innovative systems that drive business
                success.
              </p>
            </motion.div>

            <motion.button
              className="border-2 border-gray-900 text-gray-900 px-8 py-3 font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-colors duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW ALL PARTNERS
            </motion.button>
          </motion.div>

          {/* Right side - Stable rotating Partner logos */}
          <div className="md:w-1/2 flex items-center justify-center">
            <div className="relative w-[450px] h-[450px] flex items-center justify-center">
              {/* Rotating container for partner logos */}
              <motion.div
                className="absolute w-full h-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {partners.map((partner, index) => {
                  const angle = (index * (2 * Math.PI)) / partners.length;
                  const radius = 180;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <motion.div
                      key={partner.name}
                      className="absolute w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center p-3 hover:shadow-xl hover:scale-105 transition-all duration-500 border-2 border-gray-50"
                      style={{
                        left: `50%`,
                        top: `50%`,
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      }}
                    >
                      <motion.div
                        // Counter-rotate the content to keep logos upright
                        animate={{
                          rotate: -360,
                        }}
                        transition={{
                          duration: 30,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Image
                          src={partner.imagePath}
                          alt={partner.name}
                          width={48}
                          height={48}
                          className="object-contain"
                          loading="lazy"
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Center piece with typewriter effect - MOVED OUTSIDE rotating container */}
              <motion.div
                className="absolute inset-0 w-48 h-48 bg-transparent rounded-full flex flex-col items-center justify-center z-20 m-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-2xl font-bold text-gray-900 tracking-wide mb-2 min-h-[90px] flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {currentTextIndex < 2 ? (
                      <span>
                        {displayText}
                        <span className="animate-pulse">|</span>
                      </span>
                    ) : (
                      <>
                        <div className="mb-1">OUR</div>
                        <div className="mb-2">PARTNERS</div>
                        <p className="text-xs text-gray-700 leading-relaxed px-3">
                          {displayText}
                          <span className="animate-pulse">|</span>
                        </p>
                      </>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;