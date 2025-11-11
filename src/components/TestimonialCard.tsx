import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="p-6 hover:shadow-hover transition-all duration-300 relative">
      <Quote className="absolute top-4 right-4 h-8 w-8 text-muted/20" />
      
      <div className="flex items-start gap-4 mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">
            Class {testimonial.class} • {testimonial.board}
          </p>
        </div>
      </div>

      <div className="flex gap-0.5 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </div>

      <p className="text-muted-foreground leading-relaxed">{testimonial.text}</p>
    </Card>
  );
};
