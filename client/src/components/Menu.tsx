import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "../pages/Home";

interface MenuProps {
  category: string;
}

const Menu: React.FC<MenuProps> = ({ category }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/posts?cat=${category}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div>
      <h2 className="text-xl font-bold pb-4 mb-10 border-b-2">
        Other posts for you
      </h2>
      <div className="flex flex-col gap-y-10">
        {posts.map((post) => (
          <div className="flex flex-col items-start gap-y-4" key={post.id}>
            <img
              src={`../upload/${post.img}`}
              alt=""
              className="w-full max-h-80 object-cover"
            />
            <h3 className="text-md font-semibold">{post.title}</h3>
            <button className="text-sm underline underline-offset-4">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
