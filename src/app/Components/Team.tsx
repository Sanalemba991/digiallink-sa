"use client";
import React, { useState, useEffect, useRef } from "react";
import { Video } from "lucide-react";

const Team = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [bannerInView, setBannerInView] = useState(false);
  const [beliefsInView, setBeliefsInView] = useState(false);
  const [teamInView, setTeamInView] = useState(false);

  // Refs for sections
  const overviewRef = useRef<HTMLElement>(null);
  const solutionsRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLElement>(null);
  const beliefsRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);

  // Typewriter component for the specific text area
  const TypewriterText = ({ text, className, delay = 0 }: { text: string; className: string; delay?: number }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startTyping, setStartTyping] = useState(false);

    useEffect(() => {
      // Only start typing when section is in view
      if (teamInView) {
        const timer = setTimeout(() => {
          setStartTyping(true);
        }, delay);

        return () => clearTimeout(timer);
      } else {
        // Reset when out of view
        setDisplayedText('');
        setCurrentIndex(0);
        setStartTyping(false);
      }
    }, [teamInView, delay]);

    useEffect(() => {
      if (startTyping && currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, 20); // Typing speed (ms per character)

        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text, startTyping]);

    return <p className={className}>{displayedText}</p>;
  };

  // Intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === bannerRef.current) {
            setBannerInView(entry.isIntersecting);
          }
          if (entry.target === beliefsRef.current) {
            setBeliefsInView(entry.isIntersecting);
          }
          if (entry.target === teamRef.current) {
            setTeamInView(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (bannerRef.current) observer.observe(bannerRef.current);
    if (beliefsRef.current) observer.observe(beliefsRef.current);
    if (teamRef.current) observer.observe(teamRef.current);

    return () => observer.disconnect();
  }, []);

  // Function to scroll to specific section
  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);

    const sectionRefs = {
      overview: overviewRef,
      solutions: solutionsRef,
    };

    const targetRef = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (targetRef && targetRef.current) {
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

  const beliefItems = [
    {
      title: "Transparency",
      description: "We maintain open and honest communication in all our business dealings, ensuring clarity and trust with our clients."
    },
    {
      title: "Accountability", 
      description: "We take full responsibility for our actions and commitments, delivering on our promises with integrity."
    },
    {
      title: "Lifelong Learning",
      description: "We continuously evolve and adapt, staying at the forefront of technology and industry best practices."
    },
    {
      title: "Ambition",
      description: "We set high standards and pursue excellence, constantly pushing boundaries to achieve remarkable results."
    }
  ];

  const teamMembers = [
    {
      name: "Mashood M K",
      position: "CEO Chief Operating Officer",
      image: "/Team/Mashood.png"
    },
    {
      name: "Zameel Sharaf",
      position: "Channel Accounts Manager",
      image: "/Team/Zammel.png"
    },
    {
      name: "Thashreef CK",
      position: "Chief Sales Officer",
      image: "/Team/Thasreef.png"
    },
    {
      name: "Shajid Seera Valappil",
      position: "Service Center Manager",
      image: "/Team/Shajid.png"
    },
    {
      name: "Althiya Titus",
      position: "HR & OPERATION",
      image: "/Team/Althiya.png"
    },
    {
      name: "Mohammed Rasi",
      position: "Accountant",
      image: "/Team/Rashi.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Banner Section */}
      <section
        ref={bannerRef}
        className="relative py-8 md:py-12 lg:py-20 bg-gradient-to-br from-cyan-900 to-blue-800 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-10 left-10 md:top-20 md:left-20 w-32 h-32 md:w-72 md:h-72 bg-purple-600/10 rounded-full blur-3xl hidden md:block animate-pulse" />
        <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-48 h-48 md:w-96 md:h-96 bg-blue-600/10 rounded-full blur-3xl hidden md:block animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div className={`transition-all duration-700 ease-out ${bannerInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 md:mb-4 lg:mb-6">
                 Meet the Team at <span className="text-blue-400">Digital Link Technology LLC</span>
                </h1>
                <p className="text-sm md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                 We believe in having a talented team of self-starters that want to deliver the best results for our clients.
                </p>
              </div>
            </div>

            <div className={`transition-all duration-700 ease-out delay-300 ${bannerInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <img
                src="/Team/banner.png"
                alt="Audio Visual Solutions Technology"
                className="w-full h-48 md:h-64 lg:h-80 xl:h-96 object-cover rounded-xl md:rounded-2xl shadow-2xl  transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe In Section */}
      <section
        ref={beliefsRef}
        className="py-12 md:py-16 lg:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Content */}
            <div className={`transition-all duration-700 ease-out ${beliefsInView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
              <div>
                <p className="text-sm md:text-base font-semibold text-blue-600 uppercase tracking-wider mb-6">
                  WHAT WE BELIEVE IN
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  We believe in making the world a better place
                </h2>
              </div>
            </div>
            
            {/* Right Content */}
            <div className={`transition-all duration-700 ease-out delay-300 ${beliefsInView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg lg:text-xl">
                  We achieve this by scaling impactful businesses. Our focus is on 
                  promoting our clients' brands and effectively disseminating their 
                  message worldwide. We refuse to settle for the status quo, constantly 
                  striving to expand our own business with the same level of honesty and 
                  integrity we employ to enhance our clients' enterprises.
                </p>
              </div>
            </div>
          </div>

          {/* Values Grid Layout */}
          <div className={`mt-16 transition-all duration-700 ease-out delay-500 ${beliefsInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="relative max-w-5xl mx-auto">
              {/* Continuous dotted line */}
              <div className="absolute top-1.5 left-6 right-6 h-px border-t-2 border-dotted border-gray-300"></div>
              
              {/* Belief Items */}
              <div className="flex flex-col md:flex-row justify-between items-start relative gap-8 md:gap-4">
                {beliefItems.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex-1 flex flex-col items-center text-center transition-all duration-700 ease-out ${beliefsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ 
                      transitionDelay: `${500 + index * 150}ms`,
                    }}
                  >
                    {/* Blue dot */}
                    <div className="w-3 h-3 bg-blue-600 rounded-full mb-4 hover:scale-125 transition-transform duration-300 cursor-pointer relative z-10" />
                    
                    {/* Title */}
                    <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="mt-2 text-sm text-gray-600 px-2">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={teamRef}
        className="py-12 md:py-16 lg:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Team Introduction Section */}
          <div className="relative mb-16 lg:mb-24 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/3 rounded-full blur-2xl" />
            
            <div className="relative text-center">
              <div className="max-w-4xl mx-auto">
                {/* Discover Text */}
                <div className={`transition-all duration-1000 ease-out ${teamInView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
                  <p className="text-sm md:text-base font-bold text-blue-800 uppercase tracking-[0.3em] mb-4 md:mb-6 relative">
                    <span className="relative z-10">Discover</span>
                  </p>
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                </div>

                {/* Main Heading */}
                <div className={`transition-all duration-1000 ease-out delay-200 ${teamInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-tight mb-4 md:mb-6">
                    <span className="block">
                      <span className={`inline-block transition-all duration-700 ease-out ${teamInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '400ms' }}>Our</span>{' '}
                      <span className={`inline-block transition-all duration-700 ease-out ${teamInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
                        <span className="text-blue-800">Dedicated</span>
                      </span>
                    </span>
                    <span className="block mt-2">
                      <span className={`inline-block transition-all duration-700 ease-out ${teamInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '600ms' }}>Team</span>
                    </span>
                  </h2>
                </div>

                {/* Subtitle */}
            

                

                {/* Decorative line with animated dots */}
                
              </div>
            </div>
          </div>

          {/* CEO Section */}
          <div className="flex flex-col items-center mb-16 lg:mb-24 max-w-3xl mx-auto">
  {/* CEO Image with enhanced animation */}
  <div className={`w-full transition-all duration-1000 ease-out ${
    teamInView 
      ? 'translate-y-0 opacity-100 scale-100' 
      : 'translate-y-24 opacity-0 scale-95'
  }`}>
    <div className="relative overflow-hidden rounded-2xl">
      <img
        src="/Team/gafoor.png"
        alt="Abdul Gafoor - CEO & Founder"
        className="w-full max-w-xl mx-auto h-64 md:h-80 lg:h-96 object-contain transition-all duration-700 transform hover:scale-105"
      />
      {/* Animated gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent transition-opacity duration-700 ${
        teamInView ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  </div>
  
  {/* CEO Content with staggered animation */}
  <div className={`w-full text-center mt-8 space-y-6`}>
    <div className={`text-gray-700 leading-relaxed text-lg lg:text-xl italic transition-all duration-700 ${
      teamInView 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-8 opacity-0'
    }`} style={{ transitionDelay: '300ms' }}>
      "In today's digital age, the importance of a reliable, efficient, and user-friendly website cannot be overstated. At Digitalink, we've been proud to embark on our digital journey."
    </div>
    
    <div className={`text-gray-700 leading-relaxed text-lg lg:text-xl transition-all duration-700 ${
      teamInView 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-8 opacity-0'
    }`} style={{ transitionDelay: '500ms' }}>
      Our aim has always been to provide our visitors with not just information, but an experience. An experience that is seamless, intuitive, and reflective of the quality we stand for.
    </div>
    
    <div className={`pt-4 transition-all duration-700 ${
      teamInView 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-8 opacity-0'
    }`} style={{ transitionDelay: '700ms' }}>
      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
        Abdul Gafoor
      </h3>
      <span className="text-blue-600 font-semibold text-sm md:text-base uppercase tracking-wider block">
        CEO & FOUNDER
      </span>
    </div>
  </div>
</div>

          {/* Team Members Grid with enhanced animations */}
          <div className={`space-y-12`}>
  <div className={`transition-all duration-1000 ease-out ${
    teamInView 
      ? 'translate-y-0 opacity-100' 
      : 'translate-y-12 opacity-0'
  }`}>
    <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 text-center">
      Executive Management Team
    </h3>
  </div>
  
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
    {teamMembers.map((member, index) => (
      <div 
        key={index}
        className={`flex flex-col items-center text-center group transition-all duration-1000 ease-out ${
          teamInView 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-16 opacity-0 scale-95'
        }`}
        style={{ 
          transitionDelay: `${800 + index * 200}ms`,
        }}
      >
        {/* Member Image with enhanced hover effects */}
        <div className="relative mb-4 overflow-hidden rounded-full">
          <img
            src={member.image}
            alt={member.name}
            className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover shadow-lg transition-all duration-500 transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-full" />
        </div>
        
        {/* Member Info - Restructure to avoid div inside p */}
        <div className="text-center">
          <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
            {member.name}
          </h3>
          <span className="block mt-1 text-xs md:text-sm text-gray-600 leading-tight">
            {member.position}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
        </div>       
        <div className={` mt-12 transition-all duration-1000 ease-out delay-900 ${teamInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}>
                  <div className="flex items-center justify-center space-x-4 mb-8">
                    <div className="h-px bg-gradient-to-r from-transparent to-blue-400 w-16 md:w-24" />
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <div className="h-px bg-gradient-to-l from-transparent to-blue-400 w-16 md:w-24" />
                  </div>
                </div>
      </section>
    </div>
  );
};

export default Team;