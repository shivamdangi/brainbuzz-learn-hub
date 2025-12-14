import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './AdminLayout.css';

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarVisible, setSidebarVisible] = useState(false);

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
    if (isMobile) setSidebarVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    navigate('/login');
  };

  const menuItems = [
    { key: '/admin/dashboard', icon: <DashboardOutlined />, label: 'Dashboard', to: '/admin/dashboard' },
    { key: '/admin/users', icon: <TeamOutlined />, label: 'Users', to: '/admin/users' },
    { key: '/admin/courses', icon: <BookOutlined />, label: 'Courses', to: '/admin/courses' },
  ];

  const selectedKey =
    menuItems.find((m) => location.pathname.startsWith(m.key))?.key || '/admin/dashboard';

  return (
    <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <div
        className={`sidebar-backdrop ${isMobile && sidebarVisible ? 'visible' : ''}`}
        onClick={closeSidebar}
      />
      <Sider
        trigger={null}
        collapsible
        // On mobile, collapse Sider whenever it isn't visible (prevents layout push/scrollbar)
        collapsed={isMobile ? !sidebarVisible : collapsed}
        width={250}
        className={`sidebar ${isMobile ? 'mobile-sidebar' : ''} ${sidebarVisible ? 'sidebar-visible' : ''}`}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          }
        }}
        style={{ zIndex: 1002 }}
      >
        <div className="logo">
          {isMobile ? 'BrainBuzz Admin' : collapsed ? 'BrainBuzz' : 'BrainBuzz Admin'}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          {menuItems.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => {
                navigate(item.to);
                if (isMobile) closeSidebar();
              }}
            >
              <Link to={item.to}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background admin-header">
          <div className="admin-header-left">
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
              className="admin-menu-toggle"
            />
            <div className="admin-breadcrumb">
              {menuItems.find((m) => m.key === selectedKey)?.label || 'Dashboard'}
            </div>
          </div>
          <div className="admin-header-right">
            <span className="admin-user">
              <UserOutlined /> {localStorage.getItem('user_email') || 'Admin'}
            </span>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="admin-logout-btn"
            />
          </div>
        </Header>

        <Content
          style={{
            margin: '16px',
            height: 'calc(100vh - 64px)',
            overflow: 'hidden',
          }}
          onClick={isMobile && sidebarVisible ? closeSidebar : undefined}
        >
          <div
            className="site-layout-background admin-content"
            style={{
              height: '100%',
              overflowY: 'auto',
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;