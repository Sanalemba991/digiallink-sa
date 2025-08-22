"use client";
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from "next/navigation";

import { useInView } from "react-intersection-observer";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const DigitalLinkHistory: React.FC = () => {
  const bannerRef = React.useRef<HTMLDivElement>(null);
  const [bannerInView, setBannerInView] = React.useState(false);
  const timelineRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [activeItems, setActiveItems] = React.useState<boolean[]>([]);
  const router = useRouter();

  // Moved useInView hook inside the component
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

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
      year: 2010,
      title: "THE COMPANY WAS ESTABLISHED",
      description: "We started as the OEM surveillance distribution in the region.",
      image: "/history/history (11).png"
    },
    {
      year: 2012,
      title: "EXPANDING AUDIO/VIDEO SOLUTIONS IN THE UAE",
      description: "Introducing OEM Communication and Fabrication Technology for the Market",
      image: "/history/history (4).png"
    },
    {
      year: 2018,
      title: "NATIONAL DISTRIBUTOR OF UNIVIEW",
      description: "We Became a National Distributor Of Uniview",
      image: "/history/history (3).png"
    },
    {
      year: 2022,
      title: "DIAMOND PARTNER OF WD",
      description: "We Won The Diamond Partner Award From Western Digital",
      image: "/history/history (2).png"
    },
    {
      year: 2024,
      title: "DIAMOND PARTNER OF DAHUA",
      description: "We Won The Diamond Partner Award From Dahua Technology",
      image: "/history/history (1).png"
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
                  Overview and History of <span className='text-blue-500'>Digital Link Technology LLC</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                  Our unwavering dedication to our clients' success has paid off - we're thrilled to announce that our digital marketing efforts have been recognized with both a nomination and an award.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative overflow-hidden"
              initial="hidden"
              animate={bannerInView ? "visible" : "hidden"}
              variants={slideInRight}
            >
              <motion.img
                src="/history/Banner.png"
                alt="Audio Visual Solutions Technology"
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-xl shadow-2xl"
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="text-center mb-8 mt-12 px-4">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6 tracking-tight leading-tight font-sans">
            Our <span className="text-blue-600">Journey</span>
          </h2>
        </div>

        {/* Timeline Section */}
        <section className="py-12 md:py-16 lg:py-24 bg-white relative">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Desktop timeline line - hidden on mobile */}
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
                        delay: index * 0.3
                      }
                    }
                  }}
                >
                  {/* Timeline dot - hidden on mobile */}
                  <div className="hidden md:block absolute md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      className={`w-6 h-6 rounded-full border-4 ${activeItems[index] ? 'bg-blue-600 border-blue-200' : 'bg-gray-200 border-gray-300'
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
                              delay: (index * 0.3) + 0.2
                            }
                          }
                        }}
                      >
                        <Image
                          src={milestone.image}
                          alt={milestone.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Desktop layout (alternating sides) */}
                  <div className={`hidden md:block ${index % 2 === 0 ? 'md:order-1 md:pr-16' : 'md:order-2 md:pl-16'}`}>
                    {milestone.image && (
                      <motion.div
                        className="relative h-72 w-full rounded-xl overflow-hidden shadow-lg"
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
                              delay: (index * 0.3) + 0.2
                            }
                          }
                        }}
                      >
                        <Image
                          src={milestone.image}
                          alt={milestone.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Content */}
                  <motion.div
                    className={`${index % 2 === 0
                      ? 'md:order-2 md:pl-16 text-left'
                      : 'md:order-1 md:pr-16 text-left md:text-right'
                      } space-y-4 md:space-y-6`}
                    variants={{
                      hidden: {
                        opacity: 0,
                        // Disable x animation on mobile, only use y
                        y: 50
                      },
                      visible: {
                        opacity: 1,
                        // Disable x animation on mobile, only use y
                        y: 0,
                        transition: {
                          duration: 1.5,
                          ease: "easeInOut",
                          delay: (index * 0.3) + 0.4
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

        {/* New Strategy Section */}
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div
              ref={ref}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Image Section */}
              <motion.div
                className="relative"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={imageVariants}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                    alt="Team collaboration and strategy meeting"
                    className="w-full h-full object-cover aspect-[4/3]"
                  />
                </div>
              </motion.div>

              {/* Content Section */}
              <motion.div
                className="space-y-6"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} >
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Build Your Future With{" "}
                    <span className="block text-blue-600">Our Team</span>
                  </h2>

                </motion.div>

                <motion.div className="space-y-4" variants={itemVariants}>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    At Renaissance, we believe our people are our greatest strength.
                    We are always looking for passionate, creative, and driven individuals
                    to join our team. Whether you are just starting your career or bringing
                    years of expertise, we offer an environment that encourages learning,
                    growth, and innovation. Together, we build impactful solutions and shape
                    the future of the digital world. Be a part of our journey—your career
                    starts here.
                  </p>

                </motion.div>

                <motion.div className="pt-4" variants={itemVariants}>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => router.push("/careers")}
                      className="w-full text-left text-sm font-semibold tracking-[0.15em] text-gray-800 uppercase pb-3 mb-2 relative bg-transparent cursor-pointer transition-colors duration-500 hover:text-blue-400 focus:outline-none"
                      style={{ background: "none" }}
                    >
                      Explore Careers
                    </button>

                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-1000 delay-700 ${inView ? 'w-full' : 'w-0'
                      }`}></div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DigitalLinkHistory;