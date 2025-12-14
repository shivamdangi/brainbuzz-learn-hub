import { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link, useLocation, useParams } from 'react-router-dom';
import { Card, Button, Tabs, Skeleton, Empty, message, Result } from 'antd';
import { BookOutlined, FileTextOutlined, TeamOutlined, CalendarOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import api from '../../services/api';

const { Meta } = Card;

const { TabPane } = Tabs;

const TeacherCourses = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useParams();
  
  // Check if user is a teacher
  useEffect(() => {
    const userRole = localStorage.getItem('user_role');
    console.log('Current user role:', userRole);
    
    if (userRole !== 'teacher' && userRole !== 'admin') {
      console.warn('Unauthorized access: User is not a teacher');
      setIsAuthorized(false);
      message.warning('You do not have permission to access this page.');
      navigate('/');
    }
  }, [navigate]);
  
  useEffect(() => {
    const fetchTeachingCourses = async () => {
      try {
        setLoading(true);
        console.log('Fetching teacher courses...');
        const token = localStorage.getItem('access_token');
        console.log('Auth token:', token ? 'Present' : 'Missing');
        
        const response = await api.get('/teacher/courses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        console.log('Courses API Response:', response);
        
        if (response.data) {
          console.log('Courses data received:', response.data);
          setCourses(response.data);
        } else {
          console.warn('No courses data in response');
          setCourses([]);
        }
      } catch (error) {
        console.error('Error fetching teaching courses:', {
          message: error.message,
          response: error.response,
          status: error.response?.status,
          data: error.response?.data
        });
        message.error(error.response?.data?.detail || 'Failed to load your courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeachingCourses();
  }, []);

  if (!isAuthorized) {
    return (
      <div className="p-6">
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button type="primary" onClick={() => navigate('/')}>
              Back Home
            </Button>
          }
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  }

  if (courseId) {
    return (
      <div className="course-detail">
        <Tabs 
          defaultActiveKey="announcements" 
          onChange={(key) => navigate(`/teacher/dashboard/courses/${courseId}/${key}`)}
          className="mb-6"
        >
          <TabPane 
            tab={
              <span>
                <FileTextOutlined />
                Announcements
              </span>
            } 
            key="announcements"
          >
            <Outlet />
          </TabPane>
          <TabPane 
            tab={
              <span>
                <UserOutlined />
                Students
              </span>
            } 
            key="students"
          >
            <Outlet />
          </TabPane>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Teaching Courses</h2>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full">
              <Skeleton active />
            </Card>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <Empty 
          description={
            <span className="text-gray-500">You are not assigned to any courses yet.</span>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              hoverable
              className="w-full h-full flex flex-col"
              actions={[
                <Button 
                  type="link" 
                  onClick={() => navigate(`/teacher/dashboard/courses/${course.id}`)}
                >
                  View Details
                </Button>,
              ]}
            >
              <Card.Meta
                avatar={<BookOutlined className="text-2xl text-blue-500" />}
                title={course.title}
                description={
                  <div className="mt-2">
                    <div className="text-gray-600 line-clamp-2 mb-3">
                      {course.description || 'No description available'}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <TeamOutlined className="mr-1" />
                      <span className="mr-4">
                        {course.students?.length || 0} students
                      </span>
                      <CalendarOutlined className="mr-1" />
                      <span>
                        Created {new Date(course.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherCourses;
