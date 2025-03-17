// Service to handle file uploads
export const uploadFiles = async (files) => {
  try {
    // TODO: Implement actual file upload logic to your backend
    // This is a mock implementation that returns file metadata
    const fileMetadata = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file) // Temporary URL for preview
    }));
    return fileMetadata;
  } catch (error) {
    throw new Error('File upload failed: ' + error.message);
  }
};