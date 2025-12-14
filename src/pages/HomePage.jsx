import { Users, GraduationCap, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeacherCard } from "@/components/TeacherCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { teachers } from "@/data/teachers";
import { testimonials } from "@/data/testimonials";

export const HomePage = ({ onNavigate, onViewTeacher }) => {
  const featuredTeachers = teachers.slice(0, 3);
  const displayedTestimonials = testimonials.slice(0, 3);

  const stats = [
    { icon: Users, label: "Active Students", value: "100+", color: "black" },
    { icon: GraduationCap, label: "Expert Teachers", value: "20+", color: "black" },
    { icon: TrendingUp, label: "Success Rate", value: "95%", color: "black" },
    { icon: Award, label: "Years Experience", value: "10+", color: "black" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transform Your Learning Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Expert tutoring for Classes 1-10 (CBSE & ICSE)
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 animate-slide-up">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => onNavigate("explore")}
                className="text-lg px-8"
              >
                Explore More
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("contact")}
                className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl shadow-card p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-48 h-48 flex-shrink-0">
                <img
                  src="/founder/zeba.jpg"
                  alt="Ms. Zeba"
                  className="w-full h-full rounded-full object-cover shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Meet Our Founder</h2>
                <h3 className="text-xl text-primary font-semibold mb-4">Ms. Zeba</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  With over 15 years of expertise in Spoken English and Grammar, Ms. Zeba founded 
                  BrainBuzz Academy with a vision to make quality education accessible to every student. 
                  Her passion for teaching and commitment to excellence has helped hundreds of students 
                  achieve their academic dreams.
                </p>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Spoken English & Grammar Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teachers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Meet Our Expert Teachers</h2>
            <p className="text-xl text-muted-foreground">
              Learn from the best educators with years of experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onViewDetails={onViewTeacher}
              />
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => onNavigate("explore")}
              variant="outline"
            >
              View All Teachers
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-xl text-muted-foreground">
              Success stories from our amazing students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Excel in Your Studies?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join BrainBuzz Academy today and unlock your full potential
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => onNavigate("contact")}
            className="text-lg px-8"
          >
            Contact Us Today
          </Button>
        </div>
      </section>
    </div>
  );
};
