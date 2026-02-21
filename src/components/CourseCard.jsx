import { Star, Users, Clock, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const CourseCard = ({ course, onViewDetails }) => {
  return (
    <Card className="group cursor-pointer overflow-hidden border-primary/10 bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
      <div onClick={() => onViewDetails && onViewDetails(course)}>
        <div className="relative h-48 overflow-hidden bg-muted">
          <img src={course.courseImage} alt={course.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/95 px-2 py-1 backdrop-blur-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold">{course.rating}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="mb-1 text-xl font-bold group-hover:text-primary">{course.name}</h3>
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>

          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="secondary">{course.subject}</Badge>
            <Badge variant="outline">{course.level}</Badge>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><BookOpen className="h-4 w-4 text-primary" />Classes {course.classes[0]}-{course.classes[course.classes.length - 1]}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4 text-secondary" />{course.studentsEnrolled}+ students</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4 text-accent" />{course.duration}</div>
            <div className="text-xs text-muted-foreground">{course.teachers.length} {course.teachers.length === 1 ? "teacher" : "teachers"}</div>
          </div>

          {onViewDetails && (
            <Button onClick={(e) => { e.stopPropagation(); onViewDetails(course); }} className="w-full rounded-xl" variant="outline">View Course Details</Button>
          )}
        </div>
      </div>
    </Card>
  );
};
