'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { BrainCog, Cable, Video, ShieldCheck, ChevronDown, Mail, Phone, ChevronRight } from 'lucide-react';

const useNavbarStyles = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .animate-fade-in {
        animation: fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
      .animate-scale-in {
        animation: scale-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
      @keyframes fade-in {
        0% { opacity: 0; transform: translateY(-8px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes scale-in {
        0% { opacity: 0; transform: scale(0.95); }
        100% { opacity: 1; transform: scale(1); }
      }
      .mega-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 1000;
        overflow: hidden;
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSolutionDropdown, setShowSolutionDropdown] = useState(false);
  const [showMobileSolutionPages, setShowMobileSolutionPages] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useNavbarStyles();

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (closeTimeout) clearTimeout(closeTimeout);
    };
  }, [closeTimeout]);

  useEffect(() => {
    setShowSolutionDropdown(false);
    setShowMobileSolutionPages(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileSolutionPages = () => {
    setShowMobileSolutionPages(!showMobileSolutionPages);
  };

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/solution', label: 'SOLUTION' },
    { href: '/product', label: 'PRODUCT' },
    { href: '/contact', label: 'CONTACT' },
    { href: '/our-company', label: 'OUR COMPANY' }
  ];

  const solutionDropdownItems = [
    { 
      href: '/solution/it', 
      label: 'IT & AI Section',
      description: 'Advanced AI & Cloud Solutions for Modern Business',
      icon: BrainCog,
      image: '/images/solutions/it-ai-solution.jpg'
    },
    { 
      href: '/solution/elevatorelvsolutions', 
      label: 'Elevator ELV Solution',
      description: 'Smart Building Systems & Automation Technology',
      icon: Cable,
      image: '/images/solutions/elevator-elv-solution.jpg'
    },
    { 
      href: '/solution/audio', 
      label: 'Audio and Visual Solution',
      description: 'Professional AV Systems & Integration Services',
      icon: Video,
      image: '/images/solutions/audio-visual-solution.jpg'
    },
    { 
      href: '/solution/servalliance', 
      label: 'Surveillance Solution',
      description: 'Advanced Security & Monitoring Systems',
      icon: ShieldCheck,
      image: '/images/solutions/surveillance-solution.jpg'
    },
  ];

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setShowSolutionDropdown(false);
    }, 300);
    setCloseTimeout(timeout);
  };

  const handleDropdownEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setShowSolutionDropdown(true);
  };

  const getAnimationClass = () => isMounted ? 'animate-fade-in' : '';
  const getItemAnimationClass = (index: number) => 
    isMounted ? `animate-scale-in` : '';

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group transition-all duration-500 ease-in-out">                        
              <Image
                src="/logo/logo.png"
                alt="Company Logo"
                width={200}
                height={200}
                className="h-14 w-auto transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-110"
                priority
              /> 
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 relative">
            <div className="flex items-center space-x-6">
              {navItems.map((item) =>
                item.href === '/solution' ? (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <NavLink
                      href={item.href}
                      isActive={pathname.startsWith('/solution')}
                      hasDropdown={true}
                    >
                      {item.label}
                    </NavLink>
                  </div>
                ) : (
                  <div 
                    key={item.href}
                    onMouseEnter={() => setShowSolutionDropdown(false)}
                  >
                    <NavLink
                      href={item.href}
                      isActive={pathname === item.href}
                    >
                      {item.label}
                    </NavLink>
                  </div>
                )
              )}
            </div>
            
            {/* Contact Info */}
            <div className="flex items-center space-x-8 ml-6 border-l pl-6 text-sm">
              <Link href="mailto:sales@digitallink.ae" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                <span>sales@digitallink.ae</span>
              </Link>
              <Link href="tel:+971552929644" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                <span>+971 552929644</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-400 ease-in-out"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Large Enhanced Dropdown */}
      {showSolutionDropdown && (
        <div 
          className="mega-dropdown animate-fade-in"
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          <div className="bg-white shadow-2xl border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                  {solutionDropdownItems.map((solution, index) => {
                    const IconComponent = solution.icon;
                    return (
                      <div 
                        key={solution.href}
                        onClick={() => {
                          setShowSolutionDropdown(false);
                          router.push(solution.href);
                        }}
                        className={`group relative bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 overflow-hidden cursor-pointer ${getItemAnimationClass(index)} ${
                          pathname === solution.href ? 'ring-2 ring-blue-500 border-blue-300 shadow-lg' : ''
                        }`}
                        style={isMounted ? { animationDelay: `${index * 100}ms` } : {}}
                      >
                        <div className="relative h-36 overflow-hidden">
                          <Image
                            src={solution.image}
                            alt={solution.label}
                            width={400}
                            height={250}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40"></div>
                          <div className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300 mb-3 leading-tight">
                            {solution.label}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            {solution.description}
                          </p>
                          <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <span className="text-sm font-semibold">Learn more</span>
                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                        
                        {pathname === solution.href && (
                          <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-t-blue-500">
                            <div className="absolute -top-6 -right-6 w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="text-center pt-8 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Need help choosing the right solution?
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Our experts are ready to help you find the perfect technology solution for your business needs.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    onClick={() => setShowSolutionDropdown(false)}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Our Experts
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-200/50 ${getAnimationClass()}`}>
            {/* Navigation Items */}
            {!showMobileSolutionPages ? (
              <>
                {navItems.map((item) =>
                  item.href === '/solution' ? (
                    <button
                      key={item.href}
                      onClick={toggleMobileSolutionPages}
                      className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-500 ease-in-out relative overflow-hidden ${
                        pathname.startsWith('/solution')
                          ? 'text-blue-600 bg-blue-50/80 border-l-4 border-blue-500'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>
                  ) : (
                    <MobileNavLink
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        toggleMobileMenu();
                        setShowMobileSolutionPages(false);
                      }}
                      isActive={pathname === item.href}
                    >
                      {item.label}
                    </MobileNavLink>
                  )
                )}
              </>
            ) : (
              <>
                <button
                  onClick={toggleMobileSolutionPages}
                  className="flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-500 ease-in-out"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Menu
                </button>
                
                {solutionDropdownItems.map((dropdown, index) => {
                  const IconComponent = dropdown.icon;
                  return (
                    <Link
                      key={dropdown.href}
                      href={dropdown.href}
                      className={`flex items-center space-x-3 px-4 py-3 text-sm rounded-lg font-medium transition-all duration-300 ${
                        pathname === dropdown.href 
                          ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-500' 
                          : 'text-gray-700 hover:bg-gray-100'
                      } ${getItemAnimationClass(index)}`}
                      style={isMounted ? { animationDelay: `${index * 100}ms` } : {}}
                      onClick={() => {
                        toggleMobileMenu();
                        setShowMobileSolutionPages(false);
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{dropdown.label}</div>
                        <div className="text-xs text-gray-500">{dropdown.description}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                    </Link>
                  );
                })}
              </>
            )}

            {/* Contact Info for Mobile */}
            <div className="px-4 py-3 space-y-2 mt-4 bg-gray-50 rounded-lg">
              <Link
                href="mailto:sales@digitallink.ae"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={toggleMobileMenu}
              >
                <Mail className="w-5 h-5 mr-3 text-blue-500" />
                <span className="text-sm font-medium">sales@digitallink.ae</span>
              </Link>
              <Link
                href="tel:+971552929644"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={toggleMobileMenu}
              >
                <Phone className="w-5 h-5 mr-3 text-blue-500" />
                <span className="text-sm font-medium">+971 552929644</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// NavLink component
function NavLink({ 
  href, 
  children, 
  isActive, 
  hasDropdown = false,
  onMouseEnter,
  onMouseLeave 
}: { 
  href: string; 
  children: React.ReactNode; 
  isActive: boolean;
  hasDropdown?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium tracking-wide transition-all duration-500 ease-in-out relative group ${
        isActive 
          ? 'text-blue-600' 
          : 'text-gray-700 hover:text-gray-900'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span>{children}</span>
      {hasDropdown && (
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-blue-600' : 'text-gray-500'} group-hover:rotate-180`} />
      )}
      <span 
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700 ease-in-out ${
          isActive 
            ? 'w-full opacity-100' 
            : 'w-0 group-hover:w-full opacity-100'
        }`}
      ></span>
    </Link>
  );
}

// MobileNavLink component
function MobileNavLink({ 
  href, 
  children, 
  onClick, 
  isActive, 
  hasDropdown = false 
}: { 
  href: string; 
  children: React.ReactNode; 
  onClick: () => void; 
  isActive: boolean;
  hasDropdown?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-500 ease-in-out relative overflow-hidden ${
        isActive
          ? 'text-blue-600 bg-blue-50/80 border-l-4 border-blue-500'
          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'
      }`}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      {hasDropdown && (
        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
      )}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-blue-100/50"></div>
      )}
    </Link>
  );
}