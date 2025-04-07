import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { categories } from "../../../categories";

// Get full image URL
const getImageUrl = (imagePath) => {
  return `${import.meta.env.VITE_BACKEND_URL}/images/${imagePath?.replace("uploads/", "")}`;
};

// Get category color class
const getCategoryColor = (category) => {
  if (!category) return "bg-gray-400 text-white p-1 rounded-sm uppercase text-[12px] font-bold";

  const foundCategory = categories.find(
    (cat) => cat.name.toLowerCase() === category.toLowerCase()
  );

  const bgColor = foundCategory ? foundCategory.color : "bg-gray-400";
  return `${bgColor} text-white p-1 rounded-sm uppercase text-[12px] font-bold`;
};

const MainImages = () => {
  const { posts } = useSelector((state) => state.posts);
  const [topLikedPosts, setTopLikedPosts] = useState([]);

  useEffect(() => {
    const postsWithImages = posts.filter((post) => post.images?.length > 0);
    const sortedByLikes = [...postsWithImages].sort(
      (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
    );
    setTopLikedPosts(sortedByLikes.slice(0, 3)); // Show only top 3
  }, [posts]);

  return (
    <div className="max-w-7xl mx-auto p-4 bg-[var(--bg-primary)]">
      {/* Mobile View */}
      <div className="block sm:hidden">
        <div className="grid grid-cols-1 gap-4">
          {topLikedPosts.map((post) => (
            <ImageCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* Tablet View */}
      <div className="hidden sm:grid md:hidden grid-cols-2 h-[200px] gap-2">
        {topLikedPosts.slice(0, 2).map((post) => (
          <ImageCard key={post._id} post={post} />
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-2 md:grid-rows-2 gap-2 h-[500px]">
        {topLikedPosts[0] && (
          <div className="relative col-span-1 row-span-2 overflow-hidden group">
            <Link to={`/post/${topLikedPosts[0]._id}`}>
              <img
                src={getImageUrl(topLikedPosts[0].images[0])}
                alt={topLikedPosts[0].title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <GradientOverlay />
              <Overlay post={topLikedPosts[0]} />
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-2 col-span-1 row-span-2">
          {topLikedPosts.slice(1, 3).map((post) => (
            <ImageCard key={post._id} post={post} heightClass="h-1/2" />
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable image card
const ImageCard = ({ post, heightClass = "h-[300px]" }) => (
  <div className={`relative w-full ${heightClass} overflow-hidden group`}>
    <Link to={`/post/${post._id}`}>
      <img
        src={getImageUrl(post.images[0])}
        alt={post.title}
        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
      />
      <GradientOverlay />
      <Overlay post={post} />
    </Link>
  </div>
);

// Gradient overlay effect
const GradientOverlay = () => (
  <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/30 to-transparent rounded-lg" />
);

// Text overlay content
const Overlay = ({ post }) => (
  <>
    <div className="absolute top-2 left-2 z-10">
      <span className={getCategoryColor(post.categories?.[0])}>
        {post.categories?.[0]}
      </span>
    </div>
    <div className="absolute bottom-2 left-2 z-10 bg-[var(--bg-dark)]/50 text-white p-2 rounded">
      <p>{post.title}</p>
    </div>
  </>
);

export default MainImages;
