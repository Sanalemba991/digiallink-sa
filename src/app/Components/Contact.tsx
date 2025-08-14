"use client";
import { useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";
import { FaInstagram, FaLinkedinIn, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import { PiThreadsLogoFill } from "react-icons/pi";
import { SiGmail } from "react-icons/si";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);
  const followUsRef = useRef(null);
  const findUsRef = useRef(null);
  
  const isInView = useInView(contactRef, { once: true, margin: "-100px" });
  const isFollowUsInView = useInView(followUsRef, { once: true, margin: "-100px" });
  const isFindUsInView = useInView(findUsRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    // Phone validation (basic, 10+ digits)
    const phoneRegex = /^[0-9]{10,}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      toast.error("Please enter a valid phone number");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Social media icons data
  const socialIcons = [
    { 
      icon: <FaFacebook className="text-2xl" />,
      href: "https://www.facebook.com/lovosistech",
      color: "bg-blue-600",
      label: "Facebook"
    },
    { 
      icon: <FaTwitter className="text-2xl" />,
      href: "https://twitter.com/lovosistech",
      color: "bg-blue-400",
      label: "Twitter"
    },
    { 
      icon: <FaInstagram className="text-2xl" />,
      href: "https://www.instagram.com/lovosis_technology_private_ltd",
      color: "bg-pink-600",
      label: "Instagram"
    },
    { 
      icon: <FaLinkedinIn className="text-2xl" />,
      href: "https://www.linkedin.com/company/lovosis-technology-private-limited",
      color: "bg-blue-700",
      label: "LinkedIn"
    },
    { 
      icon: <FaYoutube className="text-2xl" />,
      href: "https://www.youtube.com/@LovosisTechnology",
      color: "bg-red-600",
      label: "YouTube"
    },
    { 
      icon: <PiThreadsLogoFill className="text-2xl" />,
      href: "https://www.threads.net/@lovosis_technology_private_ltd",
      color: "bg-black",
      label: "Threads"
    }
  ];

  return (
    <div className="w-full bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Contact Form Section */}
      <section className="py-16 bg-white" id="contact-form" ref={contactRef}>
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-3 py-1.5 bg-sky-100 text-sky-800 rounded-full text-sm font-medium mb-3"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              Get in touch
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            >
              Contact Us
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Ready to discuss your project? Fill out the form below and we'll respond within 24 hours.
            </motion.p>
          </div>
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.3,
                },
              },
            }}
            className="grid md:grid-cols-5 gap-8"
          >
            {/* Contact Information - Left Side */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  },
                },
              }}
              className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 space-y-6 shadow-sm"
            >
              <div>
                <h3 className="font-medium text-gray-800 text-lg border-b pb-2 mb-3">
                  Contact
                </h3>
                <div className="text-gray-600 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-sky-100 p-2 rounded-full">
                      <BsTelephoneFill className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">PHONE</p>
                      <a href="tel:+97142241977" className="text-blue-500 hover:underline block">+971 4 224 1977</a>
                      <a href="tel:+971552929644" className="text-blue-500 hover:underline block">+971 552929644</a>
                      <a href="tel:+971509982727" className="text-blue-500 hover:underline block">+971 50 998 2727</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-sky-100 p-2 rounded-full">
                      <SiGmail className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">EMAIL</p>
                      <a href="mailto:sales@digitallink.ae" className="text-blue-500 hover:underline">
                        sales@digitallink.ae
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 text-lg border-b pb-2 mb-3">
                  Location
                </h3>
                <div className="text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="bg-sky-100 p-2 rounded-full">
                      <IoLocationSharp className="w-4 h-4 text-sky-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-700">
                        DUBAI OFFICE
                      </p>
                      <p>Baghlaf Building Shop No.11  Market</p>
                      <p>Satellite Market, Naif, Deira - Dubai United Arab Emirates</p>
                      <p> Dubai United Arab Emirates, P.O.Box: 123241</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 text-lg border-b pb-2 mb-3">
                  Hours
                </h3>
                <div className="text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Mon-Sat:</span>
                    <span>9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Sun:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Contact Form - Right Side */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  },
                },
              }}
              className="md:col-span-3"
            >
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 bg-white text-gray-900 hover:border-sky-300"
                        required
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 bg-white text-gray-900 hover:border-sky-300"
                        required
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Phone *
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 bg-white text-gray-900 hover:border-sky-300"
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Subject *
                    </label>
                    <input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 bg-white text-gray-900 hover:border-sky-300"
                      required
                      placeholder="Subject of your message"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 bg-white text-gray-900 resize-y hover:border-sky-300"
                      required
                      placeholder="Please describe your requirements..."
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-6 pt-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium">We'll respond within 24 hours</span>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white font-semibold text-base rounded-full transition-all duration-300 group transform hover:scale-105 hover:shadow-lg min-w-[180px] justify-center focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Spacer between sections */}
      

      {/* Follow Us Section */}
      <section className="py-16 bg-white" ref={followUsRef}>
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isFollowUsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isFollowUsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
              Social Connections
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isFollowUsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            >
              Follow <span className="text-blue-500">Us</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isFollowUsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Stay connected with us on social media for the latest updates, news, and offers.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={isFollowUsInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4,
                },
              },
            }}
            className="flex justify-center gap-6 flex-wrap"
          >
            {socialIcons.map((social, index) => (
              <motion.a
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 10
                    }
                  },
                }}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gray-100 hover:${social.color} p-5 rounded-full transition-all duration-300 hover:text-white`}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

     

      {/* Find Us Section */}
     <section className="bg-white w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Title Container */}
          <div className="container mx-auto px-6 lg:px-8 max-w-7xl mb-16">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center px-4 py-2 bg-sky-100 border border-sky-200 rounded-full text-blue-500 text-sm font-medium mb-6"
              >
                Visit Our Location
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
              >
                Find Us in <span className="text-blue-500">Dubai</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              >
                Visit our office at Baghlaf Building, Shop No.11, Satellite Market, Naif, Deira - Dubai, UAE
              </motion.p>
            </div>
          </div>
          {/* Full Width Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="w-full h-[600px] relative"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0719507721437!2d55.30274081501514!3d25.27494098385928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f435f89777647%3A0x6f7f8eb1741e1e55!2sBaghlaf%20Building%20-%20Naif%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1629282422777!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Baghlaf Building, Naif, Deira - Dubai"
              className="absolute inset-0"
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}