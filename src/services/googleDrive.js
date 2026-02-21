import api from './api';

export const googleDriveService = {
  // Upload document to Google Drive and share with class students
  uploadDocument: async (file, folderName, courseId, documentTitle) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder_name', folderName);
      formData.append('course_id', courseId);
      formData.append('document_title', documentTitle || file.name);

      const response = await api.post('/teacher/upload-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },

  // Get list of documents for a course
  getCourseDocuments: async (courseId) => {
    try {
      const response = await api.get(`/teacher/courses/${courseId}/documents`);
      return response.data;
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  },

  // Delete a document
  deleteDocument: async (documentId) => {
    try {
      await api.delete(`/teacher/documents/${documentId}`);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },

  // Update document sharing permissions
  updateDocumentSharing: async (documentId, studentEmails) => {
    try {
      const response = await api.post(`/teacher/documents/${documentId}/share`, {
        student_emails: studentEmails,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating document sharing:', error);
      throw error;
    }
  },

  // Get document download link
  getDocumentLink: async (documentId) => {
    try {
      const response = await api.get(`/teacher/documents/${documentId}/link`);
      return response.data;
    } catch (error) {
      console.error('Error getting document link:', error);
      throw error;
    }
  },
};
