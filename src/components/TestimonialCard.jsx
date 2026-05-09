import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

export const TestimonialCard = ({ testimonial }) => {
  return (
    <Card className="relative border-cyan-200/25 bg-slate-900/90 p-6 text-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
      <Quote className="absolute right-4 top-4 h-8 w-8 text-cyan-100/25" />
      <div className="mb-4 flex items-start gap-4">
        <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-cyan-200/35" />
        <div>
          <h4 className="font-semibold text-slate-100">{testimonial.name}</h4>
          <p className="text-sm text-slate-300">Class {testimonial.class} • {testimonial.board}</p>
        </div>
      </div>
      <div className="mb-3 flex gap-0.5">{[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}</div>
      <p className="leading-relaxed text-slate-200">{testimonial.text}</p>
    </Card>
  );
};
