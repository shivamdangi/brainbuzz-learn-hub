import { Star, BookOpen, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const TeacherCard = ({ teacher, onViewDetails }) => {
  return (
    <Card className="group cursor-pointer overflow-hidden border-cyan-200/25 bg-slate-900/90 text-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
      <div onClick={() => onViewDetails(teacher)}>
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700">
          <img src={teacher.profileImage} alt={teacher.name} className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-slate-900/95 px-2 py-1 backdrop-blur-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold text-slate-100">{teacher.rating}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="mb-1 text-xl font-bold text-slate-100 group-hover:text-cyan-300">{teacher.name}</h3>
          <p className="mb-3 text-sm text-slate-300">{teacher.qualifications}</p>
          <div className="mb-3 flex flex-wrap gap-2">{teacher.courses.map((course) => <Badge key={course} variant="secondary">{course}</Badge>)}</div>

          <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-300"><BookOpen className="h-4 w-4 text-primary" />Classes {teacher.classes[0]}-{teacher.classes[teacher.classes.length - 1]}</div>
            <div className="flex items-center gap-2 text-slate-300"><Award className="h-4 w-4 text-secondary" />{teacher.experienceYears} years exp</div>
          </div>

          <Button onClick={(e) => { e.stopPropagation(); onViewDetails(teacher); }} className="w-full rounded-xl border-cyan-200/50 bg-slate-800 text-slate-100 hover:bg-slate-700" variant="outline">View Full Profile</Button>
        </div>
      </div>
    </Card>
  );
};
