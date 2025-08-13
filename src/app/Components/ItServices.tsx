'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Variants } from "framer-motion";
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
  Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ItServices = () => {
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
      title: 'App Development',
      subtitle: 'Cutting-Edge Mobile Solutions',
      description: 'Fully-responsive mobile applications tailored to captivate your target audience and deliver exceptional user experiences across all platforms.',
      solutions: [
        'Native iOS Development',
        'Android App Development',
        'Cross-Platform Solutions',
        'App Store Optimization'
      ],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Web Development & SEO',
      subtitle: 'Enhanced Online Presence',
      description: 'Responsive websites with comprehensive SEO strategies to boost your online visibility and attract quality organic traffic.',
      solutions: [
        'WordPress Development',
        'Static HTML/CSS/JS',
        'Joomla & Bootstrap',
        'Search Engine Optimization'
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Networking Solutions',
      subtitle: 'Seamless Connectivity',
      description: 'Reliable networking infrastructure that ensures seamless connectivity and optimal performance for your business operations.',
      solutions: [
        'Telecommunications Networks',
        'Cloud Networks',
        'Local Area Networks (LANs)',
        'Wide Area Networks (WANs)',
        'Virtual Private Networks (VPNs)'
      ],
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'AI-Driven Innovations',
      subtitle: 'Artificial Intelligence Solutions',
      description: 'Advanced AI technologies and machine learning solutions to automate processes and drive intelligent business decisions.',
      solutions: [
        'Machine Learning Models',
        'Natural Language Processing',
        'Computer Vision Systems',
        'Predictive Analytics'
      ],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
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
        className="relative py-8 md:py-12 lg:py-20 bg-gradient-to-br from-cyan-900  to-blue-800 overflow-hidden"
        initial="hidden"
        animate={bannerInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated background elements - Hidden on mobile */}
        <motion.div 
          className="absolute top-10 left-10 md:top-20 md:left-20 w-32 h-32 md:w-72 md:h-72 bg-blue-600/10 rounded-full blur-3xl hidden md:block"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-48 h-48 md:w-96 md:h-96 bg-purple-600/10 rounded-full blur-3xl hidden md:block"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <motion.div className="space-y-4 md:space-y-6 lg:space-y-8 overflow-hidden" variants={staggerContainer}>
              <motion.div variants={fadeInUp}>
                <motion.div 
                  className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-300 text-xs md:text-sm font-medium mb-4 md:mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Cpu className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                  Digital Link Technology
                </motion.div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 md:mb-4 lg:mb-6">
                  Information Technology and AI <span className='text-blue-500'> Solutions In Dubai</span>
                </h1>
                <p className="text-sm md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                  We excel in providing top-notch Information Technology and Artificial Intelligence solutions to businesses across Dubai and the UAE. From cutting-edge app development to AI-driven innovations, partner with us to unlock your business potential.
                </p>
              </motion.div>

             
            </motion.div>

            <motion.div 
              className="relative overflow-hidden"
              variants={slideInRight}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="IT and AI Solutions Technology"
                className="w-full h-48 md:h-64 lg:h-80 xl:h-96 object-cover rounded-xl md:rounded-2xl shadow-2xl"
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Navigation Tabs - Mobile Optimized */}
     

      {/* Overview Section - Mobile Optimized */}
      <section ref={overviewRef} className="py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Key Benefits */}
          <motion.div 
            ref={benefitsRef}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 overflow-hidden"
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <motion.div className="text-center mb-6 md:mb-8" variants={fadeInUp}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
                Why Choose Digital Link Technology?
              </h2>
              <p className="text-lg text-gray-600">Expert IT & AI Solutions in UAE - Your Strategic Partnership</p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 overflow-hidden"
              variants={staggerContainer}
            >
              {[
                {
                  icon: Smartphone,
                  title: "Cutting-Edge App Development",
                  description: "Responsive mobile applications designed to captivate your audience and deliver exceptional user experiences",
                  color: "bg-blue-600"
                },
                {
                  icon: Code,
                  title: "Responsive Web Development",
                  description: "Visually appealing websites with WordPress, HTML, CSS, JS, Joomla, and Bootstrap platforms",
                  color: "bg-purple-600"
                },
                {
                  icon: Search,
                  title: "Comprehensive SEO Strategies",
                  description: "Expert SEO with DigiImpact to boost online visibility and attract quality organic traffic",
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

            {/* Additional Benefits */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-6 md:mt-8 overflow-hidden"
              variants={staggerContainer}
            >
              {[
                {
                  icon: Network,
                  title: "Robust Networking Solutions",
                  description: "Certified professionals designing customized infrastructure for optimal performance and maximum uptime",
                  color: "bg-green-600"
                },
                {
                  icon: Cpu,
                  title: "AI-Driven Innovations",
                  description: "Advanced AI technologies and machine learning solutions for intelligent business automation",
                  color: "bg-red-600"
                },
                {
                  icon: Globe,
                  title: "Strategic Partnership in UAE",
                  description: "Local expertise combined with global standards to deliver world-class digital solutions",
                  color: "bg-orange-600"
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
            <motion.div className="text-center mb-8 md:mb-12 overflow-hidden" variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">Our <span className='text-blue-500'>Solutions</span></h2>
              <p className="text-lg md:text-xl text-gray-600">Comprehensive IT and AI solutions for businesses across Dubai and the UAE</p>
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
                    variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  >
                    <div className="overflow-hidden">
                      <motion.p 
                        className="text-xs md:text-sm font-medium text-blue-600 uppercase tracking-wide mb-1.5 md:mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {category.subtitle}
                      </motion.p>
                      <motion.h3 
                        className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {category.title}
                      </motion.h3>
                      <motion.p 
                        className="text-sm md:text-base lg:text-lg text-gray-600"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {category.description}
                      </motion.p>
                    </div>
                    
                    <motion.div 
                      className="space-y-2 md:space-y-3 overflow-hidden"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {category.solutions.map((solution, idx) => (
                        <motion.div 
                          key={idx} 
                          className="flex items-center overflow-hidden"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + idx * 0.1 }}
                        >
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2 md:mr-3 flex-shrink-0" />
                          <span className="text-sm md:text-base text-gray-700">{solution}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className={`overflow-hidden ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}
                    variants={index % 2 === 0 ? slideInRight : slideInLeft}
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

      {/* Video Modal - Mobile Optimized */}
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
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Let's Talk</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Ready to transform your business with our IT & AI solutions? Get in touch with our expert team today.
                </p>
                <div className="space-y-4">
                  <motion.button
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Our Team
                  </motion.button>
                  <motion.button
                    className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Schedule a Consultation
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

export default ItServices;