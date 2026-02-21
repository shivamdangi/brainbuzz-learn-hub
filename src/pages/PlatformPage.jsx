import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Users, MessageSquare, BookOpen, FileText, ArrowRight, CheckCircle2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export const PlatformPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({ title: "Success!", description: "Thank you for subscribing! We'll keep you updated." });
      setEmail("");
    } catch (error) {
      toast({ title: "Error", description: "Failed to subscribe. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: BookOpen, title: "Smart Course Hub", description: "All enrolled lessons, notes, and practice in one easy dashboard." },
    { icon: Users, title: "Progress Dashboard", description: "View attendance, milestones, and performance trends at a glance." },
    { icon: FileText, title: "Resource Library", description: "Download worksheets, revision sheets, and assignment resources instantly." },
    { icon: LineChart, title: "Analytics & Reports", description: "Track strengths and learning gaps with actionable insights." },
    { icon: MessageSquare, title: "AI Learning Support", description: "Get real-time doubt resolution and personalized recommendations." },
    { icon: Users, title: "Mentor Communication", description: "Stay connected with teachers and receive timely updates." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,_rgba(56,189,248,0.35),_transparent_40%)]" />
        <div className="container relative z-10 mx-auto px-4 text-white">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm"><Rocket className="h-4 w-4" />New-age digital learning experience</span>
            <h1 className="mt-5 text-5xl font-extrabold md:text-6xl">BrainBuzz Learning Platform</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">A centralized platform for classes, resources, communication, and measurable progress—designed to make learning simple and effective.</p>
            <Button size="lg" className="mt-8 bg-white text-blue-700 hover:bg-blue-100" onClick={() => navigate("/login")}>
              Login to your account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold">Everything Students Need in One Place</h2>
            <p className="mt-2 text-lg text-muted-foreground">Purpose-built tools that support better outcomes and smoother learning journeys.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="group border-primary/10 p-6 shadow-card transition hover:-translate-y-1 hover:shadow-hover">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><feature.icon className="h-6 w-6" /></div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Why BrainBuzz Platform Works</h2>
          <div className="space-y-4">
            {[
              "Simple navigation for students and parents.",
              "Centralized class notes and recorded revisions.",
              "Continuous performance tracking and personalized support.",
              "Anytime access through a mobile-friendly interface.",
            ].map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 rounded-2xl border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-3xl font-bold">Be the First to Know</h2>
          <p className="mt-3 text-muted-foreground">Sign up for launch updates and exclusive access announcements.</p>
          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1" required />
            <Button type="submit" size="lg" disabled={loading}>{loading ? "Subscribing..." : "Notify Me"}</Button>
          </form>
        </div>
      </section>
    </div>
  );
};
