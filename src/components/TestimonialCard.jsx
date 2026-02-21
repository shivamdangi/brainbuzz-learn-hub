import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

export const TestimonialCard = ({ testimonial }) => {
  return (
    <Card className="relative border-primary/10 bg-card/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
      <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/15" />
      <div className="mb-4 flex items-start gap-4">
        <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20" />
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">Class {testimonial.class} • {testimonial.board}</p>
        </div>
      </div>
      <div className="mb-3 flex gap-0.5">{[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}</div>
      <p className="leading-relaxed text-muted-foreground">{testimonial.text}</p>
    </Card>
  );
};
