import { Users, GraduationCap, TrendingUp, Award, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeacherCard } from "@/components/TeacherCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { teachers } from "@/data/teachers";
import { testimonials } from "@/data/testimonials";

export const HomePage = ({ onNavigate, onViewTeacher }) => {
  const featuredTeachers = teachers.slice(0, 3);
  const displayedTestimonials = testimonials.slice(0, 3);

  const stats = [
    { icon: Users, label: "Active Students", value: "100+" },
    { icon: GraduationCap, label: "Expert Teachers", value: "20+" },
    { icon: TrendingUp, label: "Success Rate", value: "95%" },
    { icon: Award, label: "Years Experience", value: "10+" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden px-4 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsla(200,100%,70%,0.25),_transparent_50%),radial-gradient(circle_at_bottom_left,_hsla(220,100%,65%,0.22),_transparent_45%)]" />
        <div className="container relative z-10 mx-auto">
          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Modern learning for Classes 1-10 (CBSE & ICSE)
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-7xl">
              Unlock Academic Excellence with
              <span className="bg-gradient-hero bg-clip-text text-transparent"> BrainBuzz Academy</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              A focused learning ecosystem where expert teachers, structured support, and engaging lessons help students build strong fundamentals and confidence.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={() => onNavigate("explore")} className="rounded-full px-8 text-base">
                Explore Teachers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate("contact")} className="rounded-full px-8 text-base">
                Book a Free Consultation
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border/70 bg-card/70 p-5 shadow-card backdrop-blur-sm">
                  <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-3xl border border-primary/10 bg-gradient-to-br from-white to-blue-50 p-8 shadow-card md:grid-cols-[220px_1fr]">
            <img src="/founder/zeba.jpg" alt="Ms. Zeba" className="h-52 w-52 justify-self-center rounded-3xl object-cover shadow-lg" />
            <div>
              <h2 className="text-3xl font-bold">Meet Our Founder</h2>
              <p className="mt-2 text-lg font-semibold text-primary">Ms. Zeba • Spoken English & Grammar Expert</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">With 15+ years of teaching excellence, Ms. Zeba founded BrainBuzz to make high-quality, student-friendly education accessible. Her mission is to help every learner strengthen concepts, communicate better, and score higher with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold">Meet Our Expert Teachers</h2>
            <p className="mt-2 text-lg text-muted-foreground">Experienced educators dedicated to personalized outcomes.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} onViewDetails={onViewTeacher} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button size="lg" variant="outline" onClick={() => onNavigate("explore")} className="rounded-full">View All Teachers</Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold">What Our Students Say</h2>
            <p className="mt-2 text-lg text-muted-foreground">Real stories from learners and families.</p>
          </div>
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
