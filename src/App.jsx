import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import StudentDashboard from "./pages/student/Dashboard";
import StudentCourses from "./pages/student/Courses";
import AdminLayout from './layouts/AdminLayout.jsx';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import CourseManagement from './pages/admin/CourseManagement';
import TeacherDashboard from './pages/teacher/Dashboard';
import TeacherCourses from './pages/teacher/Courses';

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('access_token');
  const userRole = localStorage.getItem('user_role');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="courses" element={<CourseManagement />} />
          </Route>

          {/* Teacher Routes */}
          <Route 
            path="/teacher/dashboard" 
            element={
              <ProtectedRoute requiredRole="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          >
            <Route 
              index 
              element={
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Teacher Dashboard</h2>
                  <p>Welcome to your teacher dashboard. Select an option to get started.</p>
                </div>
              } 
            />
            <Route 
              path="courses" 
              element={<TeacherCourses />} 
            />
            <Route 
              path="courses/:courseId" 
              element={<TeacherCourses />} 
            />
            <Route 
              path="courses/:courseId/*" 
              element={<TeacherCourses />} 
            />
            
          </Route>

          {/* Student Routes */}
          <Route 
            path="/student/dashboard" 
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          >
            <Route 
              index 
              element={
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
                  <p>Welcome to your student dashboard. Select a course to get started.</p>
                </div>
              } 
            />
            <Route 
              path="courses" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentCourses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="courses/:courseId/announcements" 
              element={
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-4">Course Announcements</h3>
                  <p>Announcements will appear here.</p>
                </div>
              } 
            />
            <Route 
              path="courses/:courseId/materials" 
              element={
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-4">Course Materials</h3>
                  <p>Course materials will appear here.</p>
                </div>
              } 
            />
            <Route 
              path="courses/:courseId/support" 
              element={
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-4">Course Support</h3>
                  <p>Support information will appear here.</p>
                </div>
              } 
            />
            <Route 
              path="ai-support" 
              element={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">AI Support</h3>
                    <p className="text-gray-600">This feature is coming soon!</p>
                  </div>
                </div>
              } 
            />
            <Route 
              path="messaging" 
              element={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Messaging</h3>
                    <p className="text-gray-600">This feature is coming soon!</p>
                  </div>
                </div>
              } 
            />
          </Route>
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    <SpeedInsights />
  </QueryClientProvider>
);

export default App;
