import { User, Target, Heart, Lightbulb } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const highlights = [
  {
    icon: User,
    title: 'Who I Am',
    description: 'A dedicated BSIT student with a passion for technology and continuous learning.',
    colSpan: 'sm:col-span-2'
  },
  {
    icon: Target,
    title: 'My Goal',
    description: 'To become a skilled full-stack developer and contribute to innovative tech.',
    colSpan: 'sm:col-span-1'
  },
  {
    icon: Heart,
    title: 'What I Love',
    description: 'Building web applications, exploring AI/ML, and solving complex problems.',
    colSpan: 'sm:col-span-1'
  },
  {
    icon: Lightbulb,
    title: 'My Approach',
    description: 'Combining creativity with technical skills to create impactful digital experiences.',
    colSpan: 'sm:col-span-2'
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 80, damping: 20 } 
  }
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-card/30">
      <motion.div 
        className="section-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Hello! I'm <span className="text-foreground font-semibold">Joseph T. Lopez</span>, 
              a passionate BSIT student at Bestlink College of the Philippines. I'm currently 
              in my 4th year, first semester, and I'm deeply invested in building web 
              applications and learning modern technologies.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I chose Information Technology because of my fascination with how technology 
              shapes our world. From creating simple websites to exploring the possibilities 
              of artificial intelligence, I'm constantly driven to learn and grow.
            </p>
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-4">Areas of Interest</h3>
              <div className="flex flex-wrap gap-3">
                {['Web Development', 'App Development', 'Artificial Intelligence', 'Networking', 'Cybersecurity', 'Database Management'].map((interest, idx) => (
                  <motion.span
                    key={interest}
                    className="skill-badge hover:bg-primary hover:text-primary-foreground cursor-default"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content - Highlight Cards in Bento Style */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={containerVariants}
          >
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`glass-card hover-card p-6 group flex flex-col justify-center ${item.colSpan}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shrink-0">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
