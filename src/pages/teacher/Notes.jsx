import React from 'react';
import { DocumentUpload } from '../../components/DocumentUpload';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;

const TeacherNotes = () => {
  const { courseId } = useParams();

  return (
    <div className="p-4">
      <Title level={3} className="mb-6">
        Course Notes & Documents
      </Title>
      
      <div className="mb-4">
        <p className="text-gray-600">
          Upload and manage course documents here. Files will be automatically uploaded to Google Drive 
          and shared with students enrolled in this course.
        </p>
      </div>

      <DocumentUpload courseId={courseId} />
    </div>
  );
};

export default TeacherNotes;
