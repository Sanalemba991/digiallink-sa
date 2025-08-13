'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
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
  MicVocal
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Audio = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Refs for sections
  const overviewRef = useRef<HTMLElement>(null);
  const solutionsRef = useRef<HTMLElement>(null);

  // Intersection Observer hooks
  const { ref: bannerRef, inView: bannerInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: solutionsInViewRef, inView: solutionsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Function to scroll to specific section
  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    
    const sectionRefs = {
      overview: overviewRef,
      solutions: solutionsRef
    };
    
    const targetRef = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (targetRef && targetRef.current) {
      // Offset for sticky nav
      const navHeight = 80;
      const elementPosition = targetRef.current.offsetTop - navHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll spy for active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'overview', ref: overviewRef },
        { id: 'solutions', ref: solutionsRef }
      ];

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tab navigation data
  const tabData = [
    { id: 'overview', label: 'Overview', icon: Monitor },
    { id: 'solutions', label: 'Solutions', icon: Settings }
  ];

  // Solutions by category
  const solutionCategories = [
    {
      title: 'Audio Visual Systems Integration',
      subtitle: 'Complete AV Solutions',
      description: 'Comprehensive audio and visual systems integration capabilities including projection systems, speakers, microphones, and integrated control systems.',
      solutions: [
        'Projection Systems',
        'Loud Speakers & Microphones', 
        'Integrated Control Systems',
        'Digital Signage Systems',
        'Discussion & Voting Systems'
      ],
      image: '/audio/aduio.png'
    },
    {
      title: 'Video Conferencing Solutions UAE',
      subtitle: 'Professional Communication',
      description: 'Professional 4K video conferencing solutions from desk setups to large meeting rooms, compatible with Zoom, Microsoft Teams, and Skype for Business.',
      solutions: [
        '4K Logitech USB Webcams',
        'Logitech MeetUp Cameras',
        'Pan/Tilt/Zoom Systems',
        'Built-in Audio Solutions',
        'Multi-Platform Compatibility'
      ],
      image: '/audio/audio1.png'
    },
    {
      title: 'Smart Conference Room Solutions',
      subtitle: 'Intelligent Collaboration',
      description: 'Transform your meeting spaces with smart displays, interactive whiteboards, and advanced audio systems for enhanced collaboration and productivity.',
      solutions: [
        'Smart Interactive Displays',
        'Interactive Whiteboards',
        'Conference Audio Systems',
        'Wireless Presentation Tools',
        'Room Booking Systems'
      ],
      image: '/audio/audio2.png'
    },
    {
      title: 'Command & Control Rooms',
      subtitle: 'Mission-Critical Operations',
      description: 'Advanced control room solutions for operations centers, broadcast studios, and mission-critical environments with reliable, fail-safe systems.',
      solutions: [
        'Video Wall Systems',
        'Command Center Audio',
        'Control Room Furniture',
        '24/7 Operation Support',
        'Redundant System Design'
      ],
      image: '/audio/audio3.png'
    }
  ];

  // Project types
  const projectTypes = [
    'Operations Centers', 'Classroom/Presentation Rooms', 'Auditoriums', 'Boardrooms',
    'Museums', 'Lecture Halls', 'Courtrooms', 'Theaters', 'Control Rooms', 
    'Broadcast Studios', 'Worship Centers', 'Recording Studios', 'Theme Parks',
    'Exhibition Centers', 'Retail Stores', 'Corporate Lobbies', 'Sports Arenas and Stadiums'
  ];

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

  const scaleUp: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.42, 0, 1, 1] }
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

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section - Mobile Optimized */}
      <motion.section
        ref={bannerRef}
        className="relative py-8 md:py-12 lg:py-20 bg-gradient-to-br from-cyan-900  to-blue-800 overflow-hidden"
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
            ease: [0.25, 0.46, 0.45, 0.94] as any
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
            ease: [0.42, 0, 1, 1] as any
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
                  Premium AV Solutions
                </motion.div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 md:mb-4 lg:mb-6">
                  Audio & Visual <span className='text-blue-500'>Solutions Provider In Dubai</span>
                </h1>
                <p className="text-sm md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                  Enhance your space with premium Audio & Visual Solutions. From immersive sound systems to stunning video displays, we provide tailor-made AV solutions for an unforgettable experience.
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
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Audio Visual Solutions Technology"
                className="w-full h-48 md:h-64 lg:h-80 xl:h-96 object-cover rounded-xl md:rounded-2xl shadow-2xl"
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Navigation Tabs - Mobile Optimized */}
      <motion.section 
        className="bg-white border-b sticky top-0 z-40 backdrop-blur-sm bg-white/95 overflow-hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        
      </motion.section>

      {/* Overview Section - Mobile Optimized */}
      <section ref={overviewRef} className="py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Key Benefits */}
          <motion.div 
            ref={benefitsRef}
            className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 overflow-hidden"
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <motion.div 
              className="text-center mb-6 md:mb-8" 
              variants={fadeInUp}
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
                Why Choose Our AV <span className='text-blue-500'>Solutions</span>?
              </h2>
              <p className="text-lg text-gray-600">Your ultimate destination for innovative solutions designed to revolutionize modern infrastructure</p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 overflow-hidden"
              initial="hidden"
              animate={benefitsInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              {[
                {
                  icon: Monitor,
                  title: "Smart Displays",
                  description: "High-definition, interactive displays with intuitive touch control and exceptional image quality for enhanced collaboration",
                  color: "bg-purple-600"
                },
                {
                  icon: Presentation,
                  title: "Interactive Whiteboards", 
                  description: "Transform presentations with real-time collaboration and idea sharing, empowering teams to work more effectively",
                  color: "bg-blue-600"
                },
                {
                  icon: Volume2,
                  title: "Advanced Audio Systems",
                  description: "Crystal-clear sound quality with conference systems, public address systems, and professional audio equipment",
                  color: "bg-indigo-600"
                }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div 
                    key={index}
                    className="text-center overflow-hidden"
                    variants={scaleUp}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className={`w-12 h-12 md:w-16 md:h-16 ${benefit.color} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5 md:mb-2">{benefit.title}</h3>
                    <p className="text-sm md:text-base text-gray-600">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Project Types Section */}
            
          </motion.div>
        </div>
      </section>

      {/* Solutions Section - Mobile Optimized */}
      <section ref={solutionsRef} className="py-8 md:py-12 lg:py-16 bg-gray-50 overflow-hidden">
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Our <span className='text-blue-500'>Solutions</span></h2>
              <p className="text-lg md:text-xl text-gray-600">Comprehensive Audio & Visual Solutions for Various Sectors</p>
            </motion.div>

            <div className="space-y-8 md:space-y-12 lg:space-y-16 overflow-hidden">
              {solutionCategories.map((category, index) => (
                <motion.div 
                  key={index} 
                  className={`grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center overflow-hidden ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.div 
                    className={`space-y-4 md:space-y-6 overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}
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
                          <span className="text-sm md:text-base text-gray-700">{solution}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className={`overflow-hidden ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
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
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Get Your Custom Quote</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Ready to transform your space with premium Audio & Visual solutions? Let our experts design the perfect AV system for your needs.
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

export default Audio;