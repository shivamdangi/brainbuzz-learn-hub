import { useState } from 'react';
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

const { Header, Sider, Content } = Layout;

const StudentDashboard = () => {
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
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={250}
        className="bg-white shadow-lg"
      >
        <div className="flex items-center justify-center h-16 bg-blue-600 text-white">
          <h1 className="text-xl font-bold">
            {collapsed ? 'BB' : 'BrainBuzz'}
          </h1>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[selectedKey]}
          className="border-r-0"
        >
          {menuItems.map(item => (
            <Menu.Item 
              key={item.key} 
              icon={item.icon}
              onClick={() => navigate(item.path)}
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
      <Layout>
        <Header className="bg-white shadow-sm p-0 flex items-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="h-16 w-16"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {menuItems.find(item => item.key === selectedKey)?.label || 'Dashboard'}
            </h2>
          </div>
        </Header>
        <Content className="m-4 p-6 bg-white rounded-lg shadow-sm">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudentDashboard;
