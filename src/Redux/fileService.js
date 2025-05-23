export const uploadFiles = async (files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5003'}/api/uploads`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) throw new Error("Failed to upload files");
  
      const result = await response.json();
      return result.imageUrls; // Backend should return an array of URLs
    } catch (error) {
      console.error("Upload error:", error);
      return [];
    }
  };
  