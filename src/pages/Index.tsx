import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { TeacherModal } from "@/components/TeacherModal";
import { HomePage } from "./HomePage";
import { ExplorePage } from "./ExplorePage";
import { PlatformPage } from "./PlatformPage";
import { ContactPage } from "./ContactPage";
import { Teacher } from "@/data/teachers";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTeacher(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      {currentPage === "home" && (
        <HomePage onNavigate={handleNavigate} onViewTeacher={handleViewTeacher} />
      )}
      {currentPage === "explore" && (
        <ExplorePage onViewTeacher={handleViewTeacher} />
      )}
      {currentPage === "platform" && <PlatformPage />}
      {currentPage === "contact" && <ContactPage />}

      <TeacherModal
        teacher={selectedTeacher}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
