"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Video } from 'lucide-react';

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

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const jobListings = [
  {
    id: 1,
    slug: "supply-chain-manager",
    title: "Supply Chain Manager",
    category: "Logistics",
    location: "Dubai",
    type: "Full Time",
    experience: "5+ years",
    description:
      "Lead our supply chain operations and optimize logistics processes to ensure efficient delivery of products and services.",
    requirements: [
      "Bachelor's in Supply Chain Management or related field",
      "Proven experience in logistics optimization",
      "Strong analytical and problem-solving skills",
      "Knowledge of ERP systems and inventory management",
    ],
    responsibilities: [
      "Develop and implement supply chain strategies",
      "Manage vendor relationships and procurement",
      "Optimize warehouse operations and inventory",
      "Ensure compliance with import/export regulations",
    ],
  },
  {
    id: 2,
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "Design",
    location: "Dubai",
    type: "Full Time",
    experience: "3+ years",
    description:
      "Create intuitive and engaging user experiences for our digital products and platforms.",
    requirements: [
      "Portfolio demonstrating UI/UX design skills",
      "Proficiency in Figma, Adobe XD or Sketch",
      "Understanding of user-centered design principles",
      "Experience with prototyping and user testing",
    ],
    responsibilities: [
      "Design wireframes and interactive prototypes",
      "Conduct user research and usability testing",
      "Collaborate with developers on implementation",
      "Maintain design systems and style guides",
    ],
  },
  {
    id: 3,
    slug: "it-help-desk-technician",
    title: "IT Help Desk Technician",
    category: "IT Support",
    location: "Dubai",
    type: "Full Time",
    experience: "2+ years",
    description:
      "Provide technical support and troubleshooting for our internal systems and employees.",
    requirements: [
      "Knowledge of Windows/Mac operating systems",
      "Experience with troubleshooting hardware/software",
      "Excellent communication and customer service skills",
      "Basic networking knowledge",
    ],
    responsibilities: [
      "Respond to IT support tickets and requests",
      "Set up and configure workstations and equipment",
      "Maintain IT documentation and knowledge base",
      "Escalate complex issues to appropriate teams",
    ],
  },
  {
    id: 4,
    slug: "software-security-engineer",
    title: "Software Security Engineer",
    category: "Security",
    location: "Dubai",
    type: "Full Time",
    experience: "4+ years",
    description:
      "Protect our systems and applications by implementing robust security measures.",
    requirements: [
      "Experience with security frameworks and standards",
      "Knowledge of penetration testing tools",
      "Understanding of OWASP Top 10 vulnerabilities",
      "Relevant certifications (CEH, CISSP) preferred",
    ],
    responsibilities: [
      "Conduct security assessments and audits",
      "Implement security controls and best practices",
      "Monitor systems for vulnerabilities",
      "Respond to security incidents",
    ],
  },
  {
    id: 5,
    slug: "mobile-developer",
    title: "Mobile Developer",
    category: "Development",
    location: "Dubai",
    type: "Full Time",
    experience: "3+ years",
    description:
      "Build and maintain high-quality mobile applications for our clients and platforms.",
    requirements: [
      "Experience with React Native or Flutter",
      "Strong knowledge of mobile UI/UX principles",
      "Understanding of REST APIs and mobile security",
      "Published apps in app stores",
    ],
    responsibilities: [
      "Develop cross-platform mobile applications",
      "Collaborate with designers on UI implementation",
      "Write clean, maintainable code",
      "Optimize app performance",
    ],
  },
  {
    id: 6,
    slug: "devops-engineer",
    title: "DevOps Engineer",
    category: "Development",
    location: "Dubai",
    type: "Full Time",
    experience: "3+ years",
    description:
      "Implement and maintain our CI/CD pipelines and cloud infrastructure.",
    requirements: [
      "Experience with AWS/Azure/GCP",
      "Knowledge of CI/CD tools and practices",
      "Infrastructure as code (Terraform, Ansible)",
      "Containerization experience (Docker, Kubernetes)",
    ],
    responsibilities: [
      "Design and maintain CI/CD pipelines",
      "Automate infrastructure provisioning",
      "Monitor system performance",
      "Ensure high availability of services",
    ],
  },
  {
    id: 7,
    slug: "data-analyst",
    title: "Data Analyst",
    category: "Analytics",
    location: "Dubai",
    type: "Full Time",
    experience: "2+ years",
    description:
      "Transform data into actionable insights to drive business decisions.",
    requirements: [
      "Proficiency in SQL and Python/R",
      "Experience with data visualization tools",
      "Strong analytical and statistical skills",
      "Understanding of data warehousing concepts",
    ],
    responsibilities: [
      "Analyze large datasets",
      "Create reports and dashboards",
      "Identify trends and patterns",
      "Support data-driven decision making",
    ],
  },
  {
    id: 8,
    slug: "qa-engineer",
    title: "QA Engineer",
    category: "Quality Assurance",
    location: "Dubai",
    type: "Full Time",
    experience: "2+ years",
    description:
      "Ensure the quality of our software products through rigorous testing.",
    requirements: [
      "Experience with testing methodologies",
      "Knowledge of test automation frameworks",
      "Attention to detail",
      "Bug tracking system experience",
    ],
    responsibilities: [
      "Develop test plans and cases",
      "Execute manual and automated tests",
      "Report and track defects",
      "Collaborate with developers",
    ],
  },
  // Fresher/Entry-level positions
  {
    id: 9,
    slug: "junior-software-developer",
    title: "Junior Software Developer",
    category: "Development",
    location: "Dubai",
    type: "Full Time",
    experience: "0-1 years",
    description:
      "Entry-level position for recent graduates to start their career in software development.",
    requirements: [
      "Bachelor's in Computer Science or related",
      "Basic programming knowledge",
      "Eagerness to learn new technologies",
      "Strong problem-solving skills",
    ],
    responsibilities: [
      "Assist in software development tasks",
      "Learn and apply coding best practices",
      "Participate in code reviews",
      "Support senior developers",
    ],
  },
  {
    id: 10,
    slug: "graduate-trainee",
    title: "Graduate Trainee",
    category: "Management",
    location: "Dubai",
    type: "Full Time",
    experience: "0 years",
    description:
      "Training program for fresh graduates to develop business and management skills.",
    requirements: [
      "Recent university graduate",
      "Strong academic record",
      "Leadership potential",
      "Excellent communication skills",
    ],
    responsibilities: [
      "Rotate through different departments",
      "Complete training assignments",
      "Assist managers with projects",
      "Learn company operations",
    ],
  },
  // Internship positions
  {
    id: 11,
    slug: "software-development-intern",
    title: "Software Development Intern",
    category: "Development",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description:
      "Paid internship opportunity for students to gain real-world development experience.",
    requirements: [
      "Currently pursuing Computer Science degree",
      "Basic programming knowledge",
      "Available for 3-6 months",
      "Passion for technology",
    ],
    responsibilities: [
      "Assist with coding tasks",
      "Participate in team meetings",
      "Learn development workflows",
      "Complete assigned projects",
    ],
  },
  {
    id: 12,
    slug: "marketing-intern",
    title: "Marketing Intern",
    category: "Marketing",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description:
      "Opportunity to learn digital marketing strategies and campaign management.",
    requirements: [
      "Marketing or business student",
      "Basic understanding of digital marketing",
      "Creative thinking",
      "Social media savvy",
    ],
    responsibilities: [
      "Assist with content creation",
      "Support social media management",
      "Help with campaign tracking",
      "Conduct market research",
    ],
  },
  {
    id: 13,
    slug: "hr-intern",
    title: "HR Intern",
    category: "Human Resources",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description:
      "Gain experience in recruitment, employee engagement and HR operations.",
    requirements: [
      "HR or business administration student",
      "Good interpersonal skills",
      "Organizational abilities",
      "Discretion with confidential information",
    ],
    responsibilities: [
      "Assist with recruitment processes",
      "Help organize employee events",
      "Maintain HR records",
      "Support onboarding activities",
    ],
  },
  {
    id: 14,
    slug: "data-science-intern",
    title: "Data Science Intern",
    category: "Analytics",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description:
      "Work with our data team to analyze datasets and build predictive models.",
    requirements: [
      "Computer Science/Statistics student",
      "Basic Python/R knowledge",
      "Understanding of statistics",
      "Interest in machine learning",
    ],
    responsibilities: [
      "Clean and analyze data",
      "Create visualizations",
      "Assist with model development",
      "Document findings",
    ],
  },
  {
    id: 15,
    slug: "graphic-design-intern",
    title: "Graphic Design Intern",
    category: "Design",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description:
      "Create visual content and assist our design team with various projects.",
    requirements: [
      "Design or art student",
      "Proficiency in Adobe Creative Suite",
      "Creative portfolio",
      "Attention to detail",
    ],
    responsibilities: [
      "Create social media graphics",
      "Assist with branding projects",
      "Prepare design assets",
      "Participate in creative sessions",
    ],
  },
  {
    id: 16,
    slug: "business-development-intern",
    title: "Business Development Intern",
    category: "Business",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description:
      "Learn sales strategies and help identify new business opportunities.",
    requirements: [
      "Business or marketing student",
      "Strong communication skills",
      "Research abilities",
      "Professional demeanor",
    ],
    responsibilities: [
      "Conduct market research",
      "Assist with client outreach",
      "Prepare business proposals",
      "Attend client meetings",
    ],
  },
  {
    id: 17,
    slug: "cybersecurity-intern",
    title: "Cybersecurity Intern",
    category: "Security",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description:
      "Gain hands-on experience in cybersecurity operations and threat analysis.",
    requirements: [
      "Computer Science/IT student",
      "Interest in cybersecurity",
      "Basic networking knowledge",
      "Problem-solving mindset",
    ],
    responsibilities: [
      "Assist with security monitoring",
      "Research security threats",
      "Help document security policies",
      "Participate in security audits",
    ],
  },
  {
    id: 18,
    slug: "finance-intern",
    title: "Finance Intern",
    category: "Finance",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description:
      "Learn financial analysis and accounting processes in a corporate environment.",
    requirements: [
      "Finance/Accounting student",
      "Basic Excel skills",
      "Analytical thinking",
      "Attention to detail",
    ],
    responsibilities: [
      "Assist with financial reporting",
      "Help with budget preparation",
      "Process invoices",
      "Support audit preparation",
    ],
  },
  {
    id: 19,
    slug: 'web-developer',
    title: 'Web Developer',
    category: 'Development',
    location: 'Dubai',
    type: 'Full Time',
    experience: '3+ years',
    description: 'Design, develop and maintain responsive web applications using modern technologies.',
    requirements: [
      'Proficient in HTML5, CSS3, and JavaScript/TypeScript',
      'Experience with React.js/Next.js or similar frameworks',
      'Knowledge of RESTful APIs and GraphQL',
      'Understanding of responsive design principles',
      'Familiarity with version control (Git)',
      'Experience with testing frameworks (Jest, Cypress)'
    ],
    responsibilities: [
      'Develop and maintain web applications',
      'Collaborate with designers to implement UI/UX',
      'Optimize applications for maximum speed and scalability',
      'Write clean, maintainable, and efficient code',
      'Participate in code reviews',
      'Troubleshoot and debug applications'
    ]
  }
];


export default function CareersPage() {
  const [selectedCategory, setSelectedCategory] = React.useState("All Job Category");
  const [selectedType, setSelectedType] = React.useState("All Job Type");
  const [selectedLocation, setSelectedLocation] = React.useState("All Job Location");
  
  // Intersection observers for different sections
  const [bannerRef, bannerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [opportunitiesRef, opportunitiesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [filtersRef, filtersInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [jobsRef, jobsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filteredJobs = jobListings.filter((job) => {
    const matchesCategory =
      selectedCategory === "All Job Category" || job.category === selectedCategory;
    const matchesType =
      selectedType === "All Job Type" || job.type === selectedType;
    const matchesLocation =
      selectedLocation === "All Job Location" || job.location === selectedLocation;
    return matchesCategory && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Banner Section */}
      <motion.section
        ref={bannerRef}
        className="relative py-8 md:py-12 lg:py-20 bg-gradient-to-br from-cyan-900 to-blue-800 overflow-hidden"
        initial="hidden"
        animate={bannerInView ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated background elements */}
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
                  We're Hiring Talents
                </motion.div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 md:mb-4 lg:mb-6">
                  Join Our <span className='text-blue-500'>Growing Team</span>
                </h1>
                <p className="text-sm md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                  Explore exciting career opportunities and be part of our innovative team. We're looking for passionate individuals to help us shape the future of technology.
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
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Career Opportunities"
                className="w-full h-48 md:h-64 lg:h-80 xl:h-96 object-cover rounded-xl md:rounded-2xl shadow-2xl"
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Opportunities Section */}
      <motion.section
        ref={opportunitiesRef}
        initial="hidden"
        animate={opportunitiesInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.h2 
          variants={fadeInUp}
          className="mb-12 text-center text-3xl font-bold dark:text-white"
        >
          Current Opportunities
        </motion.h2>

        {/* Filter Section */}
        <motion.div
          ref={filtersRef}
          initial="hidden"
          animate={filtersInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.div variants={fadeInUp}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-full bg-white text-gray-700 dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
          
         
            >
              <option value="All Job Category">All Categories</option>
              {Array.from(new Set(jobListings.map(job => job.category))).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border rounded-full bg-white text-gray-700 dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
       
            
            >
              <option value="All Job Type">All Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Internship">Internship</option>
            </select>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border rounded-full bg-white text-gray-700 dark:bg-neutral-800 dark:text-white dark:border-neutral-700"
       
 
            >
              <option value="All Job Location">All Locations</option>
              {Array.from(new Set(jobListings.map(job => job.location))).map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </motion.div>
        </motion.div>

        {/* Job Listings */}
        <motion.div
          ref={jobsRef}
          initial="hidden"
          animate={jobsInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
        >
          <AnimatePresence>
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                variants={scaleUp}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-xl bg-white p-4 shadow-lg transition-all duration-300 ease-in-out 
                           transform hover:shadow-xl hover:z-10 
                           dark:bg-neutral-800 dark:hover:shadow-neutral-700/30
                           sm:p-6 flex flex-col h-full"
                whileHover={{ y: -5 }}
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white sm:text-xl">
                    {job.title}
                  </h3>

                  <div className="mt-2 flex flex-col gap-1 text-gray-600 dark:text-gray-300 sm:flex-row sm:items-center sm:gap-2">
                    <span className="text-sm sm:text-base">{job.type}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-sm sm:text-base">{job.location}</span>
                  </div>

                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <motion.span
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 
                                 rounded-full px-2.5 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm 
                                 dark:text-white/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {job.category}
                    </motion.span>
                    <motion.span
                      className="bg-green-100 text-green-800 dark:bg-green-900 
                                 rounded-full px-2.5 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm 
                                 dark:text-white/90 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {job.experience}
                    </motion.span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/careers/${job.slug}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-[transform] duration-200 group"
                  >
                    View Details
                    <svg
                      className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredJobs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400">
              No jobs found matching your criteria.
            </p>
          </motion.div>
        )}
      </motion.section>
    </div>
  );
}