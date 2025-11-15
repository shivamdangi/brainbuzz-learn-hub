import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Card, Tabs } from 'antd';
import { PlusOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import api from '../../services/api';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('1');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCourses();
    fetchUsers();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      message.error('Failed to fetch courses');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    }
  };

  const handleCreateCourse = async (values) => {
    try {
      const courseData = {
        title: values.title,
        description: values.description || ''
      };
      await api.post('/admin/courses', courseData);
      message.success('Course created successfully');
      setIsModalVisible(false);
      form.resetFields();
      fetchCourses();
    } catch (error) {
      console.error('Course creation error:', error);
      message.error(error.response?.data?.detail || 'Failed to create course');
    }
  };

  const handleAddStudents = async (courseId, studentIds) => {
    try {
      await api.post(`/admin/courses/${courseId}/students`, { student_ids: studentIds });
      message.success('Students added to course successfully');
      fetchCourses();
    } catch (error) {
      message.error('Failed to add students to course');
    }
  };

  const handleAssignTeacher = async (courseId, teacherId) => {
    try {
      await api.post(`/admin/courses/${courseId}/teacher`, { teacher_id: teacherId });
      message.success('Teacher assigned successfully');
      // Refresh the courses list and update the selected course
      const response = await api.get('/courses');
      setCourses(response.data);
      const updatedCourse = response.data.find(c => c.id === courseId);
      if (updatedCourse) {
        setSelectedCourse(updatedCourse);
      }
    } catch (error) {
      console.error('Error assigning teacher:', error);
      message.error(error.response?.data?.detail || 'Failed to assign teacher');
    }
  };

  const handleUnassignTeacher = async (courseId) => {
    try {
      await api.delete(`/admin/courses/${courseId}/teacher`);
      message.success('Teacher removed successfully');
      // refresh selected course details
      const detail = await api.get(`/admin/courses/${courseId}`);
      setSelectedCourse(detail.data);
      fetchCourses();
    } catch (error) {
      console.error('Error removing teacher:', error);
      message.error(error.response?.data?.detail || 'Failed to remove teacher');
    }
  };

  const handleRemoveStudent = async (courseId, studentId) => {
    try {
      await api.delete(`/admin/courses/${courseId}/students/${studentId}`);
      message.success('Student removed from course');
      // refresh selected course details
      const detail = await api.get(`/admin/courses/${courseId}`);
      setSelectedCourse(detail.data);
      fetchCourses();
    } catch (error) {
      console.error('Error removing student:', error);
      message.error(error.response?.data?.detail || 'Failed to remove student');
    }
  };

  const openManage = async (record) => {
    try {
      const detail = await api.get(`/admin/courses/${record.id}`);
      setSelectedCourse(detail.data);
      setActiveTab('2');
    } catch (error) {
      console.error('Failed to load course details:', error);
      message.error('Failed to load course details');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => openManage(record)}
        >
          Manage
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Course
        </Button>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Courses" key="1">
          <Table
            columns={columns}
            dataSource={courses}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </TabPane>
        {selectedCourse && (
          <TabPane tab={`Manage: ${selectedCourse?.title || 'Course'}`} key="2">
            <Card title="Course Details" style={{ marginBottom: 16 }}>
              <p><strong>Title:</strong> {selectedCourse.title}</p>
              <p><strong>Description:</strong> {selectedCourse.description}</p>
              <p><strong>Teacher:</strong> {selectedCourse.teacher?.full_name || 'Not assigned'}</p>
            </Card>

            <Card title="Teacher" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  {selectedCourse.teacher
                    ? `${selectedCourse.teacher.full_name} (${selectedCourse.teacher.email})`
                    : 'Not assigned'}
                </div>
                {selectedCourse.teacher && (
                  <Button danger onClick={() => handleUnassignTeacher(selectedCourse.id)}>Remove</Button>
                )}
              </div>
              <div style={{ marginTop: 12 }}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Assign / Change Teacher"
                  onChange={(value) => handleAssignTeacher(selectedCourse.id, value)}
                  value={undefined}
                >
                  {users
                    .filter((user) => user.role === 'teacher')
                    .map((teacher) => (
                      <Option key={teacher.id} value={teacher.id}>
                        {teacher.full_name} ({teacher.email})
                      </Option>
                    ))}
                </Select>
              </div>
            </Card>

            <Card title="Students">
              <div style={{ marginBottom: 12 }}>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Add students to this course"
                  onChange={(values) => handleAddStudents(selectedCourse.id, values)}
                  value={[]}
                >
                  {users
                    .filter((user) => user.role === 'student')
                    .map((student) => (
                      <Option key={student.id} value={student.id}>
                        {student.full_name} ({student.email})
                      </Option>
                    ))}
                </Select>
              </div>
              <Table
                dataSource={selectedCourse.students || []}
                rowKey="id"
                pagination={false}
                columns={[
                  { title: 'ID', dataIndex: 'id' },
                  { title: 'Name', dataIndex: 'full_name' },
                  { title: 'Email', dataIndex: 'email' },
                  {
                    title: 'Actions',
                    key: 'actions',
                    render: (_, student) => (
                      <Button danger type="link" onClick={() => handleRemoveStudent(selectedCourse.id, student.id)}>
                        Remove
                      </Button>
                    ),
                  },
                ]}
              />
            </Card>
          </TabPane>
        )}
      </Tabs>

      <Modal
        title="Create New Course"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateCourse}>
          <Form.Item
            name="title"
            label="Course Title"
            rules={[{ required: true, message: 'Please input course title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input course description!' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Course
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseManagement;