import { useState, useMemo } from "react";
import { Search, Filter, BookOpen, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeacherCard } from "@/components/TeacherCard";
import { CourseCard } from "@/components/CourseCard";
import { teachers } from "@/data/teachers";
import { courses } from "@/data/courses";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ExplorePage = ({ onViewTeacher }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [coursesExpanded, setCoursesExpanded] = useState(true);
  const [teachersExpanded, setTeachersExpanded] = useState(true);

  const allSubjects = useMemo(() => {
    const subjectsSet = new Set();
    courses.forEach((course) => subjectsSet.add(course.subject));
    teachers.forEach((teacher) => teacher.courses.forEach((course) => subjectsSet.add(course)));
    return Array.from(subjectsSet).sort();
  }, []);

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) => {
        const matchesSearch =
          searchQuery === "" ||
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesClass = selectedClass === "all" || course.classes.includes(parseInt(selectedClass));
        const matchesSubject = selectedSubject === "all" || course.subject === selectedSubject;

        return matchesSearch && matchesClass && matchesSubject;
      }),
    [searchQuery, selectedClass, selectedSubject],
  );

  const filteredTeachers = useMemo(
    () =>
      teachers.filter((teacher) => {
        const matchesSearch =
          searchQuery === "" ||
          teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          teacher.courses.some((course) => course.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesClass = selectedClass === "all" || teacher.classes.includes(parseInt(selectedClass));
        const matchesSubject = selectedSubject === "all" || teacher.courses.includes(selectedSubject);

        return matchesSearch && matchesClass && matchesSubject;
      }),
    [searchQuery, selectedClass, selectedSubject],
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedClass("all");
    setSelectedSubject("all");
  };

  const hasResults = filteredCourses.length > 0 || filteredTeachers.length > 0;
  const hasActiveFilters = searchQuery || selectedClass !== "all" || selectedSubject !== "all";

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        <div className="mb-10 rounded-3xl border border-border/70 bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-8 shadow-card">
          <h1 className="text-4xl font-extrabold md:text-5xl">Explore Courses & Mentors</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Find the right course and educator based on class level, subject, and learning goals.</p>
        </div>

        <div className="mb-8 rounded-2xl border border-border/70 bg-card/90 p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Smart Filters</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by teacher, subject, or topic..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>Class {i + 1}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {allSubjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {hasActiveFilters && <Button variant="outline" size="sm" onClick={resetFilters} className="mt-4">Reset Filters</Button>}
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="px-3 py-1">{filteredCourses.length} courses</Badge>
          <Badge variant="outline" className="px-3 py-1">{filteredTeachers.length} teachers</Badge>
        </div>

        {filteredCourses.length > 0 && (
          <div className="mb-14">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Courses</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setCoursesExpanded(!coursesExpanded)}>{coursesExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</Button>
            </div>
            {coursesExpanded && <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filteredCourses.map((course) => <CourseCard key={course.id} course={course} />)}</div>}
          </div>
        )}

        {filteredTeachers.length > 0 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold">Teachers</h2>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setTeachersExpanded(!teachersExpanded)}>{teachersExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</Button>
            </div>
            {teachersExpanded && <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{filteredTeachers.map((teacher) => <TeacherCard key={teacher.id} teacher={teacher} onViewDetails={onViewTeacher} />)}</div>}
          </div>
        )}

        {!hasResults && (
          <Card className="py-16 text-center">
            <Search className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No matching results found</h3>
            <p className="mt-2 text-muted-foreground">Try broadening your search or clearing the filters.</p>
            <Button variant="outline" onClick={resetFilters} className="mt-5">Clear Filters</Button>
          </Card>
        )}
      </div>
    </div>
  );
};
