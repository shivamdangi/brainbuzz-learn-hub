import { useState, useMemo } from "react";
import { Search, Filter, BookOpen, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TeacherCard } from "@/components/TeacherCard";
import { CourseCard } from "@/components/CourseCard";
import { teachers } from "@/data/teachers";
import { courses } from "@/data/courses";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ExplorePage = ({ onViewTeacher }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [coursesExpanded, setCoursesExpanded] = useState(true);
  const [teachersExpanded, setTeachersExpanded] = useState(true);
  const subjects = ["Hindi", "English", "Mathematics", "Science"];

  // Extract unique subjects from both courses and teachers
  const allSubjects = useMemo(() => {
    const subjectsSet = new Set();
    courses.forEach((course) => {
      subjectsSet.add(course.subject);
    });
    teachers.forEach((teacher) => {
      teacher.courses.forEach((course) => subjectsSet.add(course));
    });
    return Array.from(subjectsSet).sort();
  }, []);

  // Filter courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Class filter
      const matchesClass =
        selectedClass === "all" ||
        course.classes.includes(parseInt(selectedClass));

      // Subject filter
      const matchesSubject =
        selectedSubject === "all" ||
        course.subject === selectedSubject;

      return matchesSearch && matchesClass && matchesSubject;
    });
  }, [searchQuery, selectedClass, selectedSubject]);

  // Filter teachers
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.courses.some((course) =>
          course.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Class filter
      const matchesClass =
        selectedClass === "all" ||
        teacher.classes.includes(parseInt(selectedClass));

      // Subject filter
      const matchesSubject =
        selectedSubject === "all" ||
        teacher.courses.includes(selectedSubject);

      return matchesSearch && matchesClass && matchesSubject;
    });
  }, [searchQuery, selectedClass, selectedSubject]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedClass("all");
    setSelectedSubject("all");
  };

  const hasResults = filteredCourses.length > 0 || filteredTeachers.length > 0;
  const hasActiveFilters = searchQuery || selectedClass !== "all" || selectedSubject !== "all";

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Courses & Teachers</h1>
          <p className="text-xl text-muted-foreground">
            Discover courses and find the perfect teacher for your learning needs
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl shadow-card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Filter Courses & Teachers</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses, teachers, or subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Class Filter */}
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {[...Array(12)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    Class {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Subject Filter */}
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {allSubjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <div className="mt-4">
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex items-center gap-4 flex-wrap">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span>{" "}
            {filteredCourses.length === 1 ? "course" : "courses"} and{" "}
            <span className="font-semibold text-foreground">{filteredTeachers.length}</span>{" "}
            {filteredTeachers.length === 1 ? "teacher" : "teachers"}
          </p>
        </div>

        {/* Subjects */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Subjects</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <Card key={subject} className="p-6">
                <h3 className="text-xl font-bold mb-4">{subject}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Class 1-10
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        {filteredCourses.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Courses</h2>
                <span className="text-muted-foreground">({filteredCourses.length})</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCoursesExpanded(!coursesExpanded)}
                className="gap-2"
              >
                {coursesExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    <span>Collapse</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    <span>Expand</span>
                  </>
                )}
              </Button>
            </div>
            {coursesExpanded && (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="text-3xl md:text-5xl italic font-semibold text-foreground/80">
                    Details Coming Soon
                  </div>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground">
                    We are preparing an amazing courses experience for you.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Teachers Section */}
        {filteredTeachers.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Teachers</h2>
                <span className="text-muted-foreground">({filteredTeachers.length})</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTeachersExpanded(!teachersExpanded)}
                className="gap-2"
              >
                {teachersExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    <span>Collapse</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    <span>Expand</span>
                  </>
                )}
              </Button>
            </div>
            {teachersExpanded && (
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="text-3xl md:text-5xl italic font-semibold text-foreground/80">
                    Details Coming Soon
                  </div>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground">
                    Teacher profiles and filters will be available shortly.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {!hasResults && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to see more results
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
