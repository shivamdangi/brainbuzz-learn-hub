import { Star, BookOpen, GraduationCap, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Teacher } from "@/data/teachers";

interface TeacherCardProps {
  teacher: Teacher;
  onViewDetails: (teacher: Teacher) => void;
}

export const TeacherCard = ({ teacher, onViewDetails }: TeacherCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-hover transition-all duration-300 cursor-pointer group">
      <div onClick={() => onViewDetails(teacher)}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={teacher.profileImage}
            alt={teacher.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/95 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold">{teacher.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {teacher.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{teacher.qualifications}</p>

          {/* Courses */}
          <div className="flex flex-wrap gap-2 mb-3">
            {teacher.courses.map((course) => (
              <Badge key={course} variant="secondary" className="text-xs">
                {course}
              </Badge>
            ))}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>Classes {teacher.classes[0]}-{teacher.classes[teacher.classes.length - 1]}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="h-4 w-4 text-secondary" />
              <span>{teacher.experienceYears} years exp</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(teacher);
            }}
            className="w-full"
            variant="outline"
          >
            View Full Profile
          </Button>
        </div>
      </div>
    </Card>
  );
};
