// src/pages/student/Dashboard.jsx
import { Card, Row, Col, Statistic, Typography } from 'antd';
import { 
  BookOutlined, 
  FileDoneOutlined, 
  ClockCircleOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';

const { Title, Text } = Typography;

const StudentDashboard = () => {
  // Mock data - replace with actual API calls
  const stats = [
    { 
      title: 'Active Courses', 
      value: 5, 
      icon: <BookOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      link: '/student/courses'
    },
    { 
      title: 'Assignments Due', 
      value: 3, 
      icon: <FileDoneOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      link: '/student/assignments'
    },
    { 
      title: 'Upcoming Classes', 
      value: 2, 
      icon: <ClockCircleOutlined style={{ fontSize: '24px', color: '#faad14' }} />,
      link: '/student/schedule'
    },
    { 
      title: 'Unread Messages', 
      value: 4, 
      icon: <MessageOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
      link: '/student/messaging'
    }
  ];

  const recentCourses = [
    { id: 1, name: 'Introduction to Computer Science', progress: 65 },
    { id: 2, name: 'Web Development Fundamentals', progress: 40 },
    { id: 3, name: 'Data Structures and Algorithms', progress: 85 }
  ];

  return (
    <StudentLayout>
      <div className="dashboard">
        <Title level={3}>Welcome back, Student!</Title>
        <Text type="secondary">Here's what's happening with your courses today</Text>
        
        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mt-6 mb-8">
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Link to={stat.link}>
                <Card 
                  hoverable
                  className="stat-card"
                >
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    prefix={stat.icon}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        
        {/* Recent Courses */}
        <Card 
          title="Your Courses" 
          extra={<Link to="/student/courses">View All</Link>}
          className="mb-8"
        >
          {recentCourses.map(course => (
            <div key={course.id} className="course-progress mb-4">
              <div className="flex justify-between mb-2">
                <Text strong>{course.name}</Text>
                <Text type="secondary">{course.progress}% complete</Text>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </Card>
        
        {/* Quick Actions */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card 
              title="Quick Actions" 
              className="h-full"
            >
              <div className="grid grid-cols-2 gap-4">
                <Link to="/student/courses" className="quick-action">
                  <BookOutlined className="text-xl" />
                  <span>View Courses</span>
                </Link>
                <Link to="/student/ai-support" className="quick-action">
                  <MessageOutlined className="text-xl" />
                  <span>AI Support</span>
                </Link>
                <Link to="/student/schedule" className="quick-action">
                  <ClockCircleOutlined className="text-xl" />
                  <span>Class Schedule</span>
                </Link>
                <Link to="/student/assignments" className="quick-action">
                  <FileDoneOutlined className="text-xl" />
                  <span>Assignments</span>
                </Link>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card 
              title="Upcoming Deadlines"
              className="h-full"
            >
              <div className="space-y-4">
                <div className="deadline-item">
                  <div className="deadline-date">
                    <div className="date">15</div>
                    <div className="month">NOV</div>
                  </div>
                  <div className="deadline-content">
                    <div className="deadline-title">Web Development Project</div>
                    <div className="deadline-course">Web Development Fundamentals</div>
                  </div>
                </div>
                <div className="deadline-item">
                  <div className="deadline-date">
                    <div className="date">18</div>
                    <div className="month">NOV</div>
                  </div>
                  <div className="deadline-content">
                    <div className="deadline-title">Algorithms Quiz</div>
                    <div className="deadline-course">Data Structures and Algorithms</div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;