import { useState } from "react";
import { Video, LineChart, Users, MessageSquare, CheckCircle2, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export const PlatformPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const features = [
    {
      icon: Video,
      title: "Live Interactive Classes",
      description: "Join real-time classes with screen sharing and whiteboard collaboration",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Personalized Dashboard",
      description: "Track your progress, attendance, and performance metrics",
      color: "text-secondary"
    },
    {
      icon: FileText,
      title: "Assignments & Tests",
      description: "Practice with curated assignments and take regular assessments",
      color: "text-accent"
    },
    {
      icon: LineChart,
      title: "Performance Analytics",
      description: "Detailed insights into your learning journey and improvement areas",
      color: "text-success"
    },
    {
      icon: MessageSquare,
      title: "Doubt Resolution",
      description: "Ask questions anytime and get instant clarifications from teachers",
      color: "text-primary"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Flexible class timings that fit your schedule",
      color: "text-secondary"
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Success!",
        description: "You'll be notified when the platform launches in Q2 2025",
      });
      setEmail("");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="font-semibold">Coming Soon - Q2 2025</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Learning Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Experience the future of online education with our all-in-one learning platform
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need for an amazing learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-hover transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Our Platform?</h2>
            <div className="space-y-4">
              {[
                "Seamless integration with your learning journey",
                "Access to recorded sessions for revision anytime",
                "Collaborative learning environment with peer interaction",
                "AI-powered recommendations for personalized study plans",
                "Regular progress reports shared with parents",
                "Mobile-friendly interface for learning on the go"
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-card p-4 rounded-lg animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Be the First to Know</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Sign up to get early access and exclusive updates about our platform launch
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? "Subscribing..." : "Notify Me"}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Excited About the Platform?</h2>
          <p className="text-xl mb-8 text-white/90">
            Meanwhile, connect with our expert teachers for personalized tutoring
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg px-8"
          >
            Explore Teachers
          </Button>
        </div>
      </section>
    </div>
  );
};
