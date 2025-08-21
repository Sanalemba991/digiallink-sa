'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const Approach: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    years: 0,
    clients: 0,
    products: 0,
    satisfaction: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCounterAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation
  const startCounterAnimation = () => {
    const targets = { years: 13, clients: 1500, products: 37, satisfaction: 100 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setCounters({
        years: Math.round(targets.years * easeProgress),
        clients: Math.round(targets.clients * easeProgress),
        products: Math.round(targets.products * easeProgress),
        satisfaction: Math.round(targets.satisfaction * easeProgress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets); // Ensure final values are exact
      }
    }, stepDuration);
  };

  const stats = [
    {
      key: 'years',
      value: counters.years,
      suffix: '+',
      label: 'Years Experience',
      delay: '0ms'
    },
    {
      key: 'clients',
      value: counters.clients,
      suffix: '+',
      label: 'CLIENTS',
      delay: '200ms'
    },
    {
      key: 'products',
      value: counters.products,
      suffix: '+',
      label: 'PRODUCT LINES',
      delay: '400ms'
    },
    {
      key: 'satisfaction',
      value: counters.satisfaction,
      suffix: '%',
      label: 'CLIENTS SATISFACTION',
      delay: '600ms'
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div
            className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
          >
            <div className="text-sm font-semibold tracking-[0.2em] text-blue-600 uppercase mb-8 relative">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                WHAT WE ACHIEVED
              </span>
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div
              className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}
            >
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6">
                <span className="block t">
                  Our Commitment
                </span>
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  and Approach
                </span>
              </h2>

              {/* Decorative line */}
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-8 transform origin-left">
                <div className={`h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-transform duration-1000 delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'
                  }`}></div>
              </div>
            </div>

            <div
              className={`lg:pt-8 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}
            >
              <div className="relative">
                <p className="text-gray-700 leading-relaxed text-lg mb-8 relative z-10">
                  We are deeply invested in our clients' success and committed to
                  delivering exceptional value. Leveraging cutting-edge technology, our
                  proficient team offers premium, inventive solutions tailored to enhance
                  productivity, efficiency, and security.
                </p>

                {/* Floating accent */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-xl opacity-60 animate-pulse"></div>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => router.push("/history")}
                 className="w-full text-left text-sm font-semibold tracking-[0.15em] text-gray-800 uppercase pb-3 mb-2 relative bg-transparent cursor-pointer transition-colors duration-500 hover:text-blue-400 focus:outline-none"

                  style={{ background: "none" }}
                >
                  OUR COMPANY OVERVIEW & HISTORY
                </button>
                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-1000 delay-700 ${isVisible ? 'w-full' : 'w-0'
                  }`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className={`text-center lg:text-left transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
              style={{ transitionDelay: stat.delay }}
            >
              {/* Animated dot */}
              <div className="relative mb-8 mx-auto lg:mx-0 w-fit">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Connecting line effect */}
                <div className={`absolute top-2 left-2 w-16 h-px bg-gradient-to-r from-blue-200 to-transparent transition-all duration-1000 delay-1000 ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }`}></div>
              </div>

              {/* Counter */}
              <div className="mb-3">
                <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent block leading-none">
                  {stat.value}{stat.suffix}
                </span>
              </div>

              {/* Label */}
              <h3 className="text-sm lg:text-base font-semibold text-gray-700 tracking-wide uppercase">
                {stat.label}
              </h3>
            </div>
          ))}
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 right-8 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-3/4 left-12 w-1 h-1 bg-indigo-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default Approach;