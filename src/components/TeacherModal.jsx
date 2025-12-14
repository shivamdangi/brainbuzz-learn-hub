import { X, Star, BookOpen, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const TeacherModal = ({ teacher, isOpen, onClose , onNavigate}) => {
  if (!isOpen || !teacher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header with Image */}
        <div className="relative h-72 bg-gradient-hero">
          <img
            src={teacher.profileImage}
            alt={teacher.name}
            className="w-full h-full object-contain p-2"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{teacher.name}</h2>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="text-white font-semibold text-lg">{teacher.rating}</span>
                  <span className="text-white/80">rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Qualifications */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Qualifications
            </h3>
            <p className="text-muted-foreground">{teacher.qualifications}</p>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <p className="text-muted-foreground">
              {teacher.experienceYears} years of teaching experience
            </p>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-muted-foreground leading-relaxed">{teacher.bio}</p>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-secondary" />
              Courses Taught
            </h3>
            <div className="flex flex-wrap gap-2">
              {teacher.courses.map((course) => (
                <Badge key={course} variant="secondary" className="px-3 py-1">
                  {course}
                </Badge>
              ))}
            </div>
          </div>

          {/* Classes */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Classes</h3>
            <p className="text-muted-foreground">
              Class {teacher.classes[0]} to {teacher.classes[teacher.classes.length - 1]}
            </p>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Specializations</h3>
            <ul className="space-y-2">
              {teacher.specializations.map((spec) => (
                <li key={spec} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="pt-4 flex gap-3">
            <Button className="flex-1" size="lg"  onClick={() => {onClose();setTimeout(() => onNavigate("contact"), 250);}}>
              Book a Trial Class
            </Button>
            <Button variant="outline" size="lg" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
