"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaBriefcase, 
  FaArrowLeft, 
  FaCheckCircle,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaFileUpload,
  FaSpinner
} from 'react-icons/fa';

const jobData = {
  'supply-chain-manager': {
    id: 1,
    title: "Supply Chain Manager",
    category: "Logistics",
    location: "Dubai",
    type: "Full Time",
    experience: "5+ years",
    description: "Lead our supply chain operations and optimize logistics processes to ensure efficient delivery of products and services.",
    longDescription: "As a Supply Chain Manager, you will be responsible for overseeing and managing our company's overall supply chain and logistics strategy to maximize efficiency and productivity. You'll play a crucial role in developing and maintaining good relationships with vendors and distributors.",
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
    ]
  },
  'ui-ux-designer': {
    id: 2,
    title: "UI/UX Designer",
    category: "Design",
    location: "Dubai",
    type: "Full Time",
    experience: "3+ years",
    description: "Create intuitive and engaging user experiences for our digital products and platforms.",
    longDescription: "As a UI/UX Designer, you'll be responsible for creating amazing user experiences. You should have an eye for clean and artful design, possess superior UI skills and be able to translate high-level requirements into interaction flows and artifacts.",
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
    ]
  },
  'it-help-desk-technician': {
    id: 3,
    title: "IT Help Desk Technician",
    category: "IT Support",
    location: "Dubai",
    type: "Full Time",
    experience: "2+ years",
    description: "Provide technical support and troubleshooting for our internal systems and employees.",
    longDescription: "As an IT Help Desk Technician, you will be the first point of contact for employees seeking technical assistance. You will perform remote troubleshooting through diagnostic techniques and pertinent questions and determine the best solution based on the issue and details provided.",
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
    ]
  },
  'software-security-engineer': {
    id: 4,
    title: "Software Security Engineer",
    category: "Security",
    location: "Dubai",
    type: "Full Time",
    experience: "4+ years",
    description: "Protect our systems and applications by implementing robust security measures.",
    longDescription: "As a Software Security Engineer, you will be responsible for identifying and remediating vulnerabilities in our software and infrastructure. You'll work closely with development teams to implement security best practices throughout the SDLC.",
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
    ]
  },
  'mobile-developer': {
    id: 5,
    title: "Mobile Developer",
    category: "Development",
    location: "Dubai",
    type: "Full Time",
    experience: "3+ years",
    description: "Build and maintain high-quality mobile applications for our clients and platforms.",
    longDescription: "As a Mobile Developer, you'll create performant mobile apps on iOS and Android platforms. You'll work closely with our product and design teams to build features that will directly impact our users.",
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
    ]
  },
  'devops-engineer': {
    id: 6,
    title: "DevOps Engineer",
    category: "Development",
    location: "Dubai",
    type: "Full Time",
    experience: "3+ years",
    description: "Implement and maintain our CI/CD pipelines and cloud infrastructure.",
    longDescription: "As a DevOps Engineer, you will be responsible for deploying product updates, identifying production issues, and implementing integrations that meet our customers' needs. You will work closely with software developers to ensure that development follows established processes.",
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
    ]
  },
  'data-analyst': {
    id: 7,
    title: "Data Analyst",
    category: "Analytics",
    location: "Dubai",
    type: "Full Time",
    experience: "2+ years",
    description: "Transform data into actionable insights to drive business decisions.",
    longDescription: "As a Data Analyst, you will turn data into information, information into insight, and insight into business decisions. You will conduct full lifecycle analysis to include requirements, activities, and design. Data analysts will develop analysis and reporting capabilities.",
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
    ]
  },
  'qa-engineer': {
    id: 8,
    title: "QA Engineer",
    category: "Quality Assurance",
    location: "Dubai",
    type: "Full Time",
    experience: "2+ years",
    description: "Ensure the quality of our software products through rigorous testing.",
    longDescription: "As a QA Engineer, you will be responsible for creating and implementing a strategy for quality coordination and testing as well as suggesting solutions to identified quality problems. You will estimate, prioritize, plan and coordinate testing activities.",
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
    ]
  },
  'junior-software-developer': {
    id: 9,
    title: "Junior Software Developer",
    category: "Development",
    location: "Dubai",
    type: "Full Time",
    experience: "0-1 years",
    description: "Entry-level position for recent graduates to start their career in software development.",
    longDescription: "As a Junior Software Developer, you will work with our team of talented engineers to design and build the next generation of our applications. This is an excellent opportunity to launch your career while working with cutting-edge technologies.",
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
    ]
  },
  'graduate-trainee': {
    id: 10,
    title: "Graduate Trainee",
    category: "Management",
    location: "Dubai",
    type: "Full Time",
    experience: "0 years",
    description: "Training program for fresh graduates to develop business and management skills.",
    longDescription: "Our Graduate Trainee program is designed to give recent graduates hands-on experience across various business functions. You'll rotate through different departments, gaining exposure to all aspects of our operations while working on meaningful projects.",
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
    ]
  },
  'software-development-intern': {
    id: 11,
    title: "Software Development Intern",
    category: "Development",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description: "Paid internship opportunity for students to gain real-world development experience.",
    longDescription: "As a Software Development Intern, you'll work alongside our engineering team to build and maintain software applications. You'll gain hands-on experience with modern development tools and methodologies while contributing to real projects.",
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
    ]
  },
  'marketing-intern': {
    id: 12,
    title: "Marketing Intern",
    category: "Marketing",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description: "Opportunity to learn digital marketing strategies and campaign management.",
    longDescription: "As a Marketing Intern, you'll assist our marketing team in executing campaigns across various channels. You'll gain exposure to digital marketing, content creation, social media management, and analytics.",
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
    ]
  },
  'hr-intern': {
    id: 13,
    title: "HR Intern",
    category: "Human Resources",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description: "Gain experience in recruitment, employee engagement and HR operations.",
    longDescription: "As an HR Intern, you'll support our HR team in various functions including recruitment, onboarding, employee engagement, and HR administration. This is an excellent opportunity to gain exposure to all aspects of HR in a corporate setting.",
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
    ]
  },
  'data-science-intern': {
    id: 14,
    title: "Data Science Intern",
    category: "Analytics",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description: "Work with our data team to analyze datasets and build predictive models.",
    longDescription: "As a Data Science Intern, you'll work with our data science team to analyze complex datasets, build models, and derive insights. You'll gain hands-on experience with data cleaning, visualization, and machine learning techniques.",
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
    ]
  },
  'graphic-design-intern': {
    id: 15,
    title: "Graphic Design Intern",
    category: "Design",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description: "Create visual content and assist our design team with various projects.",
    longDescription: "As a Graphic Design Intern, you'll work with our creative team to produce visual content for digital and print media. You'll gain experience with branding, marketing materials, social media graphics, and more.",
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
    ]
  },
  'business-development-intern': {
    id: 16,
    title: "Business Development Intern",
    category: "Business",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description: "Learn sales strategies and help identify new business opportunities.",
    longDescription: "As a Business Development Intern, you'll support our sales and business development teams in identifying new opportunities, researching potential clients, and assisting with outreach efforts.",
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
    ]
  },
  'cybersecurity-intern': {
    id: 17,
    title: "Cybersecurity Intern",
    category: "Security",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description: "Gain hands-on experience in cybersecurity operations and threat analysis.",
    longDescription: "As a Cybersecurity Intern, you'll work with our security team to monitor systems, research threats, and assist with security audits. You'll gain exposure to real-world security challenges and solutions.",
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
    ]
  },
  'finance-intern': {
    id: 18,
    title: "Finance Intern",
    category: "Finance",
    location: "Dubai",
    type: "Internship",
    experience: "Student",
    description: "Learn financial analysis and accounting processes in a corporate environment.",
    longDescription: "As a Finance Intern, you'll support our finance team with reporting, budgeting, and accounting tasks. You'll gain exposure to financial operations in a corporate setting.",
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
    ]
  },
  'web-developer': {
    id: 19,
    title: "Web Developer",
    category: "Development",
    location: "Dubai",
    type: "Full Time",
    experience: "3+ years",
    description: "Design, develop and maintain responsive web applications using modern technologies.",
    longDescription: "As a Web Developer, you will be responsible for designing, coding, and modifying websites from layout to function according to specifications. You will strive to create visually appealing sites that feature user-friendly design and clear navigation.",
    requirements: [
      "Proficient in HTML5, CSS3, and JavaScript/TypeScript",
      "Experience with React.js/Next.js or similar frameworks",
      "Knowledge of RESTful APIs and GraphQL",
      "Understanding of responsive design principles",
      "Familiarity with version control (Git)",
      "Experience with testing frameworks (Jest, Cypress)"
    ],
    responsibilities: [
      "Develop and maintain web applications",
      "Collaborate with designers to implement UI/UX",
      "Optimize applications for maximum speed and scalability",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews",
      "Troubleshoot and debug applications"
    ]
  }
};

interface JobDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function JobDetail({ params }: JobDetailProps) {
  const [slug, setSlug] = useState<string>('');
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const initializeParams = async () => {
      try {
        const resolvedParams = await params;
        const currentSlug = resolvedParams.slug;
        setSlug(currentSlug);
        
        const currentJob = jobData[currentSlug as keyof typeof jobData];
        if (!currentJob) {
          notFound();
        }
        setJob(currentJob);
      } catch (error) {
        console.error('Error resolving params:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    initializeParams();
  }, [params]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files![0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('jobTitle', job.title);
      formDataToSend.append('jobSlug', slug);
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      const response = await fetch('/api/job-applications', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage('Application submitted successfully! We will contact you soon.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          coverLetter: '',
          resume: null
        });
        // Reset file input
        const fileInput = document.getElementById('resume') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setSubmitMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setSubmitMessage('An error occurred while submitting your application.');
    }
    
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <FaSpinner className="animate-spin text-3xl text-blue-600" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <Link href="/careers" className="text-blue-600 hover:text-blue-700">
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
         <Link 
  href="/careers"
  className="group inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium text-sm"
>
  <FaArrowLeft className="mr-2 text-xs transition-transform duration-200 group-hover:-translate-x-1" />
  Back to Careers
</Link>


          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{job.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center">
                  <FaBriefcase className="mr-2 text-xs" />
                  {job.category}
                </span>
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-xs" />
                  {job.location}
                </span>
                <span className="flex items-center">
                  <FaClock className="mr-2 text-xs" />
                  {job.type}
                </span>
                {job.experience && (
                  <span className="flex items-center">
                    <FaBriefcase className="mr-2 text-xs" />
                    {job.experience}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>
              <p className="text-gray-700 leading-relaxed">{job.longDescription}</p>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h2>
              <ul className="space-y-2">
                {job.responsibilities.map((responsibility: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 text-sm">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((requirement: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-600 mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 text-sm">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Apply for this Position</h2>
              
              {submitMessage && (
                <div className={`mb-4 p-3 text-sm border ${
                  submitMessage.includes('successfully') 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Letter *
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Tell us why you're the right fit for this role..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resume/CV *
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (max 5MB)</p>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-600 leading-4">
                    I agree to the processing and storage of my personal data in accordance with the company's privacy policy. *
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Submitting Application...
                    </span>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}