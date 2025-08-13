"use client";
import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Variants } from "framer-motion";

import {
  Check,
  Shield,
  Camera,
  Users,
  TrendingUp,
  Eye,
  Lock,
  BarChart3,
  Building,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  MapPin,
  Clock,
  DollarSign,
  Activity,
  Zap,
  Target,
  UserCheck,
  Package,
  Phone,
  Info,
  Car,
  Navigation,
  Lightbulb,
  Wifi,
  Globe,
  Monitor,
  Database,
  Settings,
  ChevronRight,
  FileText,
  Download,
  ExternalLink,
  Factory,
  Wrench,
  Cpu,
  HardHat,
  Smartphone,
  Code,
  Search,
  Cloud,
  Network,
  Volume2,
  Mic,
  Video,
  Presentation,
  Speaker,
  Radio,
  Tv,
  Projector,
  Headphones,
  Film,
  MicVocal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ElevatorELVSolutions = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Refs for sections
  const overviewRef = useRef<HTMLElement>(null);
  const solutionsRef = useRef<HTMLElement>(null);

  // Intersection Observer hooks
  const { ref: bannerRef, inView: bannerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: benefitsRef, inView: benefitsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: solutionsInViewRef, inView: solutionsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Function to scroll to specific section
  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);

    const sectionRefs = {
      overview: overviewRef,
      solutions: solutionsRef,
    };

    const targetRef = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (targetRef && targetRef.current) {
      // Offset for sticky nav
      const navHeight = 80;
      const elementPosition = targetRef.current.offsetTop - navHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  // Handle scroll spy for active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "overview", ref: overviewRef },
        { id: "solutions", ref: solutionsRef },
      ];

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (
          section.ref.current &&
          section.ref.current.offsetTop <= scrollPosition
        ) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tab navigation data
  const tabData = [
    { id: "overview", label: "Overview", icon: Monitor },
    { id: "solutions", label: "Solutions", icon: Settings },
  ];

  // Solutions by category
  const solutionCategories = [
   
    {
      title: "Ascend with Our Expertise",
      subtitle: "Professional Communication",
      description:
        "Professional 4K video conferencing solutions from desk setups to large meeting rooms, compatible with Zoom, Microsoft Teams, and Skype for Business.",
      solutions: [
        "Elevator Installation: From concept to completion, our team is equipped to handle installations for residential, commercial, and industrial projects.",
        "Maintenance & Repairs: A dedicated 24/7 helpline and team ensure any hiccups in operations are addressed immediately, reducing downtime.",
        "Modernization: Giving a fresh lease of life to older elevator systems, we upgrade them to match current technological and safety standards.",
        "Consultation: Our team of experts assists architects, builders, and homeowners in selecting the right elevator system, ensuring optimal performance and aesthetics.",
      ],
      image: "/elv/ban (1).png",
    },
    {
      title: "Smart Conference Room Solutions",
      subtitle: "Intelligent Collaboration",
      description:
        "Transform your meeting spaces with smart displays, interactive whiteboards, and advanced audio systems for enhanced collaboration and productivity.",
      solutions: [
        "Unparalleled Expertise: Harnessing years of experience in the ELV industry, our team ensures that every project is executed with precision and dedication.",
        "Cutting-Edge Technology: We constantly update our offerings with the latest in elevator technology, guaranteeing smooth and fast transportation.",
        "Safety First: Adhering to international and local safety standards, we prioritize the safety and well-being of our passengers above all.",
        "Customized Solutions: Every building is unique, and so are our elevator solutions. Tailored to fit the specific needs of each project, we deliver bespoke elevator systems.",
        "Reliable After-sales Service: Our commitment doesnt end after installation. With a robust maintenance and support team, we ensure your elevators run seamlessly day in and day out.",
      ],
      image: "/elv/ban (2).png",
    },
  ];

  // Project types
  const projectTypes = [
    "Operations Centers",
    "Classroom/Presentation Rooms",
    "Auditoriums",
    "Boardrooms",
    "Museums",
    "Lecture Halls",
    "Courtrooms",
    "Theaters",
    "Control Rooms",
    "Broadcast Studios",
    "Worship Centers",
    "Recording Studios",
    "Theme Parks",
    "Exhibition Centers",
    "Retail Stores",
    "Corporate Lobbies",
    "Sports Arenas and Stadiums",
  ];

  // Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" // Use one of the predefined easing strings
    }
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

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Mobile Optimized */}
      <motion.section
        ref={bannerRef}
        className="relative py-8 md:py-12 lg:py-20 bg-gradient-to-br from-cyan-900 to-blue-800 overflow-hidden"
        initial="hidden"
        animate={bannerInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-black/20" />

        {/* Animated background elements - Hidden on mobile */}
        <motion.div
          className="absolute top-10 left-10 md:top-20 md:left-20 w-32 h-32 md:w-72 md:h-72 bg-purple-600/10 rounded-full blur-3xl hidden md:block"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
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
            ease: "easeInOut",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <motion.div
              className="space-y-4 md:space-y-6 lg:space-y-8 overflow-hidden"
              initial="hidden"
              animate={bannerInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <motion.div
                  className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-300 text-xs md:text-sm font-medium mb-4 md:mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Video className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                 Our ELV solutions
                </motion.div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 md:mb-4 lg:mb-6">
                 ELV Company In <span className="text-blue-500">Dubai</span>
                </h1>
                <p className="text-sm md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                 Specializing in Extra Low Voltage (ELV) systems, our company delivers integrated solutions for security, communication, and automation.
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
                src="/elv/banner.png"
                alt="Audio Visual Solutions Technology"
                className="w-full h-48 md:h-64 lg:h-80 xl:h-96 object-cover rounded-xl md:rounded-2xl shadow-2xl"
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Feature Section */}
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 my-16">
  <div className="flex flex-col lg:flex-row gap-16 items-center relative">
    {/* Center Vertical Line - Now properly centered and full height */}
    <div className="hidden lg:block absolute left-1/2 top-0 h-full w-px bg-gray-200 -translate-x-1/2"></div>

    {/* Left Content - Text */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full lg:w-1/2 space-y-8"
    >
      <div className="inline-block px-4 py-2 text-blue-600 rounded-full text-sm font-medium mb-4">
        Elevating Dubai's Skyline
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Discover the <span className="text-blue-600">Pinnacle</span> of
        Vertical Transportation
      </h1>

      <p className="text-xl text-gray-600 leading-relaxed">
        At <span className="font-bold text-blue-600">DigitalLink</span>,
        we blend state-of-the-art technology with innovative design to
        elevate the standard of vertical transportation in Dubai.
        Experience the merger of safety, luxury, and efficiency as we
        redefine the way you move.
      </p>
    </motion.div>

    {/* Right Content - Checklist */}
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full lg:w-1/2 "
    >
      <ul className="space-y-6">
        {[
          "Unparalleled Expertise",
          "Cutting-Edge Technology",
          "Safety First",
          "Customized Solutions",
          "Reliable After-sales Service",
        ].map((text, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
            className="flex items-start"
          >
           <div className="flex-shrink-0 mt-1 mr-4 text-blue-600">
  <Check className="w-6 h-6" />
</div>


            <div>
              <span className="text-lg font-semibold text-gray-800">
                {text}
              </span>
             
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  </div>
</div>

      {/* Solutions Section - Mobile Optimized */}
      <section
        ref={solutionsRef}
        className="py-8 md:py-12 lg:py-16 bg-gray-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <motion.div
            ref={solutionsInViewRef}
            initial="hidden"
            animate={solutionsInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="overflow-hidden"
          >
            <motion.div
              className="text-center mb-8 md:mb-12 overflow-hidden"
              variants={fadeInUp}
              initial="hidden"
              animate={solutionsInView ? "visible" : "hidden"}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
                       Our Services
              </h2> 
              <p className="text-lg md:text-xl text-blue-600">
              Digitallink
              </p>
            </motion.div>

            <div className="space-y-8 md:space-y-12 lg:space-y-16 overflow-hidden">
              {solutionCategories.map((category, index) => (
                <motion.div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center overflow-hidden ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.div
                    className={`space-y-4 md:space-y-6 overflow-hidden ${
                      index % 2 === 1 ? "lg:col-start-2" : ""
                    }`}
                    initial="hidden"
                    whileInView="visible"
                    variants={index % 2 === 0 ? slideInLeft : slideInRight}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="overflow-hidden">
                      <motion.p
                        className="text-xs md:text-sm font-medium text-blue-600 uppercase tracking-wide mb-1.5 md:mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        {category.subtitle}
                      </motion.p>
                      <motion.h3
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        {category.title}
                      </motion.h3>
                      <motion.p
                        className="text-sm md:text-base lg:text-lg text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        {category.description}
                      </motion.p>
                    </div>

                    <motion.div
                      className="space-y-2 md:space-y-3 overflow-hidden"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {category.solutions.map((solution, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center overflow-hidden"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0" />
                          <span className="text-sm md:text-base text-gray-700">
                            {solution}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className={`overflow-hidden ${
                      index % 2 === 1 ? "lg:col-start-1" : ""
                    }`}
                    initial="hidden"
                    whileInView="visible"
                    variants={index % 2 === 0 ? slideInRight : slideInLeft}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <motion.img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-xl md:rounded-2xl shadow-2xl"
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Modal - Mobile Optimized */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              className="relative max-w-4xl w-full bg-white rounded-lg md:rounded-2xl overflow-hidden p-6 md:p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 z-10 text-lg md:text-xl"
                onClick={() => setIsVideoPlaying(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Get Your Custom Quote
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Ready to transform your space with premium Audio & Visual
                  solutions? Let our experts design the perfect AV system for
                  your needs.
                </p>
                <div className="space-y-4">
                  <motion.button
                    className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request Free Consultation
                  </motion.button>
                  <motion.button
                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Download Brochure
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElevatorELVSolutions;
