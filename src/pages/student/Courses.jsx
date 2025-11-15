import { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Card, Button, Tabs, Skeleton, Empty, message } from 'antd';
import { BookOutlined, FileTextOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import api from '../../services/api';

const { TabPane } = Tabs;

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.pathname.split('/').pop();
  
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get('/student/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        message.error('Failed to load your courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEnrolledCourses();
  }, []);

  if (courseId && courseId !== 'courses') {
    return (
      <div className="course-detail">
        <Tabs 
          defaultActiveKey="announcements" 
          onChange={(key) => navigate(`/student/dashboard/courses/${courseId}/${key}`)}
          className="mb-6"
        >
          <TabPane 
            tab={
              <span>
                <BookOutlined />
                Announcements
              </span>
            } 
            key="announcements"
          />
          <TabPane 
            tab={
              <span>
                <FileTextOutlined />
                Notes & Files
              </span>
            } 
            key="materials"
          />
          <TabPane 
            tab={
              <span>
                <QuestionCircleOutlined />
                Support
              </span>
            } 
            key="support"
          />
        </Tabs>
        <Outlet />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">My Courses</h2>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="shadow-sm">
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          ))}
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              hoverable
              className="shadow-sm hover:shadow-md transition-shadow"
              onClick={() => navigate(`/student/dashboard/courses/${course.id}/announcements`)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <BookOutlined className="text-blue-600 text-xl" />
                </div>
                <span className="text-sm font-medium text-gray-500">{course.code}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-500 text-sm mb-4">Click to view course details and materials</p>
              <Button 
                type="primary" 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/student/dashboard/courses/${course.id}/announcements`);
                }}
              >
                Open Course
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <Empty
          description={
            <span className="text-gray-500">You are not enrolled in any courses yet.</span>
          }
        />
      )}
    </div>
  );
};

export default Courses;
