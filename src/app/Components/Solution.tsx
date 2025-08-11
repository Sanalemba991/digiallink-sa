"use client";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ShieldCheck,
  BrainCog,
  Cable,
  Video,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Solutions = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("it-ai-solutions");
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Animation variants
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Navigation function for Learn More buttons
  const handleLearnMore = (category: string) => {
    const routeMap: { [key: string]: string } = {
      "it-ai-solutions": "/solution/it",
      "elevatorelvsolutions": "/solution/elevatorelvsolutions",
      "audio-visual-solution": "/solution/audio",
      "surveillance-solutions": "/solution/servalliance",
    };

    const route = routeMap[category];
    if (route) {
      router.push(route);
    }
  };

  // Tab change handler
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // Intersection Observer
  const { ref: solutionsRef, inView: solutionsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const solutions = [
    {
      id: 1,
      category: "it-ai-solutions",
      title: "IT & AI Solutions",
      description:
        "Advanced artificial intelligence and IT infrastructure solutions to transform your business operations.",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "AI-Powered Analytics",
        "Cloud Computing Solutions",
        "Data Center Infrastructure",
        "Enterprise IT Security",
      ],
    },
    {
      id: 2,
      category: "elevatorelvsolutions",
      title: "Elevator ELV Solutions",
      description:
        "Seamless integration of diverse systems and technologies for unified operations.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Cross-Platform Compatibility",
        "API Integration Services",
        "Legacy System Modernization",
        "Unified Dashboard Solutions",
      ],
    },
    {
      id: 3,
      category: "audio-visual-solution",
      title: "Audio & Visual Solution",
      description:
        "Cutting-edge audio and visual technologies for immersive experiences.",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Digital Signage Systems",
        "Conference Room AV",
        "Professional Audio Systems",
        "Interactive Display Solutions",
      ],
    },
    {
      id: 4,
      category: "surveillance-solutions",
      title: "Surveillance Solutions",
      description:
        "Comprehensive security and surveillance systems for complete protection.",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "IP Camera Systems",
        "Video Analytics",
        "Access Control Integration",
        "24/7 Monitoring Solutions",
      ],
    },
  ];

  const categories = [
    { id: "it-ai-solutions", name: "IT & AI Solutions", icon: BrainCog },
    { id: "elevatorelvsolutions", name: "Elevator ELV Solutions", icon: Cable },
    {
      id: "audio-visual-solution",
      name: "Audio & Visual Solution",
      icon: Video,
    },
    {
      id: "surveillance-solutions",
      name: "Surveillance Solutions",
      icon: ShieldCheck,
    },
  ];

  const filteredSolutions =
    activeTab === "all"
      ? solutions
      : solutions.filter((solution) => solution.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <motion.div
        className="relative h-screen bg-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Technology Solutions"
            className="w-full h-full object-cover opacity-40"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" as const }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.h1
                className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Transformative
                <motion.span
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  Technology Solutions
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                From AI-powered analytics to comprehensive security systems, we
                deliver cutting-edge solutions that drive innovation and
                operational excellence across industries.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
        </motion.div>
      </motion.div>

      {/* Overview Section */}
      <motion.div
        className="bg-white py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Comprehensive{" "}
            <span className="text-blue-400">Technology Profile</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-700 mb-4 font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            End-to-end solutions for the digital enterprise
          </motion.p>
          <motion.p
            className="text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Our portfolio spans artificial intelligence, system integration,
            audiovisual technologies, and advanced surveillance solutions - each
            designed to address specific business challenges while working
            seamlessly together.
          </motion.p>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Whether you need to modernize legacy systems, implement AI-driven
            analytics, create immersive experiences, or secure your facilities,
            our solutions are built on proven technologies and industry best
            practices to deliver measurable results.
          </motion.p>
        </div>
      </motion.div>

      {/* Solutions Section */}
      <motion.div
        id="solutions-section"
        ref={solutionsRef}
        className="bg-white py-12 md:py-16"
        initial="hidden"
        animate={solutionsInView ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-8 md:mb-12" variants={slideUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Industry-Leading <span className="text-blue-400">Solutions</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized technologies for every business need
            </p>
            <p className="text-sm md:text-base text-gray-600 mt-2 md:mt-4 max-w-4xl mx-auto">
              Our solutions are designed to integrate seamlessly with your
              existing infrastructure while providing the innovation and
              performance needed to stay competitive in today's digital
              landscape.
            </p>
          </motion.div>

          {/* Responsive Category Tabs */}
          <motion.div
            className="mb-8 md:mb-12"
            variants={staggerContainer}
            initial="hidden"
            animate={solutionsInView ? "show" : "hidden"}
          >
            {/* Mobile Scrollable Tabs */}
            <div className="md:hidden overflow-x-auto pb-4">
              <div className="flex gap-2 min-w-max px-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => handleTabChange(category.id)}
                      className={`flex-shrink-0 inline-flex items-center px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm ${
                        activeTab === category.id
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                      variants={staggerItem}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span className="whitespace-nowrap">{category.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Desktop Grid Tabs */}
            <div className="hidden md:flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => handleTabChange(category.id)}
                    className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === category.id
                        ? "bg-blue-400 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                    style={{
                      transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                      minWidth: "180px",
                    }}
                    variants={staggerItem}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span className="text-sm md:text-base">
                      {category.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Solutions Grid */}
          <AnimatePresence mode="wait">
            {filteredSolutions.length === 1 ? (
              <motion.div
                key={`single-${activeTab}`}
                className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-8 flex items-center shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={filteredSolutions[0].image}
                  alt={filteredSolutions[0].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gray-900/60" />
                <div className="relative z-10 px-4 md:px-10 py-6 md:py-8 text-white w-full flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row md:items-center mb-3 md:mb-4">
                    <span className="px-3 py-1 bg-blue-400 text-white text-xs font-semibold rounded-full mb-2 md:mb-0 md:mr-4 w-fit">
                      {
                        categories.find(
                          (cat) => cat.id === filteredSolutions[0].category
                        )?.name
                      }
                    </span>
                    <h2 className="text-xl md:text-3xl font-bold">
                      {filteredSolutions[0].title}
                    </h2>
                  </div>
                  <p className="text-sm md:text-lg mb-4 md:mb-6 leading-relaxed">
                    {filteredSolutions[0].description}
                  </p>

                  <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-8">
                    {filteredSolutions[0].features.map((feature, idx) => (
                      <motion.span
                        key={idx}
                        className="inline-flex items-center px-2 md:px-4 py-1 md:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs md:text-sm font-medium border border-white/10"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400 mr-1 md:mr-2" />
                        <span className="truncate max-w-[120px] md:max-w-none">
                          {feature}
                        </span>
                      </motion.span>
                    ))}
                  </div>

                  <motion.button
                    onClick={() =>
                      handleLearnMore(filteredSolutions[0].category)
                    }
                    className="group relative inline-flex items-center px-6 md:px-10 py-3 md:py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:border-blue-500 transition-all duration-500 ease-out shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.2)] hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 hover:text-white transform hover:-translate-y-1 active:translate-y-0 backdrop-blur-sm overflow-hidden w-fit text-sm md:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    <span className="relative z-10 tracking-wide font-medium">
                      Learn More
                    </span>
                    <ArrowRight className="relative z-10 w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-110" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 to-rose-600/0 group-hover:from-red-600/10 group-hover:to-rose-600/10 transition-all duration-500"></div>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`grid-${activeTab}`}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {filteredSolutions.map((solution) => (
                  <motion.div
                    key={solution.id}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-200 hover:border-red-200"
                    variants={staggerItem}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative overflow-hidden h-48 md:h-64">
                      <motion.img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-700"></div>
                      <div className="absolute top-3 md:top-4 right-3 md:right-4">
                        <span className="px-2 md:px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full transition-all duration-500 group-hover:bg-orange-500">
                          {
                            categories.find(
                              (cat) => cat.id === solution.category
                            )?.name
                          }
                        </span>
                      </div>
                    </div>
                    <div className="p-4 md:p-6">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-red-600 transition-colors duration-500">
                        {solution.title}
                      </h3>
                      <p className="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                        {solution.description}
                      </p>

                      <div className="space-y-1.5 md:space-y-2 mb-4 md:mb-6">
                        {solution.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center text-xs md:text-sm text-gray-600"
                          >
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="line-clamp-1 md:line-clamp-none">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        onClick={() => handleLearnMore(solution.category)}
                        className="group w-full inline-flex items-center justify-center px-4 md:px-6 py-2.5 md:py-3 bg-transparent text-gray-700 font-semibold rounded-lg relative overflow-hidden transition-all duration-300 text-sm md:text-base"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center text-white">
                          Learn More
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <span
                          className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                          aria-hidden="true"
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* About Section */}
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
                      We are committed to{" "}
                      <span className="block text-blue-400">your strategy</span>
                    </h2>
                  </motion.div>

                  <motion.div className="space-y-4" variants={itemVariants}>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      We are committed to your strategy and intuitively
                      understand how to deliver value in the digital economy.
                      Through the most effective digital marketing options,
                      Renaissance makes it happen seamlessly. Every day, we help
                      brands think big, execute smart and deliver growth. We
                      employ an intelligent digital marketing strategy to
                      consistently unlock value from digital investments in a
                      rapidly advancing world. From simple to the infinitely
                      complex.
                    </p>
                  </motion.div>

                  <motion.div className="pt-4" variants={itemVariants}>
                    <div className="inline-block">
                      <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase border-b-2 border-blue-400 pb-1">
                        More about our company
                      </h3>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Solutions;