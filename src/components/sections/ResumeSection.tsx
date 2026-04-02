import { FileDown, Eye, FileText, Mail, Phone, MapPin, User, Briefcase, GraduationCap, Award, Code } from 'lucide-react';
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
                <h3 className="text-3xl md:text-4xl font-bold mb-2">Joseph Lopez</h3>
                <p className="text-lg md:text-xl text-primary font-semibold mb-4">
                  Bachelor of Science in Information Technology
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>joseph.lopez@email.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>+63 XXX XXX XXXX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Philippines</span>
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
                      3rd Year, 2nd Semester • Expected Graduation: 2027
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
                      HTML5, CSS3, JavaScript, Python, Java, PHP
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Frameworks & Tools</h5>
                    <p className="text-sm text-muted-foreground">
                      React, Bootstrap, Tailwind CSS, Git, GitHub, VS Code
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Databases</h5>
                    <p className="text-sm text-muted-foreground">
                      MySQL, MongoDB
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Other Skills</h5>
                    <p className="text-sm text-muted-foreground">
                      Networking, Troubleshooting, System Administration
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
                    <h5 className="font-medium">Google IT Support Professional Certificate</h5>
                    <p className="text-sm text-muted-foreground">Google via Coursera • In Progress</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">Cisco IT Essentials</h5>
                    <p className="text-sm text-muted-foreground">Cisco Networking Academy • In Progress</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/20">
                    <h5 className="font-medium">Web Development Fundamentals</h5>
                    <p className="text-sm text-muted-foreground">Udemy • In Progress</p>
                  </div>
                </div>
              </div>

              {/* Projects/Experience */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="text-primary" size={24} />
                  <h4 className="text-xl font-semibold">Projects & Experience</h4>
                </div>
                <p className="text-muted-foreground">
                  Actively working on web development projects and exploring AI/ML concepts. 
                  Building portfolio projects to showcase technical skills and problem-solving abilities.
                </p>
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
              href="/cert/resume.pdf"
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
