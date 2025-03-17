const ImageUpload = ({ images, setPost }) => {
    const handleImageUpload = (e) => {
      if (images.length >= 3) return;
      const files = Array.from(e.target.files).slice(0, 3 - images.length);
      const filePreviews = files.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
  
      setPost((prev) => ({ ...prev, images: [...prev.images, ...filePreviews] }));
    };
  
    const removeImage = (index) => {
      const newImages = [...images];
      URL.revokeObjectURL(newImages[index].previewUrl);
      newImages.splice(index, 1);
      setPost((prev) => ({ ...prev, images: newImages }));
    };
  
    return (
      <div>
        <label>Upload Images (Max 3)</label>
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="w-full p-2 border rounded" />
        <div className="flex gap-2 mt-2">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img src={img.previewUrl} alt="preview" className="w-20 h-20 object-cover rounded" />
              <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded">X</button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ImageUpload;
  