'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Custom CSS for animations
const styles = `
  @keyframes slide-right {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .animate-slide-right {
    animation: slide-right 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateY(-2px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
`;

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/solution', label: 'SOLUTION' },
    { href: '/product', label: 'PRODUCT' },
    { href: '/contact', label: 'CONTACT' },
    { href: '/our-company', label: 'OUR COMPANY' }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo/Brand - Larger size */}
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
            <div className="hidden lg:flex space-x-6">
              {navItems.map((item) => (
                <NavLink 
                  key={item.href} 
                  href={item.href} 
                  isActive={pathname === item.href}
                >
                  {item.label}
                </NavLink>
              ))}
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
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-200/50 animate-fade-in">
            {/* Mobile Logo - Larger size */}
            <div className="flex justify-center py-4 mb-3 border-b border-gray-200/70">
              <Link href="/" className="flex items-center group" onClick={() => setIsMobileMenuOpen(false)}>
                <Image
                  src="/logo/logo.png"
                  alt="Company Logo"
                  width={160}
                  height={160}
                  className="h-10 w-auto transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-110"
                  priority
                />
              </Link>
            </div>
            
            {navItems.map((item) => (
              <MobileNavLink 
                key={item.href}
                href={item.href} 
                onClick={toggleMobileMenu} 
                isActive={pathname === item.href}
              >
                {item.label}
              </MobileNavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

// Reusable NavLink component for desktop
function NavLink({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`px-2 py-2 text-sm font-medium tracking-wide transition-all duration-500 ease-in-out relative group ${
        isActive 
          ? 'text-blue-600' 
          : 'text-gray-700 hover:text-gray-900'
      }`}
    >
      {children}
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

// Reusable NavLink component for mobile
function MobileNavLink({ href, children, onClick, isActive }: { href: string; children: React.ReactNode; onClick: () => void; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`block px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-500 ease-in-out relative overflow-hidden ${
        isActive
          ? 'text-blue-600 bg-blue-50/80 border-l-4 border-blue-500'
          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'
      }`}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-blue-100/50 animate-slide-right"></div>
      )}
    </Link>
  );
}