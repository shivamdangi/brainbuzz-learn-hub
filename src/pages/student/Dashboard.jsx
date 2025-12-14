import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BookOutlined,
  MessageOutlined,
  RobotOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const { Header, Sider, Content } = Layout;

const StudentDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
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
      key: '1',
      icon: <BookOutlined />,
      label: 'Courses',
      path: '/student/dashboard/courses',
    },
    {
      key: '2',
      icon: <RobotOutlined />,
      label: 'AI Support',
      path: '/student/dashboard/ai-support',
    },
    {
      key: '3',
      icon: <MessageOutlined />,
      label: 'Messaging',
      path: '/student/dashboard/messaging',
    },
  ];

  const selectedKey = menuItems.find(item => 
    location.pathname.startsWith(item.path)
  )?.key || '1';

  return (
    <Layout className="min-h-screen">
      <div 
        className={`sidebar-backdrop ${isMobile && sidebarVisible ? 'visible' : ''}`}
        onClick={closeSidebar}
      />
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={isMobile ? false : collapsed}
        width={250}
        className={`bg-white shadow-lg sidebar ${isMobile ? 'mobile-sidebar' : ''} ${sidebarVisible ? 'sidebar-visible' : ''}`}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          }
        }}
        style={{ zIndex: 1002 }}
      >
        <div className="flex items-center justify-between h-14 sm:h-16 bg-blue-600 text-white px-4">
          <h1 className="text-lg sm:text-xl font-bold">
            {collapsed ? 'BB' : 'BrainBuzz'}
          </h1>
          {!collapsed && !isMobile && (
            <Button
              type="text"
              icon={<MenuFoldOutlined className="text-white" />}
              onClick={toggleSidebar}
              className="h-8 w-8 flex items-center justify-center"
            />
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          className="border-r-0"
        >
          {menuItems.map(item => (
            <Menu.Item 
              key={item.key} 
              icon={item.icon}
              onClick={() => {
                navigate(item.path);
                if (isMobile) {
                  closeSidebar();
                } else if (!collapsed) {
                  setCollapsed(true);
                }
              }}
              className={selectedKey === item.key ? 'ant-menu-item-selected' : ''}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <UserOutlined className="text-blue-600" />
            </div>
            {!collapsed && (
              <div>
                <p className="text-sm font-medium">Student</p>
                <p className="text-xs text-gray-500">View Profile</p>
              </div>
            )}
          </div>
          <Button 
            type="text" 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
            className="w-full mt-2 text-left"
          >
            {!collapsed && 'Logout'}
          </Button>
        </div>
      </Sider>
      <Layout className="w-full">
        <Header className="bg-white shadow-sm p-0 flex items-center h-14 sm:h-16">
          <Button
            type="text"
            icon={isMobile ? (sidebarVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />) : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
            onClick={toggleSidebar}
            className="h-12 w-12 sm:h-16 sm:w-16"
          />
          <div className="flex-1">
            <h2 className="text-base sm:text-lg font-semibold">
              {menuItems.find(item => item.key === selectedKey)?.label || 'Dashboard'}
            </h2>
          </div>
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="h-12 w-12 sm:h-16 sm:w-16"
          />
        </Header>
        <Content 
          onClick={isMobile && sidebarVisible ? closeSidebar : undefined} 
          className="m-2 sm:m-4 p-4 sm:p-6 bg-white rounded-lg shadow-sm dashboard"
          style={{ width: '100%', maxWidth: '100%' }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentDashboard;
