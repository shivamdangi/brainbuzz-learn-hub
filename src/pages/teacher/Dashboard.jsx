import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BookOutlined,
  MessageOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import './Dashboard.css';

const { Header, Sider, Content } = Layout;

const TeacherDashboard = () => {
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
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      path: '/teacher/dashboard',
    },
    {
      key: '2',
      icon: <BookOutlined />,
      label: 'My Courses',
      path: '/teacher/dashboard/courses',
    },
    {
      key: '3',
      icon: <MessageOutlined />,
      label: 'Messages',
      path: '/teacher/dashboard/messages',
    },
  ];

  const selectedKey =
    menuItems.find((item) => location.pathname.startsWith(item.path))?.key || '1';

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
          className="sidebar-menu border-r-0"
        >
          {menuItems.map((item) => (
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

        <div className="p-4 border-t">
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="w-full text-left"
          >
            {!collapsed && 'Logout'}
          </Button>
        </div>
      </Sider>

      <Layout className="w-full">
        <Header className="bg-white p-0 shadow-sm flex items-center h-16">
          <Button
            type="text"
            icon={
              isMobile
                ? sidebarVisible
                  ? <MenuFoldOutlined />
                  : <MenuUnfoldOutlined />
                : collapsed
                  ? <MenuUnfoldOutlined />
                  : <MenuFoldOutlined />
            }
            onClick={toggleSidebar}
            className="h-12 w-12 sm:h-16 sm:w-16"
          />
          <div className="flex-1" />
          <div className="mr-2 sm:mr-4 flex items-center">
            <span className="hidden sm:inline mr-2">
              <UserOutlined /> {localStorage.getItem('user_email')}
            </span>
            <span className="sm:hidden">
              <UserOutlined />
            </span>
          </div>
        </Header>

        <Content
          className="m-2 sm:m-4 p-4 sm:p-6 bg-white rounded-lg shadow-sm"
          style={{ width: '100%', maxWidth: '100%' }}
          onClick={isMobile && sidebarVisible ? closeSidebar : undefined}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeacherDashboard;