import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Line, Sphere, Stars, Text } from "@react-three/drei";
import { ArrowRight, BookOpen, BrainCircuit, Calculator, FlaskConical, GraduationCap, Lightbulb, Sparkles, TrendingUp, Users } from "lucide-react";
import { FaJava } from "react-icons/fa";
import { SiPython } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { TeacherCard } from "@/components/TeacherCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { teachers } from "@/data/teachers";
import { testimonials } from "@/data/testimonials";
import "./HomePage.css";

const floatingElements = [
  "H2O + CO2 -> C6H12O6 + O2",
  "pH = -log[H+]",
  "NaCl + AgNO3 -> AgCl",
  "CH4 + 2O2 -> CO2 + 2H2O",
  "PV = nRT",
  "Molarity = moles / liter",
  "DNA -> RNA -> Protein",
  "Lab + Logic = Discovery",
];

const stack = [
  { name: "Java", icon: FaJava },
  { name: "Python", icon: SiPython },
  { name: "English", icon: BookOpen },
  { name: "Science", icon: FlaskConical },
  { name: "Maths", icon: Calculator },
];

const atoms = [
  { id: "a", position: [0, 0, 0], color: "#68d6ff", size: 0.34 },
  { id: "b", position: [1.3, 0.6, -0.4], color: "#6f88ff", size: 0.24 },
  { id: "c", position: [-1.25, 0.7, 0.5], color: "#7af2d1", size: 0.26 },
  { id: "d", position: [0.2, -1.2, 0.7], color: "#f2d36e", size: 0.22 },
  { id: "e", position: [-0.9, -0.95, -0.75], color: "#bba3ff", size: 0.2 },
];

const bonds = [
  [atoms[0].position, atoms[1].position],
  [atoms[0].position, atoms[2].position],
  [atoms[0].position, atoms[3].position],
  [atoms[0].position, atoms[4].position],
  [atoms[2].position, atoms[3].position],
];

const HeroCore = () => (
  <>
    <ambientLight intensity={1.1} />
    <directionalLight intensity={1.15} position={[3, 2, 3]} />
    <Stars radius={75} depth={24} count={600} factor={2} fade />
    <Float speed={1.5} rotationIntensity={0.9} floatIntensity={1.25}>
      {bonds.map((points, index) => (
        <Line key={`bond-${index}`} points={points} color="#9ab6ff" lineWidth={1.2} transparent opacity={0.9} />
      ))}
      {atoms.map((atom) => (
        <Sphere key={atom.id} args={[atom.size, 32, 32]} position={atom.position}>
          <meshStandardMaterial color={atom.color} roughness={0.3} metalness={0.4} emissive={atom.color} emissiveIntensity={0.25} />
        </Sphere>
      ))}
    </Float>
    <Float speed={2.2} rotationIntensity={0.7} floatIntensity={1.6}>
      <Text fontSize={0.45} color="#8cf7ff" anchorX="center" anchorY="middle" position={[0, -2.1, 0]}>
        BrainBuzz Lab
      </Text>
    </Float>
    <Environment preset="studio" />
  </>
);

export const HomePage = ({ onNavigate, onViewTeacher }) => {
  const [splashPhase, setSplashPhase] = useState("brain");
  const featuredTeachers = teachers.slice(0, 3);
  const displayedTestimonials = testimonials.slice(0, 3);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.24], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [0.56, 0.2]);
  const contentLift = useTransform(scrollYProgress, [0, 0.35], [0, -70]);
  const floatingDrift = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const bulbTimer = setTimeout(() => setSplashPhase("bulb"), 1000);
    const burstTimer = setTimeout(() => setSplashPhase("flash"), 1900);
    const exitTimer = setTimeout(() => setSplashPhase("done"), 3500);
    return () => {
      clearTimeout(bulbTimer);
      clearTimeout(burstTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <div className="bb-home">
      <motion.div className="bb-scroll-progress" style={{ width: progressWidth }} />
      <AnimatePresence>
        {splashPhase !== "done" && (
          <motion.section
            className={`bb-splash ${splashPhase === "flash" ? "bb-splash-burst" : ""}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: splashPhase === "flash" ? 0.95 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="bb-splash-icon-stack" aria-hidden>
              <motion.div
                className="bb-splash-brain"
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: splashPhase === "flash" ? 1.35 : 1, y: 0 }}
                transition={{ duration: 0.65 }}
              >
                <BrainCircuit size={78} strokeWidth={1.6} />
              </motion.div>
              <motion.div
                className={`bb-splash-bulb ${splashPhase !== "brain" ? "is-on" : ""}`}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 1, y: 0, scale: splashPhase === "flash" ? 1.1 : 1 }}
                transition={{ duration: 0.45 }}
              >
                <Lightbulb size={34} strokeWidth={1.8} />
              </motion.div>
            </div>
            <motion.h1
              className="bb-splash-title"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              BrainBuzz
            </motion.h1>
            <p className="bb-splash-subtitle">From idea to illumination...</p>
            <motion.div
              className="bb-splash-flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: splashPhase === "flash" ? 1 : 0 }}
              transition={{ duration: 0.33 }}
            />
          </motion.section>
        )}
      </AnimatePresence>

      <section className="bb-hero">
        <div className="bb-hero-overlay" />
        <motion.div className="bb-hero-canvas-wrap" style={{ scale: heroScale, opacity: heroOpacity }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <HeroCore />
          </Canvas>
        </motion.div>

        <motion.div className="bb-floating-layer" aria-hidden style={{ y: floatingDrift }}>
          {floatingElements.map((item, index) => (
            <span key={item} className="bb-floating-token" style={{ animationDelay: `${index * 1.2}s` }}>
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="bb-hero-content"
          style={{ y: contentLift }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
        >
          <span className="bb-pill">
            <Sparkles size={16} />
            Immersive learning for Classes 1-10
          </span>
          <h1>
            Unlock Academic Excellence with
            <span> BrainBuzz Academy</span>
          </h1>
          <p>
            A focused learning ecosystem where expert teachers, structured support, and engaging lessons
            help students build strong fundamentals and confidence.
          </p>
          <div className="bb-hero-actions">
            <Button size="lg" onClick={() => onNavigate("explore")} className="bb-cta-primary rounded-full px-8">
              Explore Teachers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => onNavigate("contact")} className="bb-cta-secondary rounded-full px-8">
              Book a Free Consultation
            </Button>
          </div>
        </motion.div>
      </section>

      <section className="bb-stack-section">
        <div className="responsive-container">
          <h2>Core learning tracks for secondary school</h2>
          <div className="bb-stack-grid">
            {stack.map((item, index) => (
              <motion.div
                key={item.name}
                className="bb-stack-card"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <item.icon size={28} />
                <span>{item.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bb-founder-section">
        <div className="responsive-container">
          <motion.div
            className="bb-founder-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <img src="/founder/zeba.jpg" alt="Ms. Zeba" />
            <div>
              <h2>Meet Our Founder</h2>
              <p className="bb-founder-role">Ms. Zeba - Spoken English and Grammar Expert</p>
              <p>
                With 15+ years of teaching excellence, Ms. Zeba built BrainBuzz to make high-quality,
                student-friendly education joyful, practical, and confidence-building.
              </p>
              <div className="bb-mini-stats">
                <span><Users size={16} /> 100+ Students</span>
                <span><GraduationCap size={16} /> 20+ Teachers</span>
                <span><TrendingUp size={16} /> 95% Success Rate</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bb-teachers-section">
        <div className="responsive-container">
          <h2>Meet Our Expert Teachers</h2>
          <p>Mentors who combine concept clarity, real outcomes, and human connection.</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} onViewDetails={onViewTeacher} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button size="lg" variant="outline" onClick={() => onNavigate("explore")} className="bb-view-all-btn rounded-full">
              View All Teachers
            </Button>
          </div>
        </div>
      </section>

      <section className="bb-testimonial-section">
        <div className="responsive-container">
          <h2>What Our Students Say</h2>
          <p>Real stories from learners and families building confidence with BrainBuzz.</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
