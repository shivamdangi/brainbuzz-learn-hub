import { Star, BookOpen, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const TeacherCard = ({ teacher, onViewDetails }) => {
  return (
    <Card className="group cursor-pointer overflow-hidden border-primary/10 bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
      <div onClick={() => onViewDetails(teacher)}>
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
          <img src={teacher.profileImage} alt={teacher.name} className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/95 px-2 py-1 backdrop-blur-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold">{teacher.rating}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="mb-1 text-xl font-bold group-hover:text-primary">{teacher.name}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{teacher.qualifications}</p>
          <div className="mb-3 flex flex-wrap gap-2">{teacher.courses.map((course) => <Badge key={course} variant="secondary">{course}</Badge>)}</div>

          <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><BookOpen className="h-4 w-4 text-primary" />Classes {teacher.classes[0]}-{teacher.classes[teacher.classes.length - 1]}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Award className="h-4 w-4 text-secondary" />{teacher.experienceYears} years exp</div>
          </div>

          <Button onClick={(e) => { e.stopPropagation(); onViewDetails(teacher); }} className="w-full rounded-xl" variant="outline">View Full Profile</Button>
        </div>
      </div>
    </Card>
  );
};
