import { Star, Users, Clock, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const CourseCard = ({ course, onViewDetails }) => {
  return (
    <Card className="overflow-hidden hover:shadow-hover transition-all duration-300 cursor-pointer group">
      <div onClick={() => onViewDetails && onViewDetails(course)}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={course.courseImage}
            alt={course.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/95 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold">{course.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {course.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>

          {/* Subject Badge */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              {course.subject}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>Classes {course.classes[0]}-{course.classes[course.classes.length - 1]}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-secondary" />
              <span>{course.studentsEnrolled}+ students</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-accent" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs">{course.teachers.length} {course.teachers.length === 1 ? 'teacher' : 'teachers'}</span>
            </div>
          </div>

          {/* CTA Button */}
          {onViewDetails && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(course);
              }}
              className="w-full"
              variant="outline"
            >
              View Course Details
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

