import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TeacherModal } from "@/components/TeacherModal";
import { HomePage } from "./HomePage";
import { ExplorePage } from "./ExplorePage";
import { PlatformPage } from "./PlatformPage";
import { ContactPage } from "./ContactPage";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTeacher(null), 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-1">
        {currentPage === "home" && (
          <HomePage onNavigate={handleNavigate} onViewTeacher={handleViewTeacher} />
        )}
        {currentPage === "explore" && (
          <ExplorePage onViewTeacher={handleViewTeacher} />
        )}
        {currentPage === "platform" && <PlatformPage />}
        {currentPage === "contact" && <ContactPage />}
      </main>

      <Footer />

      <TeacherModal
        teacher={selectedTeacher}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default Index;
