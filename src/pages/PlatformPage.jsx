import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Video, 
  LineChart, 
  Users, 
  MessageSquare, 
  BookOpen, 
  Calendar, 
  FileText, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export const PlatformPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      // Here you would typically make an API call to your backend
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: 'Success!',
        description: 'Thank you for subscribing! We\'ll keep you updated.',
      });
      setEmail('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Courses",
      description: "Access all your enrolled courses in one place with organized materials",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Personalized Dashboard",
      description: "Track your progress, assignments, and performance metrics",
      color: "text-secondary"
    },
    {
      icon: FileText,
      title: "Course Materials",
      description: "Download lecture notes, assignments, and additional resources",
      color: "text-accent"
    },
    {
      icon: LineChart,
      title: "Performance Analytics",
      description: "Get detailed insights into your learning progress and grades",
      color: "text-success"
    },
    {
      icon: MessageSquare,
      title: "AI Support",
      description: "Get instant help with your studies through our AI assistant",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Messaging",
      description: "Communicate with instructors and fellow students",
      color: "text-secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            BrainBuzz Learning Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Your all-in-one platform for an enhanced learning experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg font-semibold"
              onClick={handleLoginClick}
            >
              Login to Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
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
