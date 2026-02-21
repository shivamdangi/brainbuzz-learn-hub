# Backend API Requirements for Document Upload Feature

## Overview
This document outlines the required backend API endpoints for the Google Drive document upload functionality.

## Required API Endpoints

### 1. Upload Document
```
POST /teacher/upload-document
Content-Type: multipart/form-data

Body:
- file: File (required) - The document file to upload
- folder_name: string (required) - Name of the folder in Google Drive
- course_id: integer (required) - ID of the course
- document_title: string (optional) - Custom title for the document

Response:
{
  "id": "document_id",
  "title": "Document Title",
  "folder_name": "Folder Name",
  "google_drive_id": "drive_file_id",
  "url": "https://drive.google.com/file/d/...",
  "created_at": "2024-01-16T..."
}
```

### 2. Get Course Documents
```
GET /teacher/courses/{course_id}/documents

Response:
[
  {
    "id": "document_id",
    "title": "Document Title",
    "folder_name": "Folder Name",
    "google_drive_id": "drive_file_id",
    "url": "https://drive.google.com/file/d/...",
    "created_at": "2024-01-16T..."
  }
]
```

### 3. Delete Document
```
DELETE /teacher/documents/{document_id}

Response: 204 No Content
```

### 4. Get Document Link
```
GET /teacher/documents/{document_id}/link

Response:
{
  "url": "https://drive.google.com/file/d/...",
  "embed_url": "https://drive.google.com/file/d/.../preview"
}
```

### 5. Update Document Sharing
```
POST /teacher/documents/{document_id}/share

Body:
{
  "student_emails": ["student1@example.com", "student2@example.com"]
}

Response:
{
  "message": "Document shared successfully",
  "shared_with": ["student1@example.com", "student2@example.com"]
}
```

## Google Drive Integration Requirements

### Service Account Setup
1. Create a Google Cloud Project
2. Enable Google Drive API
3. Create a Service Account
4. Share the BrainBuzz organization folder with the service account
5. Download the service account credentials JSON file

### Backend Implementation Notes
1. Use Google Drive API v3
2. Store document metadata in your database
3. Implement proper error handling for:
   - File size limits
   - Unsupported file types
   - Google Drive API quota limits
   - Permission errors

### Security Considerations
1. Validate file types and sizes
2. Implement teacher authentication/authorization
3. Verify teacher owns the course
4. Sanitize folder names and document titles
5. Rate limiting for uploads

### Database Schema (Suggested)
```sql
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  folder_name VARCHAR(255) NOT NULL,
  google_drive_id VARCHAR(255) NOT NULL UNIQUE,
  course_id INTEGER REFERENCES courses(id),
  teacher_id INTEGER REFERENCES users(id),
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER,
  mime_type VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE document_shares (
  id SERIAL PRIMARY KEY,
  document_id INTEGER REFERENCES documents(id),
  student_email VARCHAR(255) NOT NULL,
  shared_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(document_id, student_email)
);
```

## Frontend Integration
The frontend has been implemented with the following components:
- `DocumentUpload.jsx` - Main upload component
- `googleDriveService.js` - API service layer
- `TeacherNotes.jsx` - Notes page for teachers

## Testing
1. Test file upload with various file types
2. Test folder creation and organization
3. Test sharing permissions with student accounts
4. Test document deletion and cleanup
5. Test error scenarios (invalid files, permission issues)
