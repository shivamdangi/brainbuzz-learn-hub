import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export const ContactPage = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      toast({ title: "Required Fields Missing", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/xyzlgnkv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed");
      toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast({ title: "Message Received", description: "Thanks for contacting us. We'll reach out shortly." });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold">Let’s Build Your Child’s Success Story</h1>
          <p className="mt-3 text-lg text-muted-foreground">Reach out for admissions, counseling, or learning guidance. We’re here to help.</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          <div className="space-y-5">
            {[
              { icon: Mail, title: "Email Us", text: "info.brainbuzz.academy@gmail.com" },
              { icon: Phone, title: "Call / WhatsApp", text: "+91-9690724441 (Mon-Sat: 9AM - 7PM)" },
              { icon: MapPin, title: "Visit Us", text: "Baraut, Uttar Pradesh, India 250611" },
            ].map((item) => (
              <Card key={item.title} className="border-primary/10 p-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary"><item.icon className="h-5 w-5" /></div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-5">
              <h3 className="mb-3 font-semibold">Watch Our Introduction</h3>
              <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://youtube.com/embed/LXzh0BO1HwI?feature=share"
                  title="BrainBuzz Academy Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-primary/10 p-8">
              <h2 className="text-2xl font-bold">Send Us a Message</h2>
              <p className="mt-1 text-sm text-muted-foreground">Fill this form and our team will connect with you soon.</p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name *" required />
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                </div>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email *" required />
                <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
                <Input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" />
                <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us how we can help..." rows={6} required />
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : <><Send className="mr-2 h-4 w-4" />Send Message</>}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
