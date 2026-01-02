import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Space, Input as AntInput, Descriptions, Tag } from 'antd';
import { PlusOutlined, CopyOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import api from '../../services/api';

const { Option } = Select;
const { Search } = AntInput;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchText, roleFilter]);

  const filterUsers = () => {
    let filtered = users;
    
    // Filter by search text (name or username)
    if (searchText) {
      filtered = filtered.filter(user => 
        user.full_name?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // Filter by role
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    setFilteredUsers(filtered);
  };

  const copyPassword = async (password) => {
    try {
      await navigator.clipboard.writeText(password);
      message.success('Password copied to clipboard!');
    } catch (err) {
      message.error('Failed to copy password');
    }
  };

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success(`${label} copied to clipboard!`);
    } catch (err) {
      message.error(`Failed to copy ${label}`);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsDetailsModalVisible(true);
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    }
  };

  const handleCreateUser = async (values) => {
    try {
      await api.post('/admin/users', values);
      message.success('User created successfully');
      setIsModalVisible(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      message.error('Failed to create user');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Full Name', dataIndex: 'full_name', key: 'full_name' },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: (password) => (
        <Space>
          <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{password}</span>
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined />}
            onClick={() => copyPassword(password)}
            title="Copy password"
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Space wrap>
          <Search
            placeholder="Search by name or username"
            allowClear
            style={{ width: 250 }}
            onSearch={setSearchText}
            onChange={(e) => !e.target.value && setSearchText('')}
          />
          <Select
            value={roleFilter}
            onChange={setRoleFilter}
            style={{ width: 150 }}
            placeholder="Filter by role"
          >
            <Option value="all">All Roles</Option>
            <Option value="student">Student</Option>
            <Option value="teacher">Teacher</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add User
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => handleUserClick(record),
          style: { cursor: 'pointer' },
        })}
      />

      <Modal
        title="Create New User"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateUser}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Please input valid email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="full_name"
            label="Full Name"
            rules={[{ required: true, message: 'Please input full name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select role!' }]}
          >
            <Select>
              <Option value="student">Student</Option>
              <Option value="teacher">Teacher</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create User
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* User Details Modal */}
      <Modal
        title={
          <Space>
            <UserOutlined />
            {selectedUser?.role === 'student' ? 'Student Details' : 'User Details'}
          </Space>
        }
        open={isDetailsModalVisible}
        onCancel={() => setIsDetailsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailsModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedUser && (
          <div>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="User ID">{selectedUser.id}</Descriptions.Item>
              <Descriptions.Item label="Username">{selectedUser.username}</Descriptions.Item>
              <Descriptions.Item label="Full Name">{selectedUser.full_name}</Descriptions.Item>
              <Descriptions.Item label="Email">
                <Space>
                  {selectedUser.email}
                  <Button
                    type="text"
                    size="small"
                    icon={<CopyOutlined />}
                    onClick={() => copyToClipboard(selectedUser.email, 'Email')}
                    title="Copy email"
                  />
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Role">
                <Tag color={selectedUser.role === 'student' ? 'blue' : selectedUser.role === 'teacher' ? 'green' : 'red'}>
                  {selectedUser.role?.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              {selectedUser.phone_number && (
                <Descriptions.Item label="Phone Number">
                  <Space>
                    {selectedUser.phone_number}
                    <Button
                      type="text"
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={() => copyToClipboard(selectedUser.phone_number, 'Phone Number')}
                      title="Copy phone number"
                    />
                  </Space>
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Password">
                <Space>
                  <span style={{ fontFamily: 'monospace', fontSize: '14px', background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}>
                    {selectedUser.password}
                  </span>
                  <Button
                    type="text"
                    size="small"
                    icon={<CopyOutlined />}
                    onClick={() => copyPassword(selectedUser.password)}
                    title="Copy password"
                  />
                </Space>
              </Descriptions.Item>
              {selectedUser.created_at && (
                <Descriptions.Item label="Created At">
                  {new Date(selectedUser.created_at).toLocaleString()}
                </Descriptions.Item>
              )}
            </Descriptions>
            
            {selectedUser.role === 'student' && (
              <div style={{ marginTop: 16, padding: 12, background: '#f0f8ff', borderRadius: 6 }}>
                <strong>Student Information:</strong>
                <p style={{ margin: '8px 0', color: '#666' }}>
                  This student can access courses, submit assignments, and view announcements.
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;