import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './AdminLayout.css';

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo">BrainBuzz Admin</div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
        >
          <Menu.Item key="/admin/dashboard">
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/admin/users">
            <Link to="/admin/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="/admin/courses">
            <Link to="/admin/courses">Courses</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;