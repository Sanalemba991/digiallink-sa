"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faThreads,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage(
          "Thank you! You have been successfully subscribed to our newsletter."
        );
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setStatus("error");
      setMessage("Failed to subscribe");
    }

    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 3000);
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Newsletter - Smaller */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="max-w-lg mx-auto text-center px-2">
            <h3 className="text-sm sm:text-base font-medium text-white mb-1">
              Subscribe to our Newsletter
            </h3>
            <p className="text-xs text-gray-400 mb-2">
              Stay updated with our latest news
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-1 max-w-sm mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-2 py-1 text-xs bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-white text-white placeholder-gray-400"
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-3 py-1 text-xs bg-white text-black rounded hover:bg-blue-400 disabled:opacity-50"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {message && (
              <p
                className={`mt-1 text-xs ${status === "success" ? "text-green-400" : "text-red-400"
                  }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
          {/* Brand Section - Larger logo */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="flex items-center group transition-all duration-500 ease-in-out"
              >
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
            <p className="text-xs text-gray-400">
              Transforming ideas into digital reality with innovative solutions.
            </p>
            <div className="flex justify-center sm:justify-start space-x-2">
              <a
                href="https://www.instagram.com/lovosis_technology_private_ltd"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
              </a>
              <a
                href="https://www.threads.net/@lovosis_technology_private_ltd"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faThreads} className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/lovosis-technology-private-limited"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faLinkedin} className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links - Smaller */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-medium text-white mb-2">Solutions</h3>
            <ul className="space-y-1 text-xs">
              {[
                { name: "IT & AI Solutions", path: "/solution/it" },
                {
                  name: "Elevator ELV Solutions",
                  path: "/solution/elevatorelvsolutions",
                },
                { name: "Audio & Visual Solution", path: "/solution/audio" },
                {
                  name: "Surveillance Solutions",
                  path: "/solution/servalliance",
                },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources - Smaller */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-medium text-white mb-2">Who We Are</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <Link
                  href="/history"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  Overview & History
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/awards"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  Awards
                </Link>
              </li>
              <li>
                <Link
                  href="/our-company"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  Our Company
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Smaller */}
          <div className="text-center">
            <h3 className="text-sm font-medium text-white mb-2">Office</h3>
            <ul className="space-y-3 text-xs text-gray-400">
              {/* Location with clickable map icon */}
              <li className="flex justify-center">
                <button
                  onClick={() => {
                    const encodedAddress = encodeURIComponent("Olaya Street, Riyadh, Saudi Arabia");
                    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
                    window.open(googleMapsUrl, '_blank');
                  }}
                  className="inline-flex items-center gap-2 hover:text-blue-300 transition-colors duration-300 group"
                >
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs hover:text-blue-500 group-hover:no-underline cursor-pointer">
                    Olaya Street, Riyadh, Saudi Arabia
                  </span>
                </button>
              </li>

              {/* Email */}
              <li className="flex justify-center">
                <a
                  href="mailto:sales@digitallink-sa.com"
                  className="inline-flex items-center gap-2 hover:text-blue-300 transition-colors duration-300 group"
                >
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs hover:text-blue-500 group-hover:no-underline cursor-pointer">
                    sales@digitallink-sa.com
                  </span>
                </a>
              </li>

              {/* Phone */}
              <li className="flex justify-center">
                <a
                  href="tel:+966597015415"
                  className="inline-flex items-center gap-2 hover:text-blue-300 transition-colors duration-300 group"
                >
                  <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs hover:text-blue-500 group-hover:no-underline cursor-pointer">
                    +966 59 701 5415
                  </span>
                </a>
              </li>
            </ul>
          </div>

        </div>
        {/* Bottom Bar - Smaller */}
        <div className="border-t border-gray-800 mt-4 sm:mt-6 pt-3 sm:pt-4">
          <div className="text-center text-xs text-gray-400">
            <p>&copy; {currentYear} Digital Link. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;