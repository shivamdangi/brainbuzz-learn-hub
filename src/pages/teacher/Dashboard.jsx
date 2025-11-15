import { useState } from 'react';
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

const { Header, Sider, Content } = Layout;

const TeacherDashboard = () => {
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

  const selectedKey = menuItems.find(item => 
    location.pathname.startsWith(item.path)
  )?.key || '1';

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="h-12 m-4 flex items-center justify-center">
          <h1 className={`text-xl font-bold ${collapsed ? 'hidden' : 'block'}`}>
            Teacher Portal
          </h1>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          items={menuItems.map(item => ({
            key: item.key,
            icon: item.icon,
            label: <Link to={item.path}>{item.label}</Link>,
          }))}
        />
        <div className="absolute bottom-0 w-full p-4">
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
      <Layout>
        <Header className="bg-white p-0 shadow-sm flex items-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="h-16 w-16"
          />
          <div className="flex-1" />
          <div className="mr-4 flex items-center">
            <span className="mr-2">
              <UserOutlined /> {localStorage.getItem('user_email')}
            </span>
          </div>
        </Header>
        <Content className="m-4 p-6 bg-white rounded-lg shadow-sm">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeacherDashboard;
