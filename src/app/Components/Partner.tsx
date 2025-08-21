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
    { name: "Toshiba", logoType: "image", imagePath: "/details/to.png" },
    { name: "Imou", logoType: "image", imagePath: "/details/imou.png" },
    { name: "Ewind", logoType: "image", imagePath: "/details/ewind.png" },
    { name: "Dahua", logoType: "image", imagePath: "/details/dahua.png" },
    { name: "Hikvision", logoType: "image", imagePath: "/details/hik.png" },
    { name: "Uniarch", logoType: "image", imagePath: "/details/uni.png" },
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
              We Work With <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Industry Leaders</span>
            </motion.h2>

            <motion.div className="mb-12" variants={itemVariants}>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our strategic partnerships with top technology providers ensure
                we deliver cutting-edge solutions tailored to your needs.
                Together, we create innovative systems that drive business
                success.
              </p>
            </motion.div>

            <motion.a
              href="/partner"
              className="border-2 border-blue-500 text-blue-500 rounded-xl px-8 py-3 font-medium tracking-wide hover:bg-blue-500 hover:text-white transition-colors duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW ALL PARTNERS
            </motion.a>

          </motion.div>

          {/* Right side - Stable rotating Partner logos */}
          <div className="md:w-1/2 flex items-center justify-center">
            <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] flex items-center justify-center">
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
                  // Reduce radius for mobile
                  const radius = typeof window !== "undefined" && window.innerWidth < 768 ? 120 : 180;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <motion.div
                      key={partner.name}
                      className="absolute w-14 h-14 md:w-20 md:h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center p-2 md:p-3 hover:shadow-xl hover:scale-105 transition-all duration-500 border-2 border-gray-50"
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
                          width={36}
                          height={36}
                          className="object-contain md:w-12 md:h-12 w-9 h-9"
                          loading="lazy"
                          // Add unoptimized if external domains are not configured
                          
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Center piece with typewriter effect */}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;