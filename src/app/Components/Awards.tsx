"use client";
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

interface HistoryMilestone {
  year: number;
  title: string;
  description: string;
  image?: string;
}

// Animation variants
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

const Awards: React.FC = () => {
  const bannerRef = React.useRef<HTMLDivElement>(null);
  const [bannerInView, setBannerInView] = React.useState(false);
  const timelineRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [activeItems, setActiveItems] = React.useState<boolean[]>([]);

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

  const historyMilestones: HistoryMilestone[] = [
    {
      year: 2018,
      title: "National Distributor",
      description: "UNIVIEW",
      image: "/award/award.png"
    },
    { 
      year: 2019,
      title: "PLATINUM RESELLER",
      description: "DAHUA TECHNOLOGY",
      image: "/award/award.png"
    },
    {
      year: 2019,
      title: "DAHUA TECHNOLOGY",
      description: "DAHUA TECHNOLOGY",
      image: "/award/award.png"
    },
    {
      year: 2021,
      title: "10ᵗʰ anniversary",
      description: "UNIVIEW",
      image: "/award/award.png"
    },
    {
      year: 2021,
      title: "NATIONAL DISTRIBUTOR",
      description: "UNIVIEW",
      image: "/award/award.png"
    },
     {
      year: 2022,
      title: "SYNERGY AWARD",
      description: "DAHUA TECHNOLOGY",
      image: "/award/award.png"
    },
     {
      year: 2022,
      title: "DIAMOND PARTNER",
      description: "WESTERN DIGITAL",
      image: "/award/award.png"
    },
    {
      year: 2022,
      title: "Service Certification",
      description: "UNIVIEW",
      image: "/award/award.png"
    },
    {
      year: 2022,
      title: "DIAMOND PARTNER",
      description: "DAHUA TECHNOLOGY",
      image: "/award/award.png"
    },
    {
      year: 2023,
      title: "NATIONAL DISTRIBUTOR",
      description: "UNIVIEW",
      image: "/award/award.png"
    }
  ];

  React.useEffect(() => {
    timelineRefs.current = timelineRefs.current.slice(0, historyMilestones.length);
    setActiveItems(new Array(historyMilestones.length).fill(false));

    const observers = historyMilestones.map((_, index) => {
      return new IntersectionObserver(
        ([entry]) => {
          setActiveItems(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        },
        { 
          threshold: 0.2,
          rootMargin: "50px"
        }
      );
    });

    timelineRefs.current.forEach((ref, index) => {
      if (ref && observers[index]) {
        observers[index].observe(ref);
      }
    });

    return () => {
      observers.forEach((observer, index) => {
        if (timelineRefs.current[index]) {
          observer.unobserve(timelineRefs.current[index]!);
        }
      });
    };
  }, []);

  return (
    <>
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
                 Awards
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                  Our unwavering dedication to our clients' success has paid off – we're thrilled to announce that our digital marketing efforts have been recognized with both a nomination and an award. At our core, we strive for excellence in everything we do, and we're grateful for the opportunity to put that commitment into practice for our clients every day.
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
                  src="/award/Banner.png"
                  alt="Audio Visual Solutions Technology"
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

      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="text-center mb-8 mt-12 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            Our Journey
            <div className="absolute -bottom-2 left-0 right-0">
              <div className="h-1 bg-blue-600 w-full"></div>
              <div className="h-1 bg-blue-400 w-2/3 mx-auto mt-1"></div>
            </div>
          </h2>
        </div>

        {/* Timeline Section */}
        <section className="py-12 md:py-16 lg:py-24  relative mb-10">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Mobile timeline line */}
            <div className="absolute left-6 sm:left-8 md:hidden w-1 h-full top-0 "></div>

            {/* Desktop timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full top-0 w-[2px] bg-gray-200">
              <div className="sticky top-1/2 w-full h-full">
                <div className="absolute w-full h-full bg-gray-200 origin-top" />
              </div>
            </div>

            <div className="max-w-5xl mx-auto relative">
              {historyMilestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  ref={el => { if (el) timelineRefs.current[index] = el; }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20 md:mb-32 items-center relative"
                  initial="hidden"
                  animate={activeItems[index] ? "visible" : "hidden"}
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      y: 100
                    },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        duration: 1.2,
                        ease: "easeOut",
                        delay: index * 0.1
                      }
                    }
                  }}
                >
                  {/* Timeline dot */}
                  <div className={`absolute ${index % 2 === 0 ? 'md:left-1/2' : 'md:left-1/2'} left-6 sm:left-8 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10`}>
                    <motion.div
                      className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-4 ${
                        activeItems[index] ? 'bg-blue-600 border-blue-200' : 'bg-gray-200 border-gray-300'
                      }`}
                      animate={{
                        scale: activeItems[index] ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Mobile layout (always image first) */}
                  <div className="md:hidden">
                    {milestone.image && (
                      <motion.div
                        className="relative h-56 sm:h-64 w-full rounded-lg overflow-hidden shadow-lg mb-6"
                        variants={{
                          hidden: { opacity: 0, y: 50 },
                          visible: { 
                            opacity: 1, 
                            y: 0,
                            transition: {
                              duration: 1.5,
                              ease: "easeOut",
                              delay: (index * 0.1) + 0.2
                            }
                          }
                        }}
                      >
                        <Image
                          src={milestone.image}
                          alt={milestone.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Desktop layout (alternating sides) */}
                  <div className={`hidden md:block ${index % 2 === 0 ? 'md:order-1 md:pr-16' : 'md:order-2 md:pl-16'}`}>
                    {milestone.image && (
                      <motion.div
                        className="relative h-72 w-full  overflow-hidden  p-4"
                        variants={{
                          hidden: { 
                            opacity: 0, 
                            x: index % 2 === 0 ? -100 : 100
                          },
                          visible: { 
                            opacity: 1, 
                            x: 0,
                            transition: {
                              duration: 1.5,
                              ease: "easeOut",
                              delay: (index * 0.1) + 0.2
                            }
                          }
                        }}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={milestone.image}
                            alt={milestone.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <motion.div
                    className={`${
                      index % 2 === 0 
                        ? 'md:order-2 md:pl-16 text-left' 
                        : 'md:order-1 md:pr-16 text-left md:text-right'
                    } space-y-4 md:space-y-6`}
                    variants={{
                      hidden: { 
                        opacity: 0, 
                        x: index % 2 === 0 ? 100 : -100
                      },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: {
                          duration: 1.5,
                          ease: "easeInOut",
                          delay: (index * 0.1) + 0.4
                        }
                      }
                    }}
                  >
                    <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-600 mb-4">{milestone.year}</div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{milestone.title}</h3>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{milestone.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Awards;