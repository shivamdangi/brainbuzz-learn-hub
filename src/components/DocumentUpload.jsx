import React, { useState, useEffect } from 'react';
import { Upload, Input, Button, Card, Typography, message, Progress, List, Space, Popconfirm } from 'antd';
import { 
  InboxOutlined, 
  FolderOutlined, 
  FileTextOutlined, 
  DeleteOutlined, 
  DownloadOutlined,
  EyeOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { googleDriveService } from '../services/googleDrive';

const { Dragger } = Upload;
const { Title, Text } = Typography;

export const DocumentUpload = ({ courseId, onUploadSuccess }) => {
  const [folderName, setFolderName] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch documents for the course
  const fetchDocuments = async () => {
    if (!courseId) return;
    
    try {
      setLoading(true);
      const docs = await googleDriveService.getCourseDocuments(courseId);
      setDocuments(docs || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      message.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  // Load documents when component mounts or courseId changes
  useEffect(() => {
    fetchDocuments();
  }, [courseId]);

  const handleUpload = async (file) => {
    if (!folderName.trim()) {
      message.error('Please enter a folder name');
      return false;
    }

    if (!courseId) {
      message.error('Course ID is required');
      return false;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress (in real implementation, this would come from the upload)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const result = await googleDriveService.uploadDocument(
        file,
        folderName.trim(),
        courseId,
        documentTitle.trim() || file.name
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      message.success(`Document "${file.name}" uploaded successfully!`);
      
      // Reset form
      setFolderName('');
      setDocumentTitle('');
      setUploadProgress(0);
      
      // Refresh documents list
      await fetchDocuments();
      
      // Notify parent component
      if (onUploadSuccess) {
        onUploadSuccess(result);
      }

      return false; // Prevent default upload behavior
    } catch (error) {
      console.error('Upload error:', error);
      message.error(error.response?.data?.detail || 'Failed to upload document');
      setUploadProgress(0);
      return false;
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      await googleDriveService.deleteDocument(documentId);
      message.success('Document deleted successfully');
      await fetchDocuments();
    } catch (error) {
      console.error('Delete error:', error);
      message.error('Failed to delete document');
    }
  };

  const handleViewDocument = async (documentId) => {
    try {
      const linkData = await googleDriveService.getDocumentLink(documentId);
      if (linkData?.url) {
        window.open(linkData.url, '_blank');
      } else {
        message.error('Unable to get document link');
      }
    } catch (error) {
      console.error('Error getting document link:', error);
      message.error('Failed to open document');
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png',
    beforeUpload: handleUpload,
    showUploadList: false,
    disabled: uploading,
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <Title level={4} className="mb-4">
          <UploadOutlined className="mr-2" />
          Upload Document
        </Title>
        
        <Space direction="vertical" size="middle" className="w-full">
          {/* Folder Name Input */}
          <div>
            <Text strong className="block mb-2">Folder Name *</Text>
            <Input
              placeholder="e.g., Chapter 1 Notes, Assignment Materials"
              prefix={<FolderOutlined />}
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              disabled={uploading}
              size="large"
            />
          </div>

          {/* Document Title Input */}
          <div>
            <Text strong className="block mb-2">Document Title (Optional)</Text>
            <Input
              placeholder="Custom title for the document"
              prefix={<FileTextOutlined />}
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              disabled={uploading}
              size="large"
            />
          </div>

          {/* File Upload Area */}
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for PDF, Word, PowerPoint, Excel, Text, and Image files.
              Documents will be uploaded to Google Drive and shared with class students.
            </p>
          </Dragger>

          {/* Upload Progress */}
          {uploading && (
            <div>
              <Text strong>Uploading...</Text>
              <Progress percent={uploadProgress} status="active" />
            </div>
          )}
        </Space>
      </Card>

      {/* Documents List */}
      <Card>
        <Title level={4} className="mb-4">
          <FileTextOutlined className="mr-2" />
          Uploaded Documents
        </Title>

        {loading ? (
          <div className="text-center py-8">
            <Text>Loading documents...</Text>
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-8">
            <Text type="secondary">No documents uploaded yet</Text>
          </div>
        ) : (
          <List
            dataSource={documents}
            renderItem={(doc) => (
              <List.Item
                actions={[
                  <Button
                    key="view"
                    type="link"
                    icon={<EyeOutlined />}
                    onClick={() => handleViewDocument(doc.id)}
                  >
                    View
                  </Button>,
                  <Popconfirm
                    key="delete"
                    title="Are you sure you want to delete this document?"
                    onConfirm={() => handleDeleteDocument(doc.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="link"
                      danger
                      icon={<DeleteOutlined />}
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                ]}
              >
                <List.Item.Meta
                  avatar={<FileTextOutlined className="text-blue-500" />}
                  title={doc.title}
                  description={
                    <div>
                      <Text type="secondary">Folder: {doc.folder_name}</Text>
                      <br />
                      <Text type="secondary" className="text-xs">
                        Uploaded: {new Date(doc.created_at).toLocaleDateString()}
                      </Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};
