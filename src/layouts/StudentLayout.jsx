// src/layouts/StudentLayout.jsx
import { useState } from 'react';
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
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    <Layout className="student-layout">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={250}
        className="sidebar"
      >
        <div className="logo">
          <Title level={4} className="logo-text">
            {collapsed ? 'BB' : 'BrainBuzz'}
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
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      
      <Layout>
        <Header className="header">
          <div className="header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
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
        
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentLayout;