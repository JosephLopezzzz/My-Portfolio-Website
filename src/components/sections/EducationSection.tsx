import { GraduationCap, BookOpen, Calendar } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const subjects = [
  'Web Development',
  'Database Management',
  'Networking',
  'Systems Analysis',
  'Object-Oriented Programming',
  'Data Structures',
];

const EducationSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="education" className="py-20 md:py-32">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle mx-auto">
            My academic journey and background
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Main Education Card */}
          <div className="glass-card hover-card p-8 md:p-10 relative overflow-hidden">
            {/* Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            
            <div className="relative">
              {/* Icon and Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Currently Enrolled
                </div>
              </div>

              {/* Degree Info */}
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Bachelor of Science in Information Technology
              </h3>
              <p className="text-lg text-primary font-semibold mb-4">
                Bestlink College of the Philippines
              </p>

              {/* Details */}
              <div className="flex flex-wrap gap-4 mb-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>3rd Year, 2nd Semester</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={18} />
                  <span>Expected Graduation: 2027</span>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="text-lg font-semibold mb-4">Relevant Subjects</h4>
                <div className="flex flex-wrap gap-3">
                  {subjects.map((subject, index) => (
                    <span
                      key={subject}
                      className="skill-badge"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default EducationSection;
