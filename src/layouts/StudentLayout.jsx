// src/layouts/StudentLayout.jsx
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Menu, 
  Button, 
  Avatar, 
  Dropdown, 
  Space, 
  Typography 
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BookOutlined,
  MessageOutlined,
  RobotOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  FileTextOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import './StudentLayout.css';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const StudentLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial state
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarVisible(!sidebarVisible);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarVisible(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    navigate('/login');
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      path: '/student/dashboard'
    },
    {
      key: 'courses',
      icon: <BookOutlined />,
      label: 'My Courses',
      path: '/student/courses'
    },
    {
      key: 'ai-support',
      icon: <RobotOutlined />,
      label: 'AI Support',
      path: '/student/ai-support'
    },
    {
      key: 'messaging',
      icon: <MessageOutlined />,
      label: 'Messaging',
      path: '/student/messaging'
    }
  ];

  const selectedKey = menuItems.find(item => 
    location.pathname.startsWith(item.path)
  )?.key || 'dashboard';

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        My Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item 
        key="logout" 
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        danger
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="student-layout" style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {/* Mobile backdrop */}
      <div 
        className={`sidebar-backdrop ${isMobile && sidebarVisible ? 'visible' : ''}`}
        onClick={closeSidebar}
      />
      
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={isMobile ? false : collapsed}
        width={250}
        className={`sidebar ${isMobile ? 'mobile-sidebar' : ''} ${sidebarVisible ? 'sidebar-visible' : ''}`}
        style={{ zIndex: 1002 }}
      >
        <div className="logo">
          <Title level={4} className="logo-text">
            {isMobile ? 'BrainBuzz' : (collapsed ? 'BrainBuzz' : 'BrainBuzz')}
          </Title>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          className="sidebar-menu"
        >
          {menuItems.map(item => (
            <Menu.Item 
              key={item.key} 
              icon={item.icon}
              onClick={() => {
                navigate(item.path);
                if (isMobile) {
                  closeSidebar();
                }
              }}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      
      <Layout>
        <Header className={`header ${!isMobile && collapsed ? 'collapsed' : ''}`}>
          <div className="header-left">
            <Button
              type="text"
              icon={<MenuUnfoldOutlined />}
              onClick={toggleSidebar}
              className="menu-collapse"
            />
            <div className="breadcrumb">
              {menuItems.find(item => item.key === selectedKey)?.label || 'Dashboard'}
            </div>
          </div>
          
          <div className="header-right">
            <Dropdown overlay={userMenu} placement="bottomRight" arrow>
              <Space className="user-dropdown">
                <Avatar 
                  icon={<UserOutlined />} 
                  className="user-avatar"
                />
                {!collapsed && (
                  <span className="username">Student</span>
                )}
              </Space>
            </Dropdown>
          </div>
        </Header>
        
        <Content 
          className={`content ${sidebarVisible ? 'content-pushed' : ''}`}
          style={{ 
            height: 'calc(100vh - 64px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            marginLeft: isMobile ? 0 : (collapsed ? '80px' : '250px'),
            transition: 'margin 0.2s',
            width: isMobile ? '100%' : `calc(100% - ${collapsed ? 80 : 250}px)`
          }}
          onClick={isMobile && sidebarVisible ? closeSidebar : undefined}
        >
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentLayout;