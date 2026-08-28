import { FileDown, Eye, FileText, Mail, Phone, MapPin, User, Briefcase, GraduationCap, Award, Code, Github, Linkedin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ResumeSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="resume" className="py-20 md:py-32">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-title">Resume / CV</h2>
          <p className="section-subtitle mx-auto">
            A comprehensive overview of my qualifications and experience
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Resume Content */}
          <div className="glass-card hover-card p-8 md:p-12 relative overflow-hidden mb-8">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            
            <div className="relative space-y-8">
              {/* Header Section */}
              <div className="text-center border-b border-border pb-6">
                <h3 className="text-3xl md:text-4xl font-bold mb-2">Joseph T. Lopez</h3>
                <p className="text-lg md:text-xl text-primary font-semibold mb-4">
                  Bachelor of Science in Information Technology
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>josephlopez102004@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>+63-956-034-4827</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Quezon City, Metro Manila</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github size={16} />
                    <span>github.com/JosephLopezzzz</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin size={16} />
                    <span>linkedin.com/in/joseph-lopez-5a2090412</span>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <User className="text-primary" size={24} />
                  <h4 className="text-xl font-semibold">Professional Summary</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Aspiring Web Developer and AI Engineer currently pursuing a Bachelor of Science in Information Technology 
                  at Bestlink College of the Philippines. Passionate about building innovative web applications and exploring 
                  artificial intelligence concepts. Strong foundation in programming languages, web technologies, and database 
                  management. Committed to continuous learning and contributing to impactful technology solutions.
                </p>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="text-primary" size={24} />
                  <h4 className="text-xl font-semibold">Education</h4>
                </div>
                <div className="space-y-4">
                  <div className="pl-8 border-l-2 border-primary/30">
                    <h5 className="font-semibold text-lg mb-1">
                      Bachelor of Science in Information Technology
                    </h5>
                    <p className="text-primary font-medium mb-2">Bestlink College of the Philippines</p>
                    <p className="text-sm text-muted-foreground">
                      4th Year, 1st Semester • Expected Graduation: 2027
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Web Development', 'Database Management', 'Networking', 'Systems Analysis', 'Object-Oriented Programming', 'Data Structures'].map((subject) => (
                        <span key={subject} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Code className="text-primary" size={24} />
                  <h4 className="text-xl font-semibold">Technical Skills</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Programming Languages</h5>
                    <p className="text-sm text-muted-foreground">
                      JavaScript/TypeScript, PHP, Python, HTML/CSS
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Frameworks & Tools</h5>
                    <p className="text-sm text-muted-foreground">
                      React, Node.js, Express.js, React Native, Expo, Next.js, Git, REST APIs, Tailwind CSS
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Databases</h5>
                    <p className="text-sm text-muted-foreground">
                      MySQL, PostgreSQL, Supabase
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications & Trainings */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Award className="text-primary" size={24} />
                  <h4 className="text-xl font-semibold">Certifications & Trainings</h4>
                </div>
                <div className="space-y-3">
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">Prompt Like an Engineer</h5>
                    <p className="text-sm text-muted-foreground">Cisco Networking Academy</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">HTML Fundamentals</h5>
                    <p className="text-sm text-muted-foreground">Coddy Team</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">HTML Styling with CSS</h5>
                    <p className="text-sm text-muted-foreground">Coddy Team</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">HTML CSS Mastery</h5>
                    <p className="text-sm text-muted-foreground">Coddy Team</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">HTML JavaScript in Action</h5>
                    <p className="text-sm text-muted-foreground">Coddy Team</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">HTML Practical Frontend</h5>
                    <p className="text-sm text-muted-foreground">Coddy Team</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">C Fundamentals</h5>
                    <p className="text-sm text-muted-foreground">Coddy Team</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">Python Certification</h5>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">freeCodeCamp</h5>
                  </div>
                </div>
              </div>

              {/* Projects/Experience */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="text-primary" size={24} />
                  <h4 className="text-xl font-semibold">Projects & Activities</h4>
                </div>
                <div className="space-y-4">
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">Fraud Detection System in Microfinance</h5>
                    <p className="text-sm text-muted-foreground mb-1">React, TypeScript, Express.js, Supabase • 2026</p>
                    <p className="text-sm text-muted-foreground">Web-based microfinance system with rule-based fraud detection for risk alerts.</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">Inn Nexus — Hotel Management System</h5>
                    <p className="text-sm text-muted-foreground mb-1">PHP, MySQL, Tailwind CSS, REST API • 2026</p>
                    <p className="text-sm text-muted-foreground">Web-based hotel management system with 2FA, password hashing, and session management.</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">FleetOps — Fleet & Transportation Management System</h5>
                    <p className="text-sm text-muted-foreground mb-1">Next.js, React Native, Supabase, PostgreSQL • 2026 - Ongoing</p>
                    <p className="text-sm text-muted-foreground">Web and mobile transportation management for reservations and vehicle scheduling.</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">EGOVPH HACKATON - eRescue App</h5>
                    <p className="text-sm text-muted-foreground mb-1">Programmer • July 2026</p>
                    <p className="text-sm text-muted-foreground">Created eRescue, an interactive map app integrated with eGov ph to guide citizens to evacuation centers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/resume.pdf"
              download="Joseph_Lopez_Resume.pdf"
              className="btn-primary"
            >
              <FileDown size={18} />
              Download PDF Resume
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Eye size={18} />
              View PDF Online
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
