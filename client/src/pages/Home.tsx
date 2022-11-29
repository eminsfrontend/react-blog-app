import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export interface Post {
  id: number;
  title: string;
  desc: string;
  img?: string;
  userImg?: string;
  date?: Date | null;
  uid: number;
  username: string;
  category: string;
}

export const getText = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex flex-col gap-y-20 py-40">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`flex ${
              post.id % 2 === 0 ? "flex-row-reverse" : "flex-row"
            } gap-x-20`}
          >
            <div className="basis-1/3">
              <img
                src={`../upload/${post.img}`}
                alt=""
                className="w-full max-h-[300px] object-cover"
              />
            </div>
            <div className="flex flex-col items-start basis-2/3 gap-y-4">
              <Link to={`postpage/${post.id}`}>
                <h2 className="text-2xl font-bold">{post.title}</h2>
              </Link>
              <p>{getText(post.desc)}</p>
              <button className="underline underline-offset-4">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
