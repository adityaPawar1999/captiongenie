import { useState, useEffect } from "react";
import data from "../../../data";

const getCategoryColor = (category) => {
  if (!category) return "text-gray-500"; // Default color if category is missing

  switch (category.toLowerCase()) {
    case "trending":
      return "bg-blue-500 p-1 rounded-sm text-white uppercase text-[12px] font-bold";
    case "health":
      return "bg-green-500 p-1 rounded-sm text-white uppercase text-[12px] font-bold";
    case "medicine":
      return "bg-cyan-500 p-1 rounded-sm text-white uppercase text-[12px] font-bold";
    default:
      return "bg-gray-500 p-1 rounded-sm text-white uppercase text-[12px] font-bold";
  }
};

const MainImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(data);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Mobile View: Only One Large Image */}
      <div className="block sm:hidden">
        {images.length > 0 && (
          <div className="relative h-[500px] w-full overflow-hidden group">
            <img
              src={images[0]?.imageUrl}
              alt={images[0]?.title}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2">
              <span className={getCategoryColor(images[0]?.category)}>
                {images[0]?.category}
              </span>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/50 text-white p-2 rounded">
              <b>{images[0]?.title}</b>
              <p>{images[0]?.description}</p>
              <a href="#" className="text-blue-400 underline mt-2  link-btn inline-block">
                Read More
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Tablet View: Two Images in One Row */}
      <div className="hidden sm:grid md:hidden grid-cols-2 h-[200px] gap-2">
        {images.slice(0, 2).map((img) => (
          <div key={img.id} className="relative h-full w-full overflow-hidden group">
            <img
              src={img.imageUrl}
              alt={img.title}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 text-sm font-semibold">
              <span className={getCategoryColor(img.category)}>{img.category}</span>
            </div>
            <div className="absolute bottom-2 left-2 bg-black/50 text-white p-2 rounded">
              <b>{img.title}</b>
              <p>{img.description}</p>
              <a href="#" className="text-blue-400  mt-2 link-btn inline-block">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Full Grid Layout */}
      <div className="hidden md:grid grid-cols-2 md:grid-rows-2 gap-2 h-[500px]">
        {/* Large Image */}
        <div className="relative col-span-1 row-span-2 h-full w-full overflow-hidden group">
          <img
            src={images[0]?.imageUrl}
            alt={images[0]?.title}
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 text-sm font-semibold">
            <span className={getCategoryColor(images[0]?.category)}>
              {images[0]?.category}
            </span>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/50 text-white p-2 rounded">
            <b>{images[0]?.title}</b>
            <p>{images[0]?.description}</p>
            <a href="#" className="text-blue-400  mt-2 link-btn inline-block">
              Read More
            </a>
          </div>
        </div>

        {/* Two Smaller Images */}
        <div className="flex flex-col gap-2 col-span-1 row-span-2 h-full">
          {images.slice(1, 3).map((img) => (
            <div key={img.id} className="relative h-1/2 w-full overflow-hidden group">
              <img
                src={img.imageUrl}
                alt={img.title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 text-sm font-semibold">
                <span className={getCategoryColor(img.category)}>{img.category}</span>
              </div>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white p-2 rounded">
                <b>{img.title}</b>
                <p>{img.description}</p>
                <a href="#" className="text-blue-400 link-btn mt-2 inline-block">
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainImages;
