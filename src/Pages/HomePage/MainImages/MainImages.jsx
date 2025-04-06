import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { categories } from "../../../categories";

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
  const [randomPosts, setRandomPosts] = useState([]);

  useEffect(() => {
    const postsWithImages = posts.filter((post) => post.images?.length > 0);
    const shuffled = [...postsWithImages].sort(() => 0.5 - Math.random());
    setRandomPosts(shuffled.slice(0, 3));
  }, [posts]);

  return (
    <div className="max-w-7xl mx-auto p-4 ">
      {/* Mobile View */}
      <div className="block sm:hidden">
        <div className="grid grid-cols-1 gap-4">
          {randomPosts.map((post) => (
            <div key={post._id} className="relative h-[300px] w-full overflow-hidden group">
              <Link to={`/post/${post._id}`}>
                <img
                  src={getImageUrl(post.images[0])}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                  <span className={getCategoryColor(post.categories?.[0])}>
                    {post.categories?.[0]}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white p-2 rounded">
                  <b>{post.title}</b>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet View */}
      <div className="hidden sm:grid md:hidden grid-cols-2 h-[200px] gap-2">
        {randomPosts.slice(0, 2).map((post) => (
          <div key={post._id} className="relative h-full w-full overflow-hidden group">
            <Link to={`/post/${post._id}`}>
              <img
                src={getImageUrl(post.images[0])}
                alt={post.title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 text-sm font-semibold">
                <span className={getCategoryColor(post.categories?.[0])}>
                  {post.categories?.[0]}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white p-2 rounded">
                <b>{post.title}</b>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-2 md:grid-rows-2 gap-2 h-[500px]">
        {/* Large Image */}
        {randomPosts[0] && (
          <div className="relative col-span-1 row-span-2 h-full w-full overflow-hidden group">
            <Link to={`/post/${randomPosts[0]._id}`}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/images/${randomPosts[0].images[0]?.replace("uploads/", "")}`}
                alt={randomPosts[0].title}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 text-sm font-semibold">
                <span className={getCategoryColor(randomPosts[0].categories?.[0])}>
                  {randomPosts[0].categories?.[0]}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white p-2 rounded">
                <b>{randomPosts[0].title}</b>
              </div>
            </Link>
          </div>
        )}

        {/* Two Smaller Images */}
        <div className="flex flex-col gap-2 col-span-1 row-span-2 h-full">
          {randomPosts.slice(1, 3).map((post) => (
            <div key={post._id} className="relative h-1/2 w-full overflow-hidden group">
              <Link to={`/post/${post._id}`}>
                <img
                  src={getImageUrl(post.images[0])}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 text-sm font-semibold">
                  <span className={getCategoryColor(post.categories?.[0])}>
                    {post.categories?.[0]}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white p-2 rounded">
                  <b>{post.title}</b>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainImages;
